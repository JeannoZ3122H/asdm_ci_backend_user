import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import {
  AsignedProjetEvaluateurComponent,
} from 'src/app/components/admin-components/asigned-projet-evaluateur/asigned-projet-evaluateur.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-global-projets-commercials',
  templateUrl: './global-projets-commercials.component.html',
  styleUrls: ['./global-projets-commercials.component.css']
})
export class GlobalProjetsCommercialsComponent implements OnInit, OnDestroy{


    public _liste_global_projet: any[] = [];
    public is_global_projet: boolean = true;
    public is_assigned_projet: boolean = false;
    public p: number =1;

    _visitor: boolean = false;
    public is_loading_data: boolean = true;
    private unscribe = new Subscription();

    constructor(
        private _dialog: MatDialog,
        private _request: ProjetsService,
        private _router: Router,
        private _message: MessageService,
        private _authorized: AuthorizedService,
        // new
        private _snackBar: MatSnackBar
    ){
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }
    }

    ngOnInit(){
        this.getGlobalProjetCommercial();
    }

    getGlobalProjetCommercial(){
        this.unscribe.add(
        this._request.getGlobalProjetCommercial().subscribe(
            {
                next: (response: any) =>{
                    this._liste_global_projet = response;
                    this.is_loading_data = false;
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
        ))
    }

    goToListeGlobalProjet(){
        this.is_global_projet = true;
        this.is_assigned_projet = false;
    }

    goToListeAssignedProjet(){
        this.is_global_projet = false;
        this.is_assigned_projet = true;
    }

    asignedAsEvaluator(data: any){
        Object.assign(data, {type_asigned:'asigned'});
        const dialogRef = this._dialog.open(AsignedProjetEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    this.getGlobalProjetCommercial();
                }
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

    ngOnDestroy(): void {
        this.unscribe.unsubscribe();
    }
}
