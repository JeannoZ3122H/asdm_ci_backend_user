import { Location } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import {
  Editor,
  schema,
  Toolbar,
} from 'ngx-editor';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  CompletedRejectDocsHelpComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/completed-reject-docs-help/completed-reject-docs-help.component';
import {
  IsOldSetPerformanceComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/is-old-set-performance/is-old-set-performance.component';
import {
  SetPerformanceAnterieureComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-data/set-performance-anterieure/set-performance-anterieure.component';
import {
  SetPerformanceProjectComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-data/set-performance-project/set-performance-project.component';
import {
  SetOUpdateVariationPerformanceAnterieureComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-performance/set-o-update-variation-performance-anterieure/set-o-update-variation-performance-anterieure.component';
import {
  SetOUpdateVariationPerformanceProjectComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-performance/set-o-update-variation-performance-project/set-o-update-variation-performance-project.component';
import {
  SingleRejectedDocsHelpComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/single-rejected-docs-help/single-rejected-docs-help.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  TauxInteretsService,
} from 'src/app/services/request/taux-interets/taux-interets.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-first-evaluator-details-projet-help',
  templateUrl: './first-evaluator-details-projet-help.component.html',
  styleUrls: ['./first-evaluator-details-projet-help.component.css']
})
export class FirstEvaluatorDetailsProjetHelpComponent implements OnInit{

    toolbar: Toolbar = [
        // default value
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear'],
    ];
    colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];

    // var for analyse doc
    public is_step_one_good_end: boolean = false;
    public is_step_one_no_good_end: boolean = false;

// var for decrets
    public isLinear: boolean = true;
    public is_init_page: boolean = false;
    // var first decret
    public status_first_decret: string = '';
    public isOneYes: boolean = false;
    public isOneNo: boolean = false;
    public isFirstDecretStatus: string = '';
    public html_first_decret: string = '';
    public editor_first_decret = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // var second decret
    public status_second_decret: string = '';
    public isSecondYes: boolean = false;
    public isSecondNo: boolean = false;
    public isSecondDecretStatus: string = '';
    public html_second_decret: string = '';
    public editor_second_decret = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
// var third decret
    public status_third_decret: string = '';
    public isThirdYes: boolean = false;
    public isThirdNo: boolean = false;
    public isThirdDecretStatus: string = '';
    public html_third_decret: string = '';
    public editor_third_decret = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    public ev_data: any = {};
    public global_data: any = {};

    public swot_opportunity: any = [];
    public swot_menace: any = [];
    public swot_force: any = [];
    public swot_faiblesse: any = [];
    public recap_besoin_exprime: any = [];
    public planning: any = [];
    public piece_jointe: any = [];
    public objectif_specifique: any = [];
    public mise_en_oeuvre: any = {};
    public beneficiaire: any = {};
    public impact_project: any = {};
    public besoin_exprimer: any = [];
    public fonctionnement_data: any = [];
    public detail_request_data: any = [];
    public total_montant_detail_request: number = 0;
    public doc_list: any = [];
    public plan_financement_data: any = [];
    public etude_financiere_docs_data: any = [];
    public project_data: any = {};
    public condition_financement_data: any = {};
    public user_data: any = {};
    public total_taux_plan_financement: number = 0;
    public total_montant_plan_financement: number = 0;
    public user_email: string = '';

// condition finacement
    public differe_condition_financement: number = 0;
    public dure_remboursement_condition_financement: number = 0;
    public is_edit_condition_financement: boolean = false;
    public _liste_taux_interets: any = [];
    public taux_interets_value: string = '';

// performance anterieur
    public performance_anterieur_data: any = [];

// performance project
    public performance_projet_data: any = [];

// encours endettement
    public encours_endettement_data: any = {};
    public echeance: string = '';
    public date_mise_en_oeuvre: string = '';
    public etab_financier: string = '';
    public montant_dette: number = 0;
    public montant_encours: number = 0;
    public montant_echeance: number = 0;
    public is_edit_encours_endettement_data: boolean = false;

// contre analyse swot
    // force
    public contre_analyse_swot_force_data: any = {};
    public html_contre_swot_stengths: string = '';
    public editor_contre_swot_stengths = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // faiblesse
    public contre_analyse_swot_faiblesse_data: any = {};
    public html_contre_swot_weakness: string = '';
    public editor_contre_swot_weakness = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // opportunite
    public contre_analyse_swot_opportunity_data: any = {};
    public html_contre_swot_opportunity: string = '';
    public editor_contre_swot_opportunity = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // opportunite
    public contre_analyse_swot_menace_data: any = {};
    public html_contre_swot_threats: string = '';
    public editor_contre_swot_threats = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // opportunite
    public indicateur_performance_data: any = {};
    public html_indicateur_performance: string = '';
    public editor_indicateur_performance = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    public good_send_rejected_mail: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _request_ev: FirstEvaluatorService,
        private _router: Router,
        private _coockie: CookieService,
        private _request_taux_interets: TauxInteretsService,
        private _route_active: ActivatedRoute,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _location: Location,
        private sanitizer: DomSanitizer,
        private _dialog: MatDialog
    ){}

    ngOnInit(){
        this.ev_data = this._localStorage.getDataToStorage();
        this.getDetailsProject();
        this.getTauxInterets();

       let old_perf_ant: any = localStorage.getItem('is_old_performance_ant');
       let old_perf_project: any = localStorage.getItem('is_old_performance_project');
       let is_old_code: any = localStorage.getItem('is_old_code');
       let code: any = this._route_active.snapshot.paramMap.get('project_code');
       setTimeout(() => {
            if(old_perf_ant != null){
                if(is_old_code == code){
                    this.setPerformanceAnterieure();
                }
            }
            if(old_perf_project != null){
                if(is_old_code == code){
                    this.setPerformanceProject();
                }
            }
            this.getEncoursEndettementToLs();
            this.getOldAnalyseDataToLs();
       }, 1500);

    // editor
       this.editor_contre_swot_opportunity = new Editor();
       this.editor_contre_swot_weakness = new Editor();
       this.editor_contre_swot_stengths = new Editor();
       this.editor_contre_swot_threats = new Editor();
       this.editor_indicateur_performance = new Editor();


    // decrets
       this.editor_first_decret = new Editor();
       this.editor_second_decret = new Editor();
       this.editor_third_decret = new Editor();
    }

    getTauxInterets(){
        this._request_taux_interets.get().subscribe(
            {
                next: (response: any) => {
                    this._liste_taux_interets = response;
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
            }
        )
    }

    getDetailsProject(){
        let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');

        this._request_ev.getProjetHelpDetails(get_projet_code_encrypt, this.ev_data.id).subscribe(
            {
                next: (response: any)=>{
                    // console.log('e', response);
                    this.global_data = response;

                    this.project_data = response.project_data;
                    this.doc_list = response.doc_list;
                    this.etude_financiere_docs_data = response.etude_financiere_docs_data;
                    this.planning = response.planning_data;
                    this.piece_jointe = response.piece_jointe_data;
                    this.objectif_specifique = response.objectif_specifique_data;
                    this.mise_en_oeuvre = response.mise_en_oeuvre_data;
                    this.fonctionnement_data = response.fonctionnement_data;
                    this.besoin_exprimer = response.besoin_exprimer_data;

                    this.impact_project = response.impact_project_data;
                    this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                    this.impact_project.impact_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur);
                    this.impact_project.impact_secteur_medias = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur_medias);
                    this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);
                    this.impact_project.indicateurs = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.indicateurs);

                    this.plan_financement_data = response.plan_financement_data;

                    // performance_anterieur_data
                    this.performance_anterieur_data = response.performance_anterieur_data;
                    if(this.performance_anterieur_data.length > 0){
                        this.performance_anterieur_data.forEach((e:any) => {
                            e.detail_performance_anterieur = JSON.parse(e.detail_performance_anterieur);
                        });
                    }

                    // performance_projet_data
                    this.performance_projet_data = response.performance_projet_data;
                    if(this.performance_projet_data.length > 0){
                        this.performance_projet_data.forEach((n:any) => {
                            n.detail_performance_projet = JSON.parse(n.detail_performance_projet);
                        });
                    }

                    // plan_financement_data
                    this.total_taux_plan_financement = 0;
                    this.total_montant_plan_financement = 0;
                    this.plan_financement_data.forEach((e:any) => {
                        this.total_taux_plan_financement += Number(e.taux_plan_financement);
                        if(this.isFloat(this.total_taux_plan_financement) == true){
                            let val = (this.total_taux_plan_financement).toString();
                            this.total_taux_plan_financement = Number(val.slice(0, 5));
                        }else if(this.isInt(this.total_taux_plan_financement) == true){
                            this.total_taux_plan_financement = this.total_taux_plan_financement;
                        };

                        this.total_montant_plan_financement += Number(e.montant_plan_financement);
                    });

                    // detail_request_data
                    this.detail_request_data = response.detail_request_data;
                    this.total_montant_detail_request = 0;
                    this.detail_request_data.forEach((e:any) => {
                        this.total_montant_detail_request += Number(e.montant_detail_request);
                    });

                    // condition_financement_data
                    this.condition_financement_data = response.condition_financement_data;
                    this.condition_financement_data.garantie_proposee = this.sanitizer.bypassSecurityTrustHtml(this.condition_financement_data.garantie_proposee);
                    if(this.condition_financement_data.differe_condition_financement == null){
                        this.is_edit_condition_financement = true;
                    }else{
                        this.is_edit_condition_financement = false;
                    }

                    // encours_endettement_data
                    this.encours_endettement_data = response.encours_endettement_data;

                    this.recap_besoin_exprime = response.recap_besoin_exprime;

                    // swot
                    this.swot_faiblesse = response.swot_faiblesse_data;
                    this.swot_force = response.swot_force_data;
                    this.swot_menace = response.swot_menace_data;
                    this.swot_opportunity = response.swot_opportunity_data;
                    this.user_email = response.user_email;

                    // contre swot
                    this.contre_analyse_swot_faiblesse_data = response.contre_analyse_swot_faiblesse_data;
                    this.contre_analyse_swot_force_data = response.contre_analyse_swot_force_data;
                    this.contre_analyse_swot_menace_data = response.contre_analyse_swot_menace_data;
                    this.contre_analyse_swot_opportunity_data = response.contre_analyse_swot_opportunity_data;
                    if(
                        this.contre_analyse_swot_faiblesse_data == null ||
                        this.contre_analyse_swot_force_data == null ||
                        this.contre_analyse_swot_menace_data == null ||
                        this.contre_analyse_swot_opportunity_data == null
                    ){this.getAllDataContreSwotToLs();}

                    if(this.contre_analyse_swot_force_data != null){
                        this.html_contre_swot_stengths = this.contre_analyse_swot_force_data.strengths;
                        this.removeContreSwotDataToLs(1);
                    }
                    if(this.contre_analyse_swot_faiblesse_data != null){
                        this.html_contre_swot_weakness = this.contre_analyse_swot_faiblesse_data.weakness;
                        this.removeContreSwotDataToLs(2);
                    }
                    if(this.contre_analyse_swot_opportunity_data != null){
                        this.html_contre_swot_opportunity = this.contre_analyse_swot_opportunity_data.opportunity;
                        this.removeContreSwotDataToLs(3);
                    }
                    if(this.contre_analyse_swot_menace_data != null){
                        this.html_contre_swot_threats = this.contre_analyse_swot_menace_data.threats;
                        this.removeContreSwotDataToLs(4);
                    }

                    // indicateur_performance_data
                    this.indicateur_performance_data = response.indicateur_performance_data;
                    if(this.indicateur_performance_data != null){
                        this.html_indicateur_performance = this.indicateur_performance_data.commentaire;
                        this.removeIndicateursDataToLs();
                    }


                    setTimeout(()=>{
                        this.checkDocumentListStatus();
                    }, 2000)

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
            }
        );
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION FOR REQUEST API ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** CONDITION FINANCEMENT
    updateConditionFinancement(){
        if(this.taux_interets_value == '' || undefined || null){
            this._message.error({status: 'Erreur', message: 'Veuillez à ne pas laisser les champs vide. Merci'});
            return;
        }
        const data = {
            montant_pret_condition_financement: this.condition_financement_data.montant_pret_condition_financement,
            garantie_proposee: this.condition_financement_data.garantie_proposee,
            differe_condition_financement: this.differe_condition_financement,
            dure_remboursement_condition_financement: this.dure_remboursement_condition_financement,
            project_code: this.project_data.project_code,
            taux_interet_condition_financement: this.taux_interets_value,
            user_ref: this.project_data.user_ref,
        }
        this._loading.start();
        this._request_ev.updateConditionFinancement(data, this.condition_financement_data.slug).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.getDetailsProject();
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
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

// 😇😇 **** PERFORMANCE ANTERIEURE
    // set
    setPerformanceAnterieure(){
        let is_old_code: any = localStorage.getItem('is_old_code');
        let code: any = this._route_active.snapshot.paramMap.get('project_code');
        if(is_old_code == null){
            localStorage.setItem('is_old_code', code);
        }else{
            if(is_old_code != code){
                this.oldActionToOtherProject();
                return
            }
        }

        const data = Object.assign(this.global_data, {type:'set'});
        const dialogRef = this._dialog.open(SetPerformanceAnterieureComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    this.getDetailsProject();
                }
            },
        });
    }
    // update
    updatePerformanceAnterieure(){
        // Object.assign(data, {type_asigned:'asigned'});
        // const dialogRef = this._dialog.open(SetPerformanceAnterieureComponent,
        // {
        //     panelClass: 'fullscreen-dialog',
        //     data
        // });
        // dialogRef.afterClosed().subscribe({
        //     next: (val) => {
        //         if (val == 'close') {
        //             this.getGlobalProjetCommercial();
        //         }
        //     },
        // });
    }
    // set variation
    setOrUpdateVariation(item: any, niv: number, type: string){
        let data: any = Object.assign(item, {type: type, niv: niv});
        const dialogRef = this._dialog.open(SetOUpdateVariationPerformanceAnterieureComponent,
        {
            width: 'auto',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    this.getDetailsProject();
                }
            },
        });
    }

// 😇😇 **** UPDATE ENCOURS ENDETTEMENT
    // update
    setEncoursEndettement(){
        const data = {
            category_projet: this.project_data.category_projet,
            date_mise_en_place: this.date_mise_en_oeuvre,
            derniere_echeance: this.montant_echeance,
            encours_dette: this.montant_encours,
            etablissement_financier: this.etab_financier,
            montant_dette: this.montant_dette,
            echeance_dette: this.echeance,
            project_code: this.project_data.project_code,
            user_ref: this.project_data.user_ref,
        }
        this._loading.start();
        this._request_ev.storeEncoursEndettementData(data).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        localStorage.removeItem('is_old_data_encours_endettement_data');
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.getDetailsProject();
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
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
    // update
    updateEncoursEndettement(){
        const data = {
            category_projet: this.project_data.category_projet,
            date_mise_en_place: this.date_mise_en_oeuvre,
            derniere_echeance: this.montant_echeance,
            encours_dette: this.montant_encours,
            etablissement_financier: this.etab_financier,
            montant_dette: this.montant_dette,
            echeance_dette: this.echeance,
            project_code: this.project_data.project_code,
            user_ref: this.project_data.user_ref,
        }
        this._loading.start();
        this._request_ev.updateEncoursEndettementData(data, this.encours_endettement_data.slug).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        localStorage.removeItem('is_old_data_encours_endettement_data');
                        setTimeout(() => {
                            this.is_edit_encours_endettement_data = false;
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.getDetailsProject();
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
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

// 😇😇 **** PERFORMANCE PROJECT
    // set
    setPerformanceProject(){
        let is_old_code: any = localStorage.getItem('is_old_code');
        let code: any = this._route_active.snapshot.paramMap.get('project_code');
        if(is_old_code == null){
            localStorage.setItem('is_old_code', code);
        }else{
            if(is_old_code != code){
                this.oldActionToOtherProject();
                return
            }
        }

        const data = Object.assign(this.global_data, {type:'set'});
        const dialogRef = this._dialog.open(SetPerformanceProjectComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    this.getDetailsProject();
                }
            },
        });
    }
    // update
    updatePerformanceProject(){
        // Object.assign(data, {type_asigned:'asigned'});
        // const dialogRef = this._dialog.open(SetPerformanceAnterieureComponent,
        // {
        //     panelClass: 'fullscreen-dialog',
        //     data
        // });
        // dialogRef.afterClosed().subscribe({
        //     next: (val) => {
        //         if (val == 'close') {
        //             this.getGlobalProjetCommercial();
        //         }
        //     },
        // });
    }
    // set variation
    setOrUpdateVariationProject(item: any, niv: number, type: string){
        let data: any = Object.assign(item, {type: type, niv: niv});
        const dialogRef = this._dialog.open(SetOUpdateVariationPerformanceProjectComponent,
        {
            width: 'auto',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    this.getDetailsProject();
                }
            },
        });
    }

// 😇😇 **** CONTRE ANALYSE
    // 😇 STRENGTHS
        // store
        setAllDataContreStrengthsToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                strengths: this.html_contre_swot_stengths,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.storeContreStrengths(data).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(1);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
        // update
        updateAllDataContreStrengthsToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                strengths: this.html_contre_swot_stengths,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.updateContreStrengths(data, this.contre_analyse_swot_force_data.slug).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(1);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
    // 😇 WEAKNESS
        // store
        setAllDataContreWeaknessToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                weakness: this.html_contre_swot_weakness,

                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.storeContreWeakness(data).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(2);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
        // update
        updateAllDataContreWeaknessToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                weakness: this.html_contre_swot_weakness,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.updateContreWeakness(data, this.contre_analyse_swot_faiblesse_data.slug).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(2);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
    // 😇 OPPORTUNITY
        // store
        setAllDataContreOpportunityToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                opportunity: this.html_contre_swot_opportunity,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.storeContreOpportunity(data).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(3);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
        // update
        updateAllDataContreOpportunityToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                opportunity: this.html_contre_swot_opportunity,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.updateContreOpportunity(data, this.contre_analyse_swot_opportunity_data.slug).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(3);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
    // 😇 THREATS
        // store
        setAllDataContreThreatsToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                threats: this.html_contre_swot_threats,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.storeContreThreats(data).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(4);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
        // update
        updateAllDataContreThreatsToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                threats: this.html_contre_swot_threats,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.updateContreThreats(data, this.contre_analyse_swot_menace_data.slug).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeContreSwotDataToLs(4);
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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

// 😇😇 **** INDICATEURS PERFORMANCES
        // store
        setAllDataIndicateursToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                commentaire: this.html_indicateur_performance,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.storeIndicateurs(data).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeIndicateursDataToLs();
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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
        // update
        updateAllDataIndicateursToDB(){
            const data: any = {
                project_code: this.project_data.project_code,
                commentaire: this.html_indicateur_performance,
                user_ref: this.project_data.user_ref
            }
            this._loading.start();
            this._request_ev.updateIndicateurs(data, this.indicateur_performance_data.slug).subscribe(
                {
                    next: (response: any )=>{
                        if (response.code == 200) {
                            this.removeIndicateursDataToLs();
                            setTimeout(() => {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.getDetailsProject();
                            }, 1000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    },error: (error: any)=>{
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


    // 😇😇 **** STORE DOCS
        // store single document validate
        singleValidateDoc(data: any){
            this._loading.start();
            this._request_ev.setProjetHelpSingleDocsStatusValidate(this.project_data.project_code, data.id).subscribe(
                {
                    next: (response: any)=>{
                        if(response.code == 200){
                            this._message.successOperation(response);
                            setTimeout(() => {
                                this.getDetailsProject();
                                this._loading.stop();
                            }, 1000);
                        }else{
                            this._message.error({status: 'Erreur', message: 'Quelque s\'est mal passé. veuillez réessayer !'})
                            this._loading.stop();
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
                            window.location.reload();
                        }
                    }
                }
            )
        }
        // completed all document rejected or validated
        setProjetCompletedDocStatus(type: string){
            if(type == "validated"){
                const data = {
                    evaluator_email: this.ev_data.email,
                    evaluator_id: this.ev_data.id,
                    evaluator_slug: this.ev_data.slug,
                    project_code: this.project_data.project_code,
                    type: type,
                    user_email: this.user_email,
                    user_ref: this.project_data.user_ref,
                    user_type: this.project_data.type_category_code
                }
                this.good_send_rejected_mail = false;
                const dialogRef = this._dialog.open(CompletedRejectDocsHelpComponent,
                {
                    width: '60%',
                    height: '95vh',
                    data
                });
                dialogRef.afterClosed().subscribe({
                    next: (val: any) => {
                        if (val == 'close') {
                            this.getDetailsProject();
                        }
                    },
                });
            }

            if(type == "rejected"){
                this._loading.start();
                let reject_data = this._localStorage.getFolderRejectedDataToStorage();
                const data = {
                    evaluator_email: this.ev_data.email,
                    evaluator_id: this.ev_data.id,
                    evaluator_slug: this.ev_data.slug,
                    object: 'Rejet de document fournis',
                    project_code: this.project_data.project_code,
                    reject_data: reject_data,
                    type: type,
                    user_email: this.user_email,
                    user_ref: this.project_data.user_ref
                }

                this._request_ev.setProjetHelpCompletedDocsStatus(data).subscribe(
                    {
                        next: (response: any) => {
                            if (response.code == 200){
                                localStorage.removeItem('liste_folder_rejected');
                                this._message.successOperation(response);
                                this._loading.stop();
                                this.good_send_rejected_mail = true;
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
                                this.good_send_rejected_mail = false;
                            }
                        }, error: (error: any) => {
                            this._loading.stop;
                            let _error = error.error;
                            if (error.status == 401 || _error.message == "Token has expired") {
                                localStorage.removeItem('Ramzan_Kadyrov');
                                this._coockie.delete('us_id');
                                this._coockie.delete('dragonFly');
                                this._message.tokenExpired();
                                this._router.navigateByUrl('/');
                                window.location.reload();
                            }
                        }
                    }
                );
            }
        }
        // store single document validate
        singleRejectDocSend(data: any){
            this._loading.start();
            this._request_ev.setProjetHelpSingleDocsStatusReject(this.project_data.project_code, data.id).subscribe
            (
                {
                    next: (response: any) => {
                        if (response.code == 200) {
                            this.getDetailsProject();
                            this._loading.stop();
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
                            window.location.reload();
                        }
                    }
                }
            )
        }
    // 😇😇 **** STORE EVALUATION BY DECRETS
        // store evaluation
        storeEvEvaluationDecret(){

            if(
                (this.status_first_decret == '' || this.status_first_decret == undefined) ||
                (this.status_second_decret == '' || this.status_second_decret == undefined) ||
                (this.status_third_decret == '' || this.status_third_decret == undefined) ||
                (this.html_first_decret.length <= 7 || this.html_first_decret == undefined || this.html_first_decret == '') ||
                (this.html_second_decret.length <= 7 || this.html_second_decret == undefined || this.html_second_decret == '') ||
                (this.html_third_decret.length <= 7 || this.html_third_decret == undefined || this.html_third_decret == '')
            ){
                this._message.error({status: 'Erreur', message: 'Tous les champs de saisir son obligatoire. Merci !'});
                return
            }

            const data = {
                status_decrets: this.status_first_decret,
                decret_comments: this.html_first_decret,
                status_decrets_plan_strategie: this.status_second_decret,
                decrets_plan_strategie_comments: this.html_second_decret,
                status_decrets_plan_annuel: this.status_third_decret,
                decrets_plan_annuel_comments: this.html_third_decret,
                project_code: this.project_data.project_code,
                user_ref: this.project_data.user_ref
            }

            // return console.log('end', data)
            this._loading.start();
            this._request_ev.storeEvEvaluationDecretHelp(data).subscribe(
                {
                    next: (response: any) => {
                        if (response.code == 200) {
                            localStorage.removeItem('s_d_first');
                            localStorage.removeItem('s_d_second');
                            localStorage.removeItem('s_d_third');
                            setTimeout(() => {
                                this.is_init_page = true;
                                this._message.successOperation(response);
                                this.getDetailsProject();
                                this._loading.stop();
                            }, 2000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    }, error: (error: any) => {
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

    // 😇😇 ************************************************ //
// ****************** END FUNCTION FOR REQUEST API ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START FUNCTION FOR EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** CONDITION FINANCEMENT
    editConditionFinancement(){
        this.taux_interets_value = this.condition_financement_data.taux_interet_condition_financement;
        this.differe_condition_financement = this.condition_financement_data.differe_condition_financement;
        this.dure_remboursement_condition_financement = this.condition_financement_data.dure_remboursement_condition_financement;
        setTimeout(() => {
            this.is_edit_condition_financement = true;
        }, 500);
    }
    // select taux interets
    chooseTauxInterets(e: any) {
        this.taux_interets_value = e.value;
    }
// 😇😇 **** PERFORMANCE
    // is modal old action on project
    oldActionToOtherProject(){
        let is_old_code: any = localStorage.getItem('is_old_code');
        const data = {type: 'help', content: is_old_code};
        const dialogRef = this._dialog.open(IsOldSetPerformanceComponent,
        {
            width: 'auto',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    this.getDetailsProject();
                }
            },
        });
    }

// 😇😇 **** ENCOURS ENDETTEMENT
    // update date picker
    showBtnClosePicker(){
        let btn_close_piker = document.querySelector('.mat-datepicker-close-button');
        let button__label: any = document.querySelector('.mat-datepicker-close-button .mdc-button__label');
        btn_close_piker?.classList.add('w-100');
        button__label.innerHTML = 'Fermer le selection de date';
    }
    // edit
    editEncoursEndettementEvents(data: any){
        this._loading.start();
        setTimeout(() => {
            this.is_edit_encours_endettement_data = true;
            this.date_mise_en_oeuvre = data.date_mise_en_place;
            this.etab_financier = data.etablissement_financier;
            this.montant_dette = data.montant_dette;
            this.montant_encours = data.encours_dette;
            this.montant_echeance = Number(data.derniere_echeance);
            this.echeance = data.echeance_dette;
            this._loading.stop();
        }, 1000);
    }
    // select echeance
    selectEcheance(e: any){
        this.echeance = e.value;
        this.storeEncoursEndettementToLs(e);
    }
    // select date mise en oeuvre
    selectDateMiseEnOeuvre(e: any){
        this.date_mise_en_oeuvre = e.value;
        this.storeEncoursEndettementToLs(e);
    }
    // store current data encours endettement data
    storeEncoursEndettementToLs(e: any){
        if(e){
            if(this.encours_endettement_data == null){
                const data = {
                    date_mise_en_place: this.date_mise_en_oeuvre,
                    etablissement_financier: this.etab_financier,
                    montant_dette: this.montant_dette,
                    encours_dette: this.montant_encours,
                    derniere_echeance: this.montant_echeance,
                    echeance_dette: this.echeance,
                }
                localStorage.setItem('is_old_data_encours_endettement_data', JSON.stringify(data));
            }
        }
    }
    // get old encours endettement data
    getEncoursEndettementToLs(){
        if(this.encours_endettement_data == null){
            let get: any = localStorage.getItem('is_old_data_encours_endettement_data');
            if(get != null){
                let data = JSON.parse(get);
                this.date_mise_en_oeuvre = data.date_mise_en_place;
                this.etab_financier = data.etablissement_financier;
                this.montant_dette = data.montant_dette;
                this.montant_encours = data.encours_dette;
                this.montant_echeance = Number(data.derniere_echeance);
                this.echeance = data.echeance_dette;
            }

        }
    }

// 😇😇 **** CONTRE SWOT
    // set to ls
    setAllDataContreSwotToLs(e: any, el: number){
        if(e){
            if(el == 1){
                const data = {
                    html_contre_swot_stengths: this.html_contre_swot_stengths
                }
                localStorage.setItem('is_old_contre_swot_force_data', JSON.stringify(data));
            }

            if(el == 2){
                const data = {
                    html_contre_swot_weakness: this.html_contre_swot_weakness,
                }
                localStorage.setItem('is_old_contre_swot_faiblesse_data', JSON.stringify(data));
            }
            if(el == 3){
                const data = {
                    html_contre_swot_opportunity: this.html_contre_swot_opportunity,
                }
                localStorage.setItem('is_old_contre_swot_opportunity_data', JSON.stringify(data));
            }
            if(el == 4){
                const data = {
                    html_contre_swot_threats: this.html_contre_swot_threats,
                }
                localStorage.setItem('is_old_contre_swot_menace_data', JSON.stringify(data));
            }

        }
    }
    // set to ls
    getAllDataContreSwotToLs(){
        let data_strengths: any = localStorage.getItem('is_old_contre_swot_force_data');
        let data_weakness: any = localStorage.getItem('is_old_contre_swot_faiblesse_data');
        let data_opportunity: any = localStorage.getItem('is_old_contre_swot_opportunity_data');
        let data_threats: any = localStorage.getItem('is_old_contre_swot_menace_data');

        if(this.contre_analyse_swot_faiblesse_data == null){
            if(data_weakness != null){
                data_weakness = JSON.parse(data_weakness);
                this.html_contre_swot_weakness = data_weakness.html_contre_swot_weakness;
            }
        }

        if(this.contre_analyse_swot_force_data == null){
            if(data_strengths != null){
                data_strengths = JSON.parse(data_strengths);
                this.html_contre_swot_stengths = data_strengths.html_contre_swot_stengths;
            }
        }

        if(this.contre_analyse_swot_opportunity_data == null){
            if(data_opportunity != null){
                data_opportunity = JSON.parse(data_opportunity);
                this.html_contre_swot_opportunity = data_opportunity.html_contre_swot_opportunity;
            }
        }
        if(this.contre_analyse_swot_menace_data == null){
            if(data_threats != null){
                data_threats = JSON.parse(data_threats);
                this.html_contre_swot_threats = data_threats.html_contre_swot_threats;
            }
        }
    }
    // remove
    removeContreSwotDataToLs(niv: number){
        if(niv == 1){
            localStorage.removeItem('is_old_contre_swot_force_data');
        }
        if(niv == 2){
            localStorage.removeItem('is_old_contre_swot_faiblesse_data');
        }
        if(niv == 3){
            localStorage.removeItem('is_old_contre_swot_opportunity_data');
        }
        if(niv == 4){
            localStorage.removeItem('is_old_contre_swot_menace_data');
        }
    }

// 😇😇 **** INDICATEURS PERFORMANCES
        // set to ls
        setAllDataIndicateursToLs(e: any){
            if(e){
                const data = {
                    html_indicateur_performance: this.html_indicateur_performance
                }
                localStorage.setItem('is_old_indicateur_performance_data', JSON.stringify(data));
            }
        }
        // get to ls
        getAllDataIndicateursToLs(){
            let data: any = localStorage.getItem('is_old_indicateur_performance_data');

            if(this.indicateur_performance_data == null){
                if(data != null){
                    data = JSON.parse(data);
                    this.html_indicateur_performance = data.html_indicateur_performance;
                }
            }
        }
        // remove to ls
        removeIndicateursDataToLs(){
            localStorage.removeItem('is_old_indicateur_performance_data');
        }

    // 😇😇 **** EVENTS FOR ANALYSE STEP 1
        // set single doc status to ls
        singleRejectDoc(data: any){
            const dialogRef = this._dialog.open(SingleRejectedDocsHelpComponent,
            {
                width: '60%',
                height: '95vh',
                data
            });
            dialogRef.afterClosed().subscribe({
                next: (val: any) => {
                    if (val == 'close') {
                        this.getDetailsProject();
                    }
                    if (val == 'good') {
                        this.singleRejectDocSend(data);
                    }
                },
            });
        }
        //check all document status in list
        checkDocumentListStatus(): any{
            let val_on: number = 0;
            let val_off: number = 0;
            this.doc_list.find((o: any, i: number) => {
                if ((o.status_on == 1 && o.status_off == 0)) {
                    val_on+=1;
                }else if(o.status_on == 0 && o.status_off == 1){
                    val_off+=1;
                }
            });
            if(val_on == this.doc_list.length){
                this.is_step_one_no_good_end = false;
                this.is_step_one_good_end = true;
            }else if(val_off >= 1 || (val_on+val_off == this.doc_list.length)){
                this.is_step_one_no_good_end = true;
                this.is_step_one_good_end = false;
            }
        }
    // 😇😇 **** EVENTS FOR ANALYSE STEP 2
        // set project analyse
        setProjetCompletedAnalyseStatus(){

        }
        // check all docs status
        checkAllDocsStatus(){
            let result: boolean = false;
            this.doc_list.forEach((e: any) => {
                if(e.status_on == false){
                    result = false;
                }else if(e.status_on == true){
                    result = true;
                }
            });
            return result;
        }
        // status for all decrets
        statusDecret(e: any, step: string){
            if(e){
                if(step == '1'){
                    if(e.value == 'oui'){
                        this.isOneYes = true;
                        this.isOneNo = false;
                    }else if(e.value == 'non'){
                        this.isOneNo = true;
                        this.isOneYes = false;
                    }
                    this.status_first_decret = e.value;
                }
                if(step == '2'){
                    if(e.value == 'oui'){
                        this.isSecondYes = true;
                        this.isSecondNo = false;
                    }else if(e.value == 'non'){
                        this.isSecondNo = true;
                        this.isSecondYes = false;
                    }
                    this.status_second_decret = e.value;
                }
                if(step == '3'){
                    if(e.value == 'oui'){
                        this.isThirdYes = true;
                        this.isThirdNo = false;
                    }else if(e.value == 'non'){
                        this.isThirdNo = true;
                        this.isThirdYes = false;
                    }
                    this.status_third_decret = e.value;
                }
            }
        }
        // set data to Ls
        setAnalyseDataToLs(e: any, step: string){
            if(e){
                if(step == '1'){
                    const data = {
                        id: 1,
                        html_first_decret: this.html_first_decret,
                        status_first_decret: this.status_first_decret,
                    };

                    localStorage.setItem('s_d_first', JSON.stringify(data));
                }

                if(step == '2'){
                    const data = {  id: 1,
                        html_second_decret: this.html_second_decret,
                        status_second_decret: this.status_second_decret,
                    };
                    localStorage.setItem('s_d_second', JSON.stringify(data));
                }

                if(step == '3'){
                    const data = {
                        id: 1,
                        html_third_decret: this.html_third_decret,
                        status_third_decret: this.status_third_decret
                    };
                    localStorage.setItem('s_d_third', JSON.stringify(data));
                }
            }
        }
        // get data to Ls
        getOldAnalyseDataToLs(){
            let s_d_first: any = localStorage.getItem('s_d_first');
            let s_d_second: any = localStorage.getItem('s_d_second');
            let s_d_third: any = localStorage.getItem('s_d_third');
            if(s_d_first != null){
                s_d_first = JSON.parse(s_d_first);
                this.html_first_decret = s_d_first.html_first_decret;
                this.status_first_decret = s_d_first.status_first_decret;

                if(this.status_first_decret == 'oui'){
                    this.isOneYes = true;
                    this.isOneNo = false;
                }else if(this.status_first_decret == 'non'){
                    this.isOneNo = true;
                    this.isOneYes = false;
                }
            }

            if(s_d_second != null){
                s_d_second = JSON.parse(s_d_second);
                this.html_second_decret = s_d_second.html_second_decret;
                this.status_second_decret = s_d_second.status_second_decret;

                if(this.status_second_decret == 'oui'){
                    this.isSecondYes = true;
                    this.isSecondNo = false;
                }else if(this.status_second_decret == 'non'){
                    this.isSecondNo = true;
                    this.isSecondYes = false;
                }
            }

            if(s_d_third != null){
                s_d_third = JSON.parse(s_d_third);
                this.html_third_decret = s_d_third.html_third_decret;
                this.status_third_decret = s_d_third.status_third_decret;

                if(this.status_third_decret == 'oui'){
                    this.isThirdYes = true;
                    this.isThirdNo = false;
                }else if(this.status_third_decret == 'non'){
                    this.isThirdNo = true;
                    this.isThirdYes = false;
                }
            }
        }
        // remove Ls
        removeLs(){
            localStorage.removeItem('s_d_first');
            localStorage.removeItem('s_d_second');
            localStorage.removeItem('s_d_third');
        }



    back(){
        this._location.back();
    }
    // check val is int
    isInt(n: any){
        return Number(n) === n && n % 1 === 0;
    }
    // check val is float
    isFloat(n: any){
        return Number(n) === n && n % 1 !== 0;
    }
    // convert data
    convertVariation(data: any){
        return JSON.parse(data);
    }
    // sanitazer for data
    sanitazedData(data: any){
        return this.sanitizer.bypassSecurityTrustHtml(data);
    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION FOR EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

}
