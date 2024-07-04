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
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';

@Component({
  selector: 'app-asigned-projet-evaluateur',
  templateUrl: './asigned-projet-evaluateur.component.html',
  styleUrls: ['./asigned-projet-evaluateur.component.css']
})
export class AsignedProjetEvaluateurComponent implements OnInit {

    public _liste_evaluateur: any = [];
    public _liste_niveau: any = [];
    public evaluateur_name: string = '';
    public niveau_name: string = '';
    public old_slug: string = '';
    public new_slug: string = '';
    public date_fin: string = '';
    public niveau_code: string = '';

    public item_id: number = 0;
    public instructeur_id: number = 0;
    public old_instructeur_id: number = 0;
    public is_end: number = 0;
    public len_niveau: number = 0;
    public current_niv: number = 0;
    public is_asigned: boolean = true;
    public is_evaluateur_niveau: boolean = false;
    public is_reasigned: boolean = false;

    constructor(
        private _message: MessageService,
        private _request_evaluateur: EvaluateursService,
        private _request: ProjetsService,
        private _request_niveau: NiveauService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AsignedProjetEvaluateurComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.evaluateur_name = this.data.fname +' '+this.data.lname;
            this.old_slug = this.data.evaluator_slug;
            this.date_fin = this.data.date_fin_traitement;
            this.old_instructeur_id = this.data.instructeur_id;
            let niveau_code: any = localStorage.getItem('niveau_code');

            this.getNiveau();
            if(this.data.type_asigned == 'asigned'){
                this.item_id = this.data.id;
                this.is_asigned = true;
                this.is_reasigned = false;

                let check_old_action: any = localStorage.getItem('old_code_project_assigned');

                if(check_old_action == null){
                    this.initAssignedVar();
                    if(niveau_code == null){
                        setTimeout(() => {
                            localStorage.setItem('niveau_code', this._liste_niveau[0].niveau_code);
                            setTimeout(() => {
                                this.getListeEvaluateur();
                            }, 1000);
                        }, 1500);
                    }
                }else{
                    this.getListeEvaluateur();
                    let old_code_project_assigned: any = localStorage.getItem('old_code_project_assigned');
                    if(old_code_project_assigned != null && old_code_project_assigned == this.data.project_code){
                        this.getOldAssignedVar();
                    }else{
                        localStorage.removeItem('old_code_project_assigned');
                        localStorage.removeItem('step_end');
                        setTimeout(() => {
                            this.initAssignedVar();
                        }, 1500);
                    }
                }

            }else if(this.data.type_asigned == 'reasigned'){
                this.item_id = this.data.projet_id;
                this.is_asigned = false;
                this.is_reasigned = true;
                if(niveau_code != null){
                    this.current_niv = Number(niveau_code[niveau_code.length-1]);
                    setTimeout(() => {
                        this.removeOldDataToLs();
                    }, 1000);
                    this.getListeEvaluateur();
                }
            }
        }
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇 *** GET DATA
    // get list niveau
    getNiveau(){
        this._request_niveau.getListeNiveau().subscribe(
            {
                next: (response: any) =>{
                    this._liste_niveau = response;
                    this.len_niveau = response.length;
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
    // get list evaluator by niveau code
    getListeEvaluateur(){
        let niveau_code: any = localStorage.getItem('niveau_code');
        this._request_evaluateur.getListeEvaluateur(niveau_code).subscribe(
            {
                next: (response: any) =>{
                    this._liste_evaluateur = response;

                    if(response.length >= 1){
                        this.is_evaluateur_niveau = true;
                    }
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

// 😇 *** ASSIGNED
    // assigned project has ev
    asignedProjetAsEvaluateur() {
        const data = {
            date_fin_traitement: this.date_fin,
            instructeur_id: this.instructeur_id,
            last: this.current_niv == 2?'end':'',
            niveau_code: this.niveau_code,
            project_code: this.data.project_code,
        }
        this._loading.start();
        this._request.asignedProjetCommercial(data).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200) {
                        localStorage.setItem('step_end', '1');
                        if(this.current_niv < 2){
                            localStorage.setItem('niveau_code', this._liste_niveau[this.current_niv].niveau_code);
                        }else{
                            this.is_end = 2;
                        }
                        this.getListeEvaluateur();
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this.getOldAssignedVar();
                            this._loading.stop();
                        }, 1500);
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

// 😇 *** REASSIGNED
    // reassigned project has ev
    reasignedProjetAsEvaluateur() {
        this._loading.start();

        const data = {
            date_fin: this.date_fin,
            old_instructeur_id: this.old_instructeur_id,
            instructeur_id: this.instructeur_id,
            project_code: this.data.project_code,
        }
        this._request.reasignedProjetCommercial(data.project_code, data.old_instructeur_id, data.instructeur_id, data.date_fin).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this._dialogRef.close('close');
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
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇 *** ASSIGNED
    // set init valeur for assigned
    initAssignedVar(){
        this.current_niv = 1;
        localStorage.setItem('old_code_project_assigned', this.data.project_code);
        localStorage.setItem('step_end', '0');
    }
    // get variable for old assigned
    getOldAssignedVar(){
        let current_niv: any = localStorage.getItem('step_end');
        if(current_niv != null){
            this.current_niv = Number(current_niv)+1;
        }
    }
    // finished asigned
    finishedAssigned(){
        this.removeOldDataToLs();
        setTimeout(() => {
            this.close();
        }, 1200);
    }
    // close dialog
    close(){
        this._dialogRef.close('close');
    }
    // select ev
    selectInstructor(e: any){
        let data: any = e.value;
        this.niveau_code = data.niveau_code;
        this.niveau_name = data.niveau_name;
        this.instructeur_id = data.id;
    }
    // show btn close datepicker
    showBtnClosePicker(){
        let btn_close_piker = document.querySelector('.mat-datepicker-close-button');
        let button__label: any = document.querySelector('.mat-datepicker-close-button .mdc-button__label');
        btn_close_piker?.classList.add('w-100');
        button__label.innerHTML = 'Fermer le selection de date';
    }
    // remove old data to ls
    removeOldDataToLs(){
        localStorage.removeItem('old_code_project_assigned');
        localStorage.removeItem('step_end');
        localStorage.removeItem('niveau_code');
    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //
}
