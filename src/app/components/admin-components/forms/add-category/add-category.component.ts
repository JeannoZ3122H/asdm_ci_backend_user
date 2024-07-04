import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/services/_actions/message/message.service';
import { CategoryService } from 'src/app/services/request/category/category.service';
import { AddTypeCategoryComponent } from '../add-type-category/add-type-category.component';
import { TypeCategoryService } from 'src/app/services/request/type-category/type-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    public _liste_type_category: any;
    public type_category_name: string = '';
    public type_category: string = '';
    public item_slug: string = '';
    public category: string = '';
    public item_id: number = 0;
    public is_update: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: CategoryService,
        private _request_type_category: TypeCategoryService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddCategoryComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.type_category = this.data.type_category;
            this.category = this.data.category_name;
            this.item_slug = this.data.slug;
            this.item_id = this.data.id;
        }
        this.getListeTypecategory();
    }

    chooseTypeCategory(e: any) {
        this.type_category = e.value;
    }

    getListeTypecategory(){
        this._request_type_category.getListeTypeCategory().subscribe(
            {
                next: (response: any) =>{
                    this._liste_type_category = response;
                },
                error: (error: any)=>{
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

    saveTypeCategory(){
        if(this.type_category == '')
        {
            this._message.errorField();
            return
        }
        if(this.category == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {type_category: this.type_category, category: this.category}
        this._request.saveCategory(data).subscribe(
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
        if(this.category == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {type_category: this.type_category, category: this.category}
        this._request.updateCategory(this.item_slug, data).subscribe(
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
