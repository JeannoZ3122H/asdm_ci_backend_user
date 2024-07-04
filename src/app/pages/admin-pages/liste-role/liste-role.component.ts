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
  AddRoleComponent,
} from 'src/app/components/admin-components/forms/add-role/add-role.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import { RoleService } from 'src/app/services/request/role/role.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-liste-role',
  templateUrl: './liste-role.component.html',
  styleUrls: ['./liste-role.component.css']
})
export class ListeRoleComponent  implements OnInit{


    public _liste_role: any;

_visitor: boolean = false;
    constructor(
        private _dialog: MatDialog,
        private _request: RoleService,
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

        this.getListeRole();
    }

    getListeRole(){
        this._request.getListeRole().subscribe(
            {
                next: (response: any) =>{
                    this._liste_role = response;
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
        const dialogRef = this._dialog.open(AddRoleComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                    this.getListeRole();
                }
            },
        });
    }

    editRole(data: any){
        const dialogRef = this._dialog.open(AddRoleComponent, {width: 'auto', data});
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val==true) {
                    this.getListeRole();
                }
            },
        });
    }

    deleteRole(slug: any){
        const dialogRef = this._dialog.open(DeleteModalComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this._loading.start();
                   this._request.deleteRole(slug).subscribe(
                    {
                        next: (response: any)=>{
                            if (response.code == 200) {
                                setTimeout(() => {
                                    this._message.successOperation(response);
                                    this._loading.stop();
                                    this.getListeRole();
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
