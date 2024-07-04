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
  AddCompteAdminComponent,
} from 'src/app/components/admin-components/forms/add-compte-admin/add-compte-admin.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  AdminService,
} from 'src/app/services/request/comptes/admin/admin.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-liste-compte-admin',
  templateUrl: './liste-compte-admin.component.html',
  styleUrls: ['./liste-compte-admin.component.css']
})
export class ListeCompteAdminComponent implements OnInit{

    public p!: number;

    public _liste_compte_admin: any;
    _visitor: boolean = false;
    constructor(
        private _dialog: MatDialog,
        private _request: AdminService,
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

        this.getListeCompteAdmin();
    }

    getListeCompteAdmin(){

        this._request.getListeCompte().subscribe(
            {
                next: (response: any) =>{
                    this._liste_compte_admin = response;
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
        const dialogRef = this._dialog.open(AddCompteAdminComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                   this.getListeCompteAdmin();
                }
            },
        });
    }

    editCompteAdmin(data: any){
        const dialogRef = this._dialog.open(AddCompteAdminComponent, {width: 'auto', data});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                this.getListeCompteAdmin();
                }
            },
        });
    }

    deleteCompteAdmin(slug: any){
        const dialogRef = this._dialog.open(DeleteModalComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                   this._request.deleteCompte(slug).subscribe(
                    {
                        next: (response: any)=>{
                            if (response.code == 200) {
                                setTimeout(() => {
                                    this._message.successOperation(response);
                                    this._loading.stop();
                                    this.getListeCompteAdmin();
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

    statusAction(slug: number){
        this._loading.start();
        this._request.statusAction(slug).subscribe(
            {
                next: (response: any)=>{
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.getListeCompteAdmin();
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
}
