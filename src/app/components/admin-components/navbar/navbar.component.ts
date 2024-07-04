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
import { AuthService } from 'src/app/services/request/auth/auth.service';
import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


    // public user_name: any;
    public sidebar_menu_list: any = [

        {
            id: 0,
            category: 'généralités',
            icon_category: 'space_dashboard',
            item_name: "Tableau de bord",
            item_icon: "dashboard",
            router: "/web.administration.welcome"
        },
        {
            id: 1,
            item_name: "Profil",
            item_icon: "person",
            router: "/web.administration.profile"
        },
        {
            id: 2,
            category: 'Comptes',
            icon_category: 'manage_accounts',
            title: "Comptes",
            item_name: "Administrateurs",
            item_icon: "person",
            router: "/web.administration.liste-compte-admin"
        },
        {
            id: 3,
            item_name: "Évaluateurs",
            item_icon: "person",
            router: "/web.administration.liste-compte-evaluateurs"
        },
        {
            id: 4,
            item_name: "Utilisateurs",
            item_icon: "person",
            router: "/web.administration.liste-compte-utilisateurs"
        },
        {
            id: 5,
            category: 'Subvention',
            icon_category: 'backup_table',
            title: "Liste projets",
            item_name: "Projets entreprise",
            item_icon: "list_alt",
            router: "/web.administration.commercial.liste-projet-globale"
        },
        {
            id: 6,
            item_name: "Projets organisation",
            item_icon: "list_alt",
            router: "/web.administration.non-commercial.liste-projet-globale"
        },
        {
            id: 7,
            title: "Décision finale",
            item_name: "Projets entreprise",
            item_icon: "list_alt",
            router: "/web.administration.commercial.liste-projet-resolved-finale"
        },
        {
            id: 8,
            item_name: "Projets organisation",
            item_icon: "list_alt",
            router: "/web.administration.non-commercial.liste-projet-resolved-finale"
        },
        {
            id: 5,
            category: 'Fonds de garantie',
            icon_category: 'backup_table',
            title: "Liste projets",
            item_name: "Projets globaux",
            item_icon: "list_alt",
            router: "/web.administration.help.liste-projet-globale"
        },
        {
            id: 7,
            title: "Décision finale",
            item_name: "Projets globaux",
            item_icon: "list_alt",
            router: "/web.administration.help.liste-projet-resolved-finale"
        },
        {
            id: 4,
            category: 'Rapports',
            icon_category: 'picture_as_pdf',
            item_name: "Générer un rapport",
            item_icon: "document_scanner",
            router: "/web.administration.view-project-repport"
        },
        {
            id: 9,
            category: 'Analytiques',
            icon_category: 'analytics',
            item_name: "Statistiques",
            item_icon: "list_alt",
            router: "/web.administration.statistiques"
        },
        {
            id: 11,
            category: 'Paramètres',
            icon_category: 'perm_data_setting',
            item_name: "Liste catégorie",
            item_icon: "list_alt",
            router: "/web.administration.liste-categories"
        },
        {
            id: 13,
            item_name: "Niveau instruction",
            item_icon: "list_alt",
            router: "/web.administration.liste-niveaux"
        },
        {
            id: 14,
            item_name: "Liste type catégorie",
            item_icon: "list_alt",
            router: "/web.administration.liste-types-categories"
        },
        {
            id: 12,
            item_name: "Liste formes juridiques",
            item_icon: "list_alt",
            router: "/web.administration.list-forme-juridique"
        },
        {
            id: 12,
            item_name: "Liste taux d'intérêts",
            item_icon: "list_alt",
            router: "/web.administration.list-taux-interets"
        },
        {
            id: 12,
            item_name: "Liste des catégories doc...",
            item_icon: "list_alt",
            router: "/web.administration.list-category-docs"
        },
        {
            id: 12,
            item_name: "Liste des documents",
            item_icon: "list_alt",
            router: "/web.administration.list-docs-fournir"
        },
        {
            id: 15,
            item_name: "Liste rôle",
            item_icon: "list_alt",
            router: "/web.administration.liste-role"
        },
        {
            id: 16,
            item_name: "Liste session",
            item_icon: "list_alt",
            router: "/web.administration.liste-session"
        },
        {
            id: 17,
            item_name: "Budget annuel",
            item_icon: "list_alt",
            router: "/web.administration.budget-annuel"
        },

    ];

    public user_name: string = '';
    public user_id: any;
    public online_user_data: any;

    public screenWidth!: number;

    constructor(
        private _dataService: CustomerStorageService,
        private _customer_coockie: CustomerCookieService,
        private _coockie: CookieService,
        private _message: MessageService,
        private _request: AuthService,
        private _router: Router,
        private _loading: NgxUiLoaderService,
    ) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };

        // this._translate.setDefaultLang('en');

    }

    ngOnInit(){
        this.getUserConnectedData();

        this.online_user_data = this._dataService.getDataToStorage();
    }


    switchLanguage(language: string) {
        // this._translate.use(language);
    }


    getUserConnectedData() {
        // let data = this._dataService.getData()
        // this.user_name = data.full_name;
        // this.user_id = data.user_id;
    }

    logOut(id: number) {
        this._loading.start();
        this._request.logOut(id).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {

                        sessionStorage.clear();
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockie.delete('us_id');
                        this._coockie.delete('dragonFly');
                        this._message.tokenExpired();
                        this._loading.stop();
                        this._router.navigateByUrl('/');

                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
                    this._loading.stop();
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockie.delete('us_id');
                        this._coockie.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }


    // forgot password
    forgotPassword(){
        localStorage.setItem('sve', 'start');
        setTimeout(() => {
            this._router.navigateByUrl('/web.forgot-password')
        }, 500);
    }
}

