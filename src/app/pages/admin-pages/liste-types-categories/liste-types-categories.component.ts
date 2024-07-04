import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  DeleteModalComponent,
} from 'src/app/components/actions/delete-modal/delete-modal.component';
import {
  AddTypeCategoryComponent,
} from 'src/app/components/admin-components/forms/add-type-category/add-type-category.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  TypeCategoryService,
} from 'src/app/services/request/type-category/type-category.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-liste-types-categories',
  templateUrl: './liste-types-categories.component.html',
  styleUrls: ['./liste-types-categories.component.css']
})
export class ListeTypesCategoriesComponent implements OnInit{


    public _liste_type_category: any;

_visitor: boolean = false;
    constructor(
        private _dialog: MatDialog,
        private _request: TypeCategoryService,
        private _router: Router,
        private _message: MessageService,
        private _loading: NgxUiLoaderService,
        private _authorized: AuthorizedService
    ) {

        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }
    }

    ngOnInit(){

        this.getListeTypeCategory();
    }

    getListeTypeCategory(){
        this._request.getListeTypeCategory().subscribe(
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

    openDialog() {
        const dialogRef = this._dialog.open(AddTypeCategoryComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                   this.getListeTypeCategory();
                }
            },
        });
    }

    editTypeCategory(data: any){
        const dialogRef = this._dialog.open(AddTypeCategoryComponent, {width: 'auto', data});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                this.getListeTypeCategory();
                }
            },
        });
    }

    deleteTypeCategory(slug: any){
        const dialogRef = this._dialog.open(DeleteModalComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this._loading.start();
                   this._request.deleteTypeCategory(slug).subscribe(
                    {
                        next: (response: any)=>{
                            if (response.code == 200) {
                                setTimeout(() => {
                                    this._message.successOperation(response);
                                    this._loading.stop();
                                    this.getListeTypeCategory();
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
