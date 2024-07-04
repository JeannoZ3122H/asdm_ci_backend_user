import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/services/_actions/message/message.service';
import { TypeCategoryService } from 'src/app/services/request/type-category/type-category.service';

@Component({
  selector: 'app-add-type-category',
  templateUrl: './add-type-category.component.html',
  styleUrls: ['./add-type-category.component.css']
})
export class AddTypeCategoryComponent implements OnInit {


    public type_category: string = '';
    public item_id: number = 0;
    public item_slug: any;
    public is_update: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: TypeCategoryService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddTypeCategoryComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.type_category = this.data.type_category_name;
            this.item_id = this.data.id;
            this.item_slug = this.data.slug;
        }
    }

    saveTypeCategory(){
        if(this.type_category == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {type_category_name: this.type_category}
        this._request.saveTypeCategory(data).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this._dialogRef.close(true);
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        )
    }

    updateTypeCategory(){
        if(this.type_category == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {type_category_name: this.type_category}
        this._request.updateTypeCategory(this.item_slug, data).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this._dialogRef.close(true);
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        )
    }
}
