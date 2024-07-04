import { Location } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
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
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-first-evaluator-details-projet-help-resolved',
  templateUrl: './first-evaluator-details-projet-help-resolved.component.html',
  styleUrls: ['./first-evaluator-details-projet-help-resolved.component.css']
})
export class FirstEvaluatorDetailsProjetHelpResolvedComponent implements OnInit{

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

    // document comments
    public html_docs_comments: string = '';
    public editor_docs_comments = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    // document comments
    public html_dossier_comments: string = '';
    public editor_dossier_comments = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    constructor(
        private _message: MessageService,
        private _request_ev: FirstEvaluatorService,
        private _router: Router,
        private _coockie: CookieService,
        private _route_active: ActivatedRoute,
        private _localStorage: CustomerStorageService,
        private _location: Location,
        private sanitizer: DomSanitizer
    ){}

    ngOnInit(){
        this.ev_data = this._localStorage.getDataToStorage();
        this.getDetailsProject();

    // editor
       this.editor_contre_swot_opportunity = new Editor();
       this.editor_contre_swot_weakness = new Editor();
       this.editor_contre_swot_stengths = new Editor();
       this.editor_contre_swot_threats = new Editor();
       this.editor_indicateur_performance = new Editor();
       this.editor_docs_comments = new Editor();


    // decrets
       this.editor_first_decret = new Editor();
       this.editor_second_decret = new Editor();
       this.editor_third_decret = new Editor();
       this.editor_dossier_comments = new Editor();
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

                    this.html_docs_comments = this.project_data.dossier_comments;

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

                    if(this.contre_analyse_swot_force_data != null){
                        this.html_contre_swot_stengths = this.contre_analyse_swot_force_data.strengths;
                    }
                    if(this.contre_analyse_swot_faiblesse_data != null){
                        this.html_contre_swot_weakness = this.contre_analyse_swot_faiblesse_data.weakness;
                    }
                    if(this.contre_analyse_swot_opportunity_data != null){
                        this.html_contre_swot_opportunity = this.contre_analyse_swot_opportunity_data.opportunity;
                    }
                    if(this.contre_analyse_swot_menace_data != null){
                        this.html_contre_swot_threats = this.contre_analyse_swot_menace_data.threats;
                    }

                    // indicateur_performance_data
                    this.indicateur_performance_data = response.indicateur_performance_data;
                    if(this.indicateur_performance_data != null){
                        this.html_indicateur_performance = this.indicateur_performance_data.commentaire;
                    }

                    //  dossier_comments
                    this.html_dossier_comments = this.project_data.dossier_comments;

                    //  decrets
                    this.html_first_decret = this.project_data.decret_comments;
                    this.html_second_decret = this.project_data.decrets_plan_strategie_comments;
                    this.html_third_decret = this.project_data.decrets_plan_annuel_comments;
                    this.status_first_decret = this.project_data.status_decrets;
                    this.status_second_decret = this.project_data.status_decrets_plan_strategie;
                    this.status_third_decret = this.project_data.status_decrets_plan_annuel;

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

// 😇😇 ************************************************ //
// ****************** START FUNCTION FOR EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
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
    // 😇😇 ************************************************ //
// ****************** END FUNCTION FOR EVENTS ****************** //
// ************************************************ 😇😇😇😇 //
}
