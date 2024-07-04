import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  EvaluateursService,
} from 'src/app/services/request/comptes/evaluateurs/evaluateurs.service';
import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-evaluateur-profil',
  templateUrl: './evaluateur-profil.component.html',
  styleUrls: ['./evaluateur-profil.component.css']
})
export class EvaluateurProfilComponent implements OnInit {

    public data: any;
    public my_banner: string = 'assets/img/banner-welcome-2.jpg';
    public online_user_data: any;

    public fname: string = '';
    public lname: string = '';
    public email: string = '';
    public fonction: string = '';
    public matricule: string = '';
    public phone: string = '';
    public photo_url: string = '';
    public niveau_name: string = '';

    constructor(
        private _dataService: CustomerStorageService,
        private _customer_coockie: CustomerCookieService,
        private _coockie: CookieService,
        private _message: MessageService,
        private _request: EvaluateursService,
        private _router: Router,
        private _loading: NgxUiLoaderService,
    ) {}

    ngOnInit(){
        this.online_user_data = this._dataService.getDataToStorage();
        this.data = this.online_user_data;
        this.fname = this.data.fname;
        this.lname = this.data.lname;
        this.email = this.data.email;
        this.fonction = this.data.fonction;
        this.matricule = this.data.matricule;
        this.phone = this.data.phone;
        this.photo_url = this.data.photo_url;
        this.niveau_name = this.data.niveau_name;
    }

    updateUserAccount (){
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

        const data = {
            fname: this.fname,
            lname: this.lname,
            phone: this.phone ,
            email: this.email ,
            matricule: this.matricule,
            fonction: this.fonction,
            niveau_id: this.data.niveau_id,
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
}

