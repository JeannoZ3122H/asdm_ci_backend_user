import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  UpdateAdminAvatarComponent,
} from 'src/app/components/admin-components/admin-except-projet-components/update-admin-avatar/update-admin-avatar.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  AdminService,
} from 'src/app/services/request/comptes/admin/admin.service';
import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public data: any;
    public online_user_data: any;

    public fname: string = '';
    public lname: string = '';
    public email: string = '';
    public fonction: string = '';
    public matricule: string = '';
    public phone: string = '';
    public photo_url: string = '';
    public role: string = '';

    constructor(
        private _dataService: CustomerStorageService,
        private _customer_coockie: CustomerCookieService,
        private _coockie: CookieService,
        private _message: MessageService,
        private _request: AdminService,
        private _router: Router,
        private _loading: NgxUiLoaderService,
        private dialog: MatDialog
    ) { }

    ngOnInit() {
        this.online_user_data = this._dataService.getDataToStorage();
        this.data = this.online_user_data;
        this.fname = this.data.fname;
        this.lname = this.data.lname;
        this.email = this.data.email;
        this.fonction = this.data.fonction;
        this.matricule = this.data.matricule;
        this.phone = this.data.phone;
        this.photo_url = this.data.photo_url;
        this.role = this.data.role;
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** UPDATE
    // update admin data
    updateUserAccount() {
        const data = {
            fname: this.fname,
            lname: this.lname,
            phone: this.phone,
            matricule: this.matricule,
            fonction: this.fonction,
            email: this.email,
            role: this.role
        }

        this._loading.start();
        this._request.updateCompte(this.data.slug, data).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._dataService.setDataToStorage(response.user_data);
                        this._message.successOperation(response);
                        this._loading.stop();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loading.stop();
                    this._message.error(response);
                }
            },
            error: (error: any) => {
                let _error = error.error;
                if (error.status == 401 || _error.message == "Token has expired") {
                    localStorage.removeItem('Ramzan_Kadyrov');
                    this._coockie.delete('us_id');
                    this._coockie.delete('dragonFly');
                    this._message.tokenExpired();
                    this._router.navigateByUrl('/');
                }
            }
        })
    }
    // udate admin img
    updateUserAccountAvatar(){
        let dialogRef = this.dialog.open(UpdateAdminAvatarComponent, {
            width: '450px',
        });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'good') {
                    window.location.reload();
                }
            },
        });
    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //

}
