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
  EvaluateursService,
} from 'src/app/services/request/comptes/evaluateurs/evaluateurs.service';
import { NiveauService } from 'src/app/services/request/niveau/niveau.service';

@Component({
  selector: 'app-add-compte-evaluateur',
  templateUrl: './add-compte-evaluateur.component.html',
  styleUrls: ['./add-compte-evaluateur.component.css']
})
export class AddCompteEvaluateurComponent implements OnInit {

    public fname: string = '';
    public lname: string = '';
    public phone: string = '';
    public email: string = '';
    public fonction: string = '';
    public matricule: string = '';
    public niveau: string = '';
    public hide: boolean = true
    public is_update: boolean = false;
    public niveau_id:  any = 0;
    public item_id: any = 0;
    public item_slug: string = '';
    public selectedOption: string = '';
    public list_role: any = [];
    public _liste_niveau: any = [];
    public photo!: File;


    constructor(
        private _message: MessageService,
        private _request: EvaluateursService,
        private _request_niveau: NiveauService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddCompteEvaluateurComponent>,
    ) { }


    ngOnInit() {
        // console.log(this.data); return

        if(this.data != null) {
            this.is_update = true;
            this.lname = this.data.lname;
            this.fname = this.data.fname;
            this.phone = this.data.phone;
            this.fonction = this.data.fonction;
            this.matricule = this.data.matricule;
            this.email = this.data.email;
            this.niveau_id = this.data.niveau_id;
            this.niveau = this.data.niveau_name;
            this.item_id = this.data.id;
            this.item_slug = this.data.slug;
        }
        this.getListeNiveau();
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
            fonction: this.fonction
        }

        localStorage.setItem('my_old_data_ev', JSON.stringify(data));
    }
    // get data temp to ls
    getDataTempToLs(){

        console.log('e')
        let data: any = localStorage.getItem('my_old_data_ev');

        if(data != null){
            let DATA: any = JSON.stringify(data);

            this.fname = DATA.fname;
            this.lname = DATA.lname;
            this.phone = DATA.phone;
            this.email = DATA.email;
            this.matricule = DATA.matricule;
            this.fonction = DATA.fonction;
        }

    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

// 😇😇 ************************************************ //
// ****************** START REQUEST DATA TO DB ****************** //
    // ************************************************ 😇😇😇😇 //
    // select role
    selectNiveau(event: any) {
        this.niveau_id = event.value;
    }
    // choosing photo
    choosePhoto(e: any) {
        this.photo = e.target.files[0];
    }
    // get list niveau
    getListeNiveau(){
        this._request_niveau.getListeNiveau().subscribe(
            {
                next: (response: any) =>{
                    this._liste_niveau = response;
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
    // store ev account
    saveCompteEvaluateur() {
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

        if (this.niveau_id == 0) {

            this._message.errorField();
            return
        }

        const formData: FormData = new FormData();
        formData.append("fname", this.fname);
        formData.append("lname", this.lname);
        formData.append("phone", this.phone );
        formData.append("niveau_id", this.niveau_id );
        formData.append("email", this.email );
        formData.append("matricule", this.matricule);
        formData.append("fonction", this.fonction);
        formData.append("photo", this.photo != undefined ? this.photo : "");

        this._loading.start();

        this._request.saveCompte(formData).subscribe({

            next: (response: any) => {
                //console.log(response)
                if (response.code == 200) {
                    setTimeout(() => {
                        localStorage.removeItem('my_old_data_ev');
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
    // update ev account
    updateCompteEvaluateur() {
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

        if (this.niveau_id == '') {
            this._message.errorField();
            return
        }

        const formData: FormData = new FormData();
        formData.append("fname", this.fname);
        formData.append("lname", this.lname);
        formData.append("phone", this.phone );
        formData.append("niveau_id", this.niveau_id );
        formData.append("email", this.email );
        formData.append("fonction", this.fonction );
        formData.append("matricule", this.matricule);
        formData.append("photo", this.photo != undefined ? this.photo : "");

        this._loading.start();

        this._request.updateCompte(this.item_slug, formData).subscribe({

            next: (response: any) => {
                // console.log(response)
                if (response.code == 200) {
                    setTimeout(() => {
                        localStorage.removeItem('my_old_data_ev');
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
