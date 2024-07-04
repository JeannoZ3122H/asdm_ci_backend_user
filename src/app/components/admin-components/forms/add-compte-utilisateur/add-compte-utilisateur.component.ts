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
  UtilisateursService,
} from 'src/app/services/request/comptes/utlisateurs/utilisateurs.service';

@Component({
    selector: 'app-add-compte-utilisateur',
    templateUrl: './add-compte-utilisateur.component.html',
    styleUrls: ['./add-compte-utilisateur.component.css']
})
export class AddCompteUtilisateurComponent implements OnInit {

    public directeur_general: string = '';
    public contact: string = '';
    public email: string = '';
    public site_web: string = '';
    public address_postal: string = '';
    public entreprise: string = '';
    public address_geographique: string = '';
    public hide: boolean = true
    public is_update_actived_account: boolean = false;
    public is_update_default_account: boolean = false;
    public item_id: any;
    public item_slug: any;
    public phone: any;
    public selectedOption: any;
    public effectif: any;
    public chef_projet: any;
    public contact_chef_projet: any;

    constructor(
        private _message: MessageService,
        private _request: UtilisateursService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddCompteUtilisateurComponent>,
    ) { }


    ngOnInit() {
        if ((this.data != null)) {
            this.directeur_general = this.data.directeur_general;
            this.entreprise = this.data.business;
            this.site_web = this.data.web_site_url;
            this.address_postal = this.data.address_postal;
            this.email = this.data.email;
            this.phone = this.data.contacts;
            this.address_geographique = this.data.address;
            this.item_slug = this.data.slug;
            this.item_id = this.data.id;
            this.effectif = this.data.effectif;
            this.chef_projet = this.data.chef_projet;
            this.contact_chef_projet = this.data.contact_chef_projet;

            let account_type = localStorage.getItem('account_type');
            if (account_type == 'default') {
                this.is_update_default_account = true;
                this.is_update_actived_account = false;
            }
            if (account_type == 'actived') {

                this.is_update_default_account = false;
                this.is_update_actived_account = true;
            }
        }
    }



// 😇😇 ************************************************ //
// ****************** START REQUEST DATA TO DB ****************** //
    // ************************************************ 😇😇😇😇 //
    // update user default account
    updateDefaultCompte() {
        if (this.directeur_general == '') {
            this._message.errorField();
            return
        }

        if (this.address_postal == '') {
            this._message.errorField();
            return
        }

        if (this.address_geographique == '') {
            this._message.errorField();
            return
        }

        if (this.entreprise == '') {
            this._message.errorField();
            return
        }

        if (this.site_web == '') {
            this._message.errorField();
            return
        }

        if (this.email == '') {

            this._message.errorField();
            return
        }

        const formData: FormData = new FormData();
        formData.append("directeur_general", this.directeur_general);
        formData.append("contact", this.phone);
        formData.append("business", this.entreprise);
        formData.append("email", this.email);
        formData.append("web_site_url", this.site_web);
        formData.append("address_postal", this.address_postal);
        formData.append("address_geographique", this.address_geographique);
        formData.append("effectif", this.effectif);
        formData.append("chef_projet", this.chef_projet);
        formData.append("contact_chef_projet", this.contact_chef_projet);

        this._loading.start();
        this._request.updateDefaultCompte(this.item_slug, formData, this.data.type_category_code).subscribe({

            next: (response: any) => {
                // console.log(response)
                if (response.code == 200) {
                    setTimeout(() => {
                        localStorage.removeItem('my_old_data_user');
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
    // update user officielle account
    updateActivedCompte() {
        if (this.directeur_general == '') {
            this._message.errorField();
            return
        }

        if (this.address_postal == '') {
            this._message.errorField();
            return
        }

        if (this.address_geographique == '') {
            this._message.errorField();
            return
        }

        if (this.entreprise == '') {
            this._message.errorField();
            return
        }

        if (this.site_web == '') {
            this._message.errorField();
            return
        }

        if (this.email == '') {

            this._message.errorField();
            return
        }

        const formData: FormData = new FormData();
        formData.append("directeur_general", this.directeur_general);
        formData.append("contact", this.phone);
        formData.append("business", this.entreprise);
        formData.append("email", this.email);
        formData.append("web_site_url", this.site_web);
        formData.append("address_postal", this.address_postal);
        formData.append("address_geographique", this.address_geographique);
        formData.append("effectif", this.effectif);
        formData.append("chef_projet", this.chef_projet);
        formData.append("contact_chef_projet", this.contact_chef_projet);

        this._loading.start();
        this._request.updateActivedCompte(this.item_slug, formData, this.data.type_category_code).subscribe({

            next: (response: any) => {
                // console.log(response)
                if (response.code == 200) {
                    setTimeout(() => {
                        localStorage.removeItem('my_old_data_user');
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


