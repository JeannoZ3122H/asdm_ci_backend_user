import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/services/_actions/message/message.service';
import { ProjetsService } from 'src/app/services/request/projets/projets.service';
import { AddTypeCategoryComponent } from '../admin-components/forms/add-type-category/add-type-category.component';

@Component({
  selector: 'app-message-notfound-full-folder',
  templateUrl: './message-notfound-full-folder.component.html',
  styleUrls: ['./message-notfound-full-folder.component.css']
})
export class MessageNotfoundFullFolderComponent implements OnInit {


    public type_category: string = '';
    public item_id: number = 0;
    public is_update: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
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
        }
    }

    sendMessageFolderIsNoAll(){
        if(this.type_category == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {type_category_name: this.type_category}
        // this._request.saveTypeCategory(data).subscribe(
        //     {
        //         next: (response: any )=>{
        //             if (response.code == 200) {
        //                 setTimeout(() => {
        //                     this._message.successOperation(response);
        //                     this._loading.stop();
        //                     this._dialogRef.close(true);
        //                 }, 1000);
        //             } else if (response.code == 302 || response.code == 300) {
        //                 this._loading.stop();
        //                 this._message.error(response);
        //             }
        //         },error: (error: any)=>{
        //             if (error.status == 401) {
        //                 this._message.tokenExpired();
        //                 localStorage.clear();
        //                 this._router.navigateByUrl('/');
        //                 window.location.reload();
        //             }
        //         }
        //     }
        // )
    }
}
