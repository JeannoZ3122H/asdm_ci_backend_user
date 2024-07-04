import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';
import {
  StatistiqueService,
} from 'src/app/services/request/statistique/statistique.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public pE: number = 1;
    public pO: number = 1;
    public pF: number = 1;
    public _liste_global_commercial_projet: any = [];
    public _liste_global_non_commercial_projet: any = [];
    public _liste_global_help_projet: any = [];

    public _statistique_project_validated: number = 0;
    public _statistique_project_rejeted: number = 0;
    public _statistique_project__validated_ev_1: number = 0;
    public _statistique_project_rejeted_ev_1: number = 0;
    public _statistique_total_utilisatteur: number = 0;
    public _statistique_total_project_soumis: number = 0;
    public _statistique_total_soumissionnaire: number = 0;
    public evaluateur: any = {};
    public _global_statistique: any = {};
    public is_loading_data_co: boolean = true;
    public is_loading_data_no_co: boolean = true;
    public is_loading_data_help: boolean = true;

    constructor(
        private _dialog: MatDialog,
        private _request: FirstEvaluatorService,
        private _router: Router,
        private _message: MessageService,
        private _loading: NgxUiLoaderService,
        private _coockieService: CookieService,
        private _localStorage: CustomerStorageService,
        private _request_statistique: StatistiqueService
    ) {}

    ngOnInit() {
        this.evaluateur = this._localStorage.getDataToStorage();

        // console.log(this.evaluateur)
        this.getStatistiqueEvaluator();

        setTimeout(() => {
            this.getGlobalProjetCommercial();
            this.getGlobalProjetNonCommercial();
            this.getGlobalProjetHelp();
        }, 1000);
    }


// 😇😇 ************************************************ //
// ****************** START FUNCTION STATISTIQUE REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    getStatistiqueEvaluator(){
        this._request_statistique.getStatistiqueEvaluator(this.evaluateur.id,  this.evaluateur.niveau_code).subscribe(
            {
                next: (response: any) =>{
                    // console.log(response)
                    this._global_statistique = response;
                },
                error: (error: any)=>{
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('us_id');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }

    // 😇😇 ************************************************ //
// ****************** END FUNCTION STATISTIQUE REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** COMMERCIAL
    // get list projects
    getGlobalProjetCommercial(){
        this._request.getListeProjetCommercial(this.evaluateur.id).subscribe(
            {
                next: (response: any) =>{
                    this._liste_global_commercial_projet = response;

                    this.is_loading_data_co = false;
                },
                error: (error: any)=>{
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('us_id');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }

// 😇😇 **** NON COMMERCIAL
    // get list projects
    getGlobalProjetNonCommercial(){
        this._request.getListeProjetNonCommercial(this.evaluateur.id).subscribe(
            {
                next: (response: any) =>{
                    this._liste_global_non_commercial_projet = response;

                    this.is_loading_data_no_co = false;
                },
                error: (error: any)=>{
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('us_id');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }

// 😇😇 **** HELP
    // get list projects
    getGlobalProjetHelp(){
        this._request.getListeProjetHelp(this.evaluateur.id).subscribe(
            {
                next: (response: any) =>{
                    this._liste_global_help_projet = response;

                    this.is_loading_data_help = false;
                },
                error: (error: any)=>{
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('us_id');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }

    // 😇😇 ************************************************ //
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //


}
