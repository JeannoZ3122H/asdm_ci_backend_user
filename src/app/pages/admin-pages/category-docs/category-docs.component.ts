import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  DeleteModalComponent,
} from 'src/app/components/actions/delete-modal/delete-modal.component';
import {
  AddCategoryDocsComponent,
} from 'src/app/components/admin-components/forms/add-category-docs/add-category-docs.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  CategoryDocsService,
} from 'src/app/services/request/category-docs/category-docs.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-category-docs',
  templateUrl: './category-docs.component.html',
  styleUrls: ['./category-docs.component.css']
})
export class CategoryDocsComponent {
    public _liste: any;

_visitor: boolean = false;
    constructor(
        private _dialog: MatDialog,
        private _request: CategoryDocsService,
        private _router: Router,
        private _message: MessageService,
        private _loading: NgxUiLoaderService,
        private _authorized: AuthorizedService
    ){
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }}

    ngOnInit(){

        this.getListe();
    }

    getListe(){
        this._request.get().subscribe(
            {
                next: (response: any) =>{
                    this._liste = response;
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

    openDialog() {
        const dialogRef = this._dialog.open(AddCategoryDocsComponent, {maxWidth: '95%'});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                    this.getListe();
                }
            },
        });
    }

    editItem(data: any){
        const dialogRef = this._dialog.open(AddCategoryDocsComponent, {
            maxWidth: '95%', data});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                    this.getListe();
                }
            },
        });
    }

    deleteItem(slug: any){
        const dialogRef = this._dialog.open(DeleteModalComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this._loading.start();
                   this._request.delete(slug).subscribe(
                    {
                        next: (response: any)=>{
                            if (response.code == 200) {
                                setTimeout(() => {
                                    this._message.successOperation(response);
                                    this._loading.stop();
                                    this.getListe();
                                }, 1000);
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
                            }
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
            },
        });
    }
}
