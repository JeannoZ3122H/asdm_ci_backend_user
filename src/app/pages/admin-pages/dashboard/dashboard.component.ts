import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  AsignedProjetEvaluateurComponent,
} from 'src/app/components/admin-components/asigned-projet-evaluateur/asigned-projet-evaluateur.component';
import {
  AsignedProjetNonCommercialEvaluateurComponent,
} from 'src/app/components/admin-components/asigned-projet-non-commercial-evaluateur/asigned-projet-non-commercial-evaluateur.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  StatistiqueService,
} from 'src/app/services/request/statistique/statistique.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
// polarArea
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
public _global_statistique: any = {};

public is_loading_data_co: boolean = true;
public is_loading_data_no_co: boolean = true;
public is_loading_data_help: boolean = true;

_visitor: boolean = false;

    constructor(
        private _dialog: MatDialog,
        private _request: ProjetsService,
        private _router: Router,
        private _message: MessageService,
        private _loading: NgxUiLoaderService,
        private _coockieService: CookieService,
        private _request_statistique: StatistiqueService,
        private _authorized: AuthorizedService
    ) {
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }
    }

    ngOnInit() {
        this.getGlobalProjetCommercial();
        this.getAdminStatistique();
        setTimeout(() => {
            this.getGlobalProjetNonCommercial();
            this.getGlobalProjetHelp();
        }, 2000);
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION STATISTIQUE REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    getAdminStatistique(){
        this._request_statistique.getStatistiqueAdmin().subscribe(
            {
                next: (response: any) =>{
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


    asignedAsEvaluator(data: any){
        Object.assign(data, {type_asigned:'asigned'});
        const dialogRef = this._dialog.open(AsignedProjetEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                // if (val == 'goToAsigned') {
                //     const id = data.id;
                //     this.asignedAsEvaluateor();
                // }
            },
        });
    }

    reasignedProjetAsEvaluateur(data: any) {
        localStorage.setItem('niveau_code', data.niveau_code);
        Object.assign(data, {type_asigned:'reasigned'});
        const dialogRef = this._dialog.open(AsignedProjetEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                // if (val == 'goToAsigned') {
                //     const id = data.id;
                //     this.asignedAsEvaluateor();
                // }
            },
        });
    }

    asignedAsNonCommercialEvaluator(data: any){
        Object.assign(data, {type_asigned:'asigned'});
        const dialogRef = this._dialog.open(AsignedProjetNonCommercialEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                // if (val == 'goToAsigned') {
                //     const id = data.id;
                //     this.asignedAsEvaluateor();
                // }
            },
        });
    }

    reasignedProjetAsNonCommercialEvaluateur(data: any) {
        localStorage.setItem('niveau_code_non_commercial', data.niveau_code);
        Object.assign(data, {type_asigned:'reasigned'});
        const dialogRef = this._dialog.open(AsignedProjetNonCommercialEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                // if (val == 'goToAsigned') {
                //     const id = data.id;
                //     this.asignedAsEvaluateor();
                // }
            },
        });
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** COMMERCIAL
    // get list projects
    getGlobalProjetCommercial(){
        // this.is_loading_data_co = true;
        this._request.getGlobalProjetCommercial().subscribe(
            {
                next: (response: any) =>{
                    this._liste_global_commercial_projet = response;

                    this.is_loading_data_co = false;
                },
                error: (error: any)=>{
                    if (error.status == 401) {
                        localStorage.removeItem('Ramzan_Kadyrov');
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
        // this.is_loading_data_no_co = true;
        this._request.getGlobalProjetNonCommercial().subscribe(
            {
                next: (response: any) =>{
                    // console.log(response)
                    this._liste_global_non_commercial_projet = response;

                    this.is_loading_data_no_co = false;
                },
                error: (error: any)=>{
                    if (error.status == 401) {
                        localStorage.removeItem('Ramzan_Kadyrov');
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
        // this.is_loading_data_help = true;
        this._request.getGlobalProjetHelp().subscribe(
            {
                next: (response: any) =>{
                    this._liste_global_help_projet = response;

                    this.is_loading_data_help = false;
                },
                error: (error: any)=>{
                    if (error.status == 401) {
                        localStorage.removeItem('Ramzan_Kadyrov');
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
