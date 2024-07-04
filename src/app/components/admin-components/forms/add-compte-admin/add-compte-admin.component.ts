import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  AdminService,
} from 'src/app/services/request/comptes/admin/admin.service';
import { RoleService } from 'src/app/services/request/role/role.service';

@Component({
  selector: 'app-add-compte-admin',
  templateUrl: './add-compte-admin.component.html',
  styleUrls: ['./add-compte-admin.component.css']
})
export class AddCompteAdminComponent implements OnInit {

    public fname: string = '';
    public lname: string = '';
    public phone: string = '';
    public email: string = '';
    public fonction: string = '';
    public matricule: string = '';
    public role: string = '';
    public hide: boolean = true
    public is_update: boolean = false;
    public item_id: any;
    public item_slug: string = '';
    public selectedOption: any;
    public _liste_role: any;
    public photo!: File;


    constructor(
        private _message: MessageService,
        private _request: AdminService,
        private _request_role: RoleService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddCompteAdminComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null) {
            this.is_update = true;
            this.lname = this.data.lname;
            this.fname = this.data.fname;
            this.phone = this.data.phone;
            this.fonction = this.data.fonction;
            this.matricule = this.data.matricule;
            this.email = this.data.email;
            this.role = this.data.role;
            this.item_slug = this.data.slug;
            this.item_id = this.data.id;
            this.role = this.role
        }
        
        this.getListeRole();
        this.getDataTempToLs();
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
    // store data temp to ls
    storeDataTempToLs(e: any){
        const data = {
            fname: this.fname,
            lname: this.lname,
            phone: this.phone,
            email: this.email,
            matricule: this.matricule,
            fonction: this.fonction,
            role: this.role
        }

        localStorage.setItem('my_old_data', JSON.stringify(data));
    }
    // get data temp to ls
    getDataTempToLs(){
        let data: any = localStorage.getItem('my_old_data');

        if(data != null){
            let DATA: any = JSON.stringify(data);

            this.fname = DATA.fname;
            this.lname = DATA.lname;
            this.phone = DATA.phone;
            this.email = DATA.email;
            this.matricule = DATA.matricule;
            this.fonction = DATA.fonction;
            this.role = DATA.role;
        }

    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

// 😇😇 ************************************************ //
// ****************** START REQUEST DATA TO DB ****************** //
    // ************************************************ 😇😇😇😇 //
    // select role
    selectRole(event: any) {
        this.role = event.value;
    }
    // choose my photo
    choosePhoto(e: any) {
        this.photo = e.target.files[0];
    }
    // get list role
    getListeRole(){
        this._request_role.getListeRole().subscribe(
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
    // store user data
    saveCompte() {
        if (this.fname == '') {
            this._message.errorField();
            return
        }

        if (this.lname == '') {
            this._message.errorField();
            return
        }

        if (this.phone == '') {
            this._message.errorField();
            return
        }

        if (this.matricule == '') {
            this._message.errorField();
            return
        }

        if (this.email == '') {

            this._message.errorField();
            return
        }

        if (this.fonction == '') {

            this._message.errorField();
            return
        }

        const formData: FormData = new FormData();
        formData.append("fname", this.fname);
        formData.append("lname", this.lname);
        formData.append("phone", this.phone );
        formData.append("email", this.email );
        formData.append("matricule", this.matricule);
        formData.append("fonction", this.fonction);
        formData.append("role", this.role);
        formData.append("photo", this.photo != undefined ? this.photo : "");

        this._loading.start();

        this._request.saveCompte(formData).subscribe({

            next: (response: any) => {
                //console.log(response)
                if (response.code == 200) {
                    setTimeout(() => {
                        localStorage.removeItem('my_old_data');
                        this._message.successOperation(response);
                        this._loading.stop();
                        this._dialogRef.close(true);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
                    this._loading.stop();
                    this._message.error(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._message.tokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    window.location.reload();
                }
            }
        })

    }
    // update user data
    updateCompte() {
        if (this.lname == '') {
           this._message.errorField();
            return
        }

        if (this.fname == '') {
           this._message.errorField();
            return
        }

        if (this.phone == '') {
           this._message.errorField();
            return
        }
        if (this.matricule == '') {
           this._message.errorField();
            return
        }

        if (this.fonction == '') {
           this._message.errorField();
            return
        }

        if (this.email == '') {

            this._message.errorField();
            return
        }

        if (this.role == '') {
            this._message.errorField();
            return
        }

        const formData: FormData = new FormData();
        formData.append("fname", this.fname);
        formData.append("lname", this.lname);
        formData.append("phone", this.phone );
        formData.append("email", this.email );
        formData.append("fonction", this.fonction );
        formData.append("matricule", this.matricule);
        formData.append("role", this.role);
        formData.append("photo", this.photo != undefined ? this.photo : "");

        this._loading.start();

        this._request.updateCompte(this.item_slug, formData).subscribe({

            next: (response: any) => {
                // console.log(response)
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
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._message.tokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');
                    window.location.reload();
                }
            }
        })

    }
    // 😇😇 ************************************************ //
// ****************** END REQUEST DATA TO DB ****************** //
// ************************************************ 😇😇😇😇 //

}
