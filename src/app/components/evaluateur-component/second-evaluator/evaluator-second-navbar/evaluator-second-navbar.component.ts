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
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-evaluator-second-navbar',
  templateUrl: './evaluator-second-navbar.component.html',
  styleUrls: ['./evaluator-second-navbar.component.css']
})
export class EvaluatorSecondNavbarComponent  implements OnInit {

    // public user_name: any;
    public sidebar_menu_list: any = [

        {
            id: 1,
            category: 'généralités',
            icon_category: 'space_dashboard',
            item_name: "Tableau de bord",
            item_icon: "dashboard",
            router: "/web.second-evaluateur.welcome"
        },
        {
            id: 2,
            item_name: "Profil",
            item_icon: "person",
            router: "/web.second-evaluateur.profil"
        },
        {
            id: 3,
            item_name: "Messagerie",
            item_icon: "sms",
            router: "/web.second-evaluateur.my-message-list"
        },
        {
            id: 4,
            category: 'Documents',
            icon_category: 'content_copy',
            item_name: "Documents conventions",
            item_icon: "post_add",
            router: "/web.second-evaluateur.document-convention"
        },
        {
            id: 4,
            category: 'Rapports',
            icon_category: 'picture_as_pdf',
            item_name: "Générer un rapport",
            item_icon: "document_scanner",
            router: "/web.second-evaluateur.view-project-repport"
        },
        {
            id: 4,
            category: 'Subvention',
            icon_category: 'space_dashboard',
            title: "Liste projets globaux",
            item_name: "Entreprise",
            item_icon: "list_alt",
            router: "/web.second-evaluateur.commercial.liste-projet"
        },
        {
            id: 5,
            item_name: "Organisation",
            item_icon: "list_alt",
            router: "/web.second-evaluateur.non-commercial.liste-projet"
        },
        {
            id: 5,
            title: "Liste (projets traités)",
            item_name: "Entreprise",
            item_icon: "list_alt",
            router: "/web.second-evaluateur.commercial.liste-projet-resolved"
        },
        {
            id: 5,
            item_name: "Organisation",
            item_icon: "list_alt",
            router: "/web.second-evaluateur.non-commercial.liste-projet-resolved"
        },
        {
            id: 6,
            category: 'Fonds de garantie',
            icon_category: 'space_dashboard',
            title: "Liste projets globaux",
            item_name: "Entreprise & Organisation",
            item_icon: "list_alt",
            router: "/web.second-evaluateur.help.liste-projet"
        },
        {
            id: 5,
            title: "Liste (projets traités)",
            item_name: "Entreprise & Organisation",
            item_icon: "list_alt",
            router: "/web.second-evaluateur.help.liste-projet-resolved"
        },
    ];

    public user_name: string = '';
    public user_id: any;
    public online_user_data: any;

    public screenWidth!: number;

    constructor(
        private _dataService: CustomerStorageService,
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

    ngOnInit() {
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
                next: (response: any) => {
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
                }, error: (error: any) => {
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
