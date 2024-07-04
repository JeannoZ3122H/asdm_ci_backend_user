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
  AddCompteUtilisateurComponent,
} from 'src/app/components/admin-components/forms/add-compte-utilisateur/add-compte-utilisateur.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  UtilisateursService,
} from 'src/app/services/request/comptes/utlisateurs/utilisateurs.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
    selector: 'app-liste-compte-utilisateur',
    templateUrl: './liste-compte-utilisateur.component.html',
    styleUrls: ['./liste-compte-utilisateur.component.css']
})
export class ListeCompteUtilisateurComponent implements OnInit {

    public p!: number;
    public _liste_default_compte_utilisateur: any = [];
    public _liste_actived_compte_utilisateur: any = [];
    public is_defalut_account: boolean = true;
    public is_actived_account: boolean = false;
    public is_non_commercial_account: boolean = false;
    public is_commercial_account: boolean = true;


    _visitor: boolean = false;
    constructor(
        private _dialog: MatDialog,
        private _request: UtilisateursService,
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
        }
    }

    ngOnInit() {
        this.getListeCompteCommercialUtilisateurDefault();
        this.getListeCompteCommercialUtilisateurActived();
    }

// 😇😇 ************************************************ //
// ****************** START GLOBAL FUNCTION ACTIONS ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** EVENTS
    // show content by type category
    showUsersByTypeCategory(type: string){
        if(type == 'non-commercial'){
            this.is_non_commercial_account = true;
            this.is_commercial_account = false;
            this.gotToDefaultNonCommercialAccount();
        }
        if(type == 'commercial'){
            this.is_non_commercial_account = false;
            this.is_commercial_account = true;
            this.gotToDefaultCommercialAccount();
        }
    }
    // 😇😇 ************************************************ //
// ****************** END GLOBAL FUNCTION ACTIONS ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START COMMERCIAL FUNCTION ACTIONS ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** EVENTS
    // go to user default account
    gotToDefaultCommercialAccount() {
        this._loading.start();
        this.getListeCompteCommercialUtilisateurDefault();
        this.is_defalut_account = true;
        this.is_actived_account = false;
        this._loading.stop();
    }
    // go to user officiel account
    gotToActiveCommercialAccount() {
        this._loading.start();
        this.getListeCompteCommercialUtilisateurActived();
        this.is_defalut_account = false;
        this.is_actived_account = true;
        this._loading.stop();
    }
// 😇😇 **** REQUEST
// get user default list
    getListeCompteCommercialUtilisateurDefault() {

        this._request.getListeDefaultCompte().subscribe(
            {
                next: (response: any) => {
                    this._liste_default_compte_utilisateur = response;
                },
                error: (error: any) => {
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
    // delete user default account
    deleteDefaultCompteCommercialUtilisateur(slug: any) {
        const dialogRef = this._dialog.open(DeleteModalComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this._loading.start();
                    this._request.deleteDefaultCompte(slug).subscribe(
                        {
                            next: (response: any) => {
                                if (response.code == 200) {
                                    setTimeout(() => {
                                        this._message.successOperation(response);
                                        this._loading.stop();
                                        this.gotToDefaultCommercialAccount();
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
                        }
                    )
                }
            },
        });
    }
    // get user officiel list
    getListeCompteCommercialUtilisateurActived() {

        this._request.getListeActivedCompte().subscribe(
            {
                next: (response: any) => {
                    this._liste_actived_compte_utilisateur = response;
                },
                error: (error: any) => {
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
    // edit user officiel account
    editCompteCommercialUtilisateur(data: any, account_type: string) {
        localStorage.setItem('account_type', account_type);
        const dialogRef = this._dialog.open(AddCompteUtilisateurComponent, { width: 'auto', data });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == true) {

                }
            },
        });
    }
    // delete user officiel account
    deleteActivedCompteCommercialUtilisateur(slug: any) {
        const dialogRef = this._dialog.open(DeleteModalComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this._loading.start();
                    this._request.deleteActivedCompte(slug).subscribe(
                        {
                            next: (response: any) => {
                                if (response.code == 200) {
                                    setTimeout(() => {
                                        this._message.successOperation(response);
                                        this._loading.stop();
                                        this.gotToActiveCommercialAccount();

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
                        }
                    )
                }
            },
        });
    }
    // migrate user default account
    migrateDefaultCompteCommercial(slug: any) {
        this._loading.start();
        this._request.migrateDefaultCompte(slug).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.gotToDefaultCommercialAccount();
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
            }
        )
    }
    // status toggle user account
    statusActionCompteCommercialActived(slug: any) {
        this._loading.start();
        this._request.statusActionCompteActived(slug).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.gotToActiveCommercialAccount();
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
            }
        )
    }
    // 😇😇 ************************************************ //
// ****************** END COMMERCIAL FUNCTION ACTIONS ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START NON COMMERCIAL FUNCTION ACTIONS ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** REQUEST
    // get user default list
    getListeCompteNonCommercialUtilisateurDefault() {

        this._request.getListeDefaultCompteNonCommercial().subscribe(
            {
                next: (response: any) => {
                    this._liste_default_compte_utilisateur = response;
                },
                error: (error: any) => {
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
    // delete user default account
    deleteDefaultCompteNonCommercialUtilisateur(slug: any) {
        const dialogRef = this._dialog.open(DeleteModalComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this._loading.start();
                    this._request.deleteDefaultCompteNonCommercial(slug).subscribe(
                        {
                            next: (response: any) => {
                                if (response.code == 200) {
                                    setTimeout(() => {
                                        this._message.successOperation(response);
                                        this._loading.stop();
                                        this.gotToActiveNonCommercialAccount();

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
                        }
                    )
                }
            },
        });
    }
    // get user officiel list
    getListeCompteNonCommercialUtilisateurActived() {

        this._request.getListeActivedCompteNonCommercial().subscribe(
            {
                next: (response: any) => {
                    this._liste_actived_compte_utilisateur = response;
                },
                error: (error: any) => {
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
    // edit user officiel account
    editCompteNonCommercialUtilisateur(data: any, account_type: string) {
        localStorage.setItem('account_type', account_type);
        const dialogRef = this._dialog.open(AddCompteUtilisateurComponent, { width: 'auto', data });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == true) {
                    this.gotToDefaultNonCommercialAccount();
                    this.gotToActiveNonCommercialAccount();
                }
            },
        });
    }
    // delete user officiel account
    deleteActivedCompteNonCommercialUtilisateur(slug: any) {
        const dialogRef = this._dialog.open(DeleteModalComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                    this._loading.start();
                    this._request.deleteActivedCompteNonCommercial(slug).subscribe(
                        {
                            next: (response: any) => {
                                if (response.code == 200) {
                                    setTimeout(() => {
                                        this._message.successOperation(response);
                                        this._loading.stop();
                                        this.gotToActiveNonCommercialAccount();

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
                        }
                    )
                }
            },
        });
    }
    // migrate user default account
    migrateDefaultCompteNonCommercial(slug: any) {
        this._loading.start();
        this._request.migrateDefaultCompteNonCommercial(slug).subscribe(
            {
                next: (response: any) => {
                    // console.log(response)
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.gotToDefaultNonCommercialAccount();
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
            }
        )
    }
    // status toggle user account
    statusActionCompteNonCommercialActived(slug: any) {
        this._loading.start();
        this._request.statusActionCompteActivedNonCommercial(slug).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.gotToActiveNonCommercialAccount();
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
            }
        )
    }
// 😇😇 **** EVENTS
    // go to user default account
    gotToDefaultNonCommercialAccount() {
        this._loading.start();
        this.getListeCompteNonCommercialUtilisateurDefault();
        this.is_defalut_account = true;
        this.is_actived_account = false;
        this._loading.stop();
    }
    // go to user officiel account
    gotToActiveNonCommercialAccount() {
        this._loading.start();
        this.getListeCompteNonCommercialUtilisateurActived();
        this.is_defalut_account = false;
        this.is_actived_account = true;
        this._loading.stop();
    }

    // 😇😇 ************************************************ //
// ****************** END NON COMMERCIAL FUNCTION ACTIONS ****************** //
// ************************************************ 😇😇😇😇 //


}
