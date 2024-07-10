import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
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
export class DashboardComponent implements OnInit, OnDestroy{
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
private unscribe = new Subscription();

    constructor(
        private _dialog: MatDialog,
        private _request: ProjetsService,
        private _router: Router,
        private _message: MessageService,
        private _coockieService: CookieService,
        private _request_statistique: StatistiqueService,
        private _authorized: AuthorizedService,
        // new
        private _snackBar: MatSnackBar
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
        this.unscribe.add(
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
        ))
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

    // new
    openSnackBar(code: string) {
        this._snackBar.open(`Code ref. du projet: #${code}`, 'Copié',{
            duration: 2000
        });
    }
    calculatePeriod(startDate: Date, endDate: Date): number {
        // Ensure the end date is after the start date
        if (endDate < startDate) {
            throw new Error("End date must be after start date.");
        }

        // Calculate the difference in milliseconds
        const diffInMs: number = endDate.getTime() - startDate.getTime();

        // Convert milliseconds to days
        const msInDay: number = 24 * 60 * 60 * 1000;
        const diffInDays: number = diffInMs / msInDay;

        return diffInDays;
    }
    period(data: any, _date: any){

        let result: Boolean = false;

        if(data.status == 1){
            const date = new Date();
            const date_debut = _date;
            const date_fin = this.formatDate(date);
            const startDate = new Date(date_debut);
            const endDate = new Date(date_fin);
            const period = this.calculatePeriod(startDate, endDate);
            if(period >= 30){
                if(data.status_decisions_on == 0 && data.status_decisions_off == 0){
                    result = true;
                }else{
                    result = false;
                }
            }else{
                result = false;
            }
        }else{
            result = false;
        }
        return result;
    }
    periodFond(data: any, _date: any){

        let result: Boolean = false;

        if(data.status_fond == 1){
            const date = new Date();
            const date_debut = _date;
            const date_fin = this.formatDate(date);
            const startDate = new Date(date_debut);
            const endDate = new Date(date_fin);
            const period = this.calculatePeriod(startDate, endDate);
            if(period >= 30){
                if(data.status_decisions_on == 0 && data.status_decisions_off == 0){
                    result = true;
                }else{
                    result = false;
                }
            }else{
                result = false;
            }
        }else{
            result = false;
        }
        return result;
    }
    formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois vont de 0 à 11
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** COMMERCIAL
    // get list projects
    getGlobalProjetCommercial(){
        // this.is_loading_data_co = true;
        this.unscribe.add(
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
            })
        )
    }


// 😇😇 **** NON COMMERCIAL
    // get list projects
    getGlobalProjetNonCommercial(){
        // this.is_loading_data_no_co = true;
        this.unscribe.add(
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
        ))
    }


// 😇😇 **** HELP
    // get list projects
    getGlobalProjetHelp(){
        // this.is_loading_data_help = true;
        this.unscribe.add(
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
        ))
    }


    // 😇😇 ************************************************ //
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //


    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
