import { Location } from '@angular/common';
import {
  Component,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
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
  AddDocumentsConventionsBaseComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/add-documents-conventions-base/add-documents-conventions-base.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-details-commercial-o-non-commercial-project-admin-resolved-help',
  templateUrl: './details-commercial-o-non-commercial-project-admin-resolved-help.component.html',
  styleUrls: ['./details-commercial-o-non-commercial-project-admin-resolved-help.component.css']
})
export class DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent {

    @ViewChild("demo3Tab", { static: false }) public demo3Tab!: MatTabGroup;

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

    // var dossier comments
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

    // etude project
    public firstStepper: any;
    public secondStepper: any;

// var for etudes
    // var first etude
    public status_first_etude: string = '';
    public isOneYes: boolean = false;
    public isOneNo: boolean = false;
    public html_first_etude: string = '';
    public editor_first_etude = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // var second etude
    public status_second_etude: string = '';
    public isSecondYes: boolean = false;
    public isSecondNo: boolean = false;
    public html_second_etude: string = '';
    public editor_second_etude = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // var third etude
    public status_third_etude: string = '';
    public isThirdYes: boolean = false;
    public isThirdNo: boolean = false;
    public html_third_etude: string = '';
    public editor_third_etude = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // var four etude
    public status_four_etude: string = '';
    public isFourYes: boolean = false;
    public isFourNo: boolean = false;
    public html_four_etude: string = '';
    public editor_four_etude = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    // var comments for decision
    public status_decision_comments: string = '';
    public isDecisionYes: boolean = false;
    public isDecisionNo: boolean = false;
    public html_decision_comments: string = '';
    public editor_decision_comments = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    // mat-tabs
    public demo1TabIndex = 0;
    _visitor: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _router: Router,
        private _route_active: ActivatedRoute,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _location: Location,
        private sanitizer: DomSanitizer,
        private _coockie: CookieService,
        private _dialog: MatDialog,
        private _authorized: AuthorizedService
    ) {
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }}

    ngOnInit() {
        this.ev_data = this._localStorage.getDataToStorage();
        this.getProjetDetails();

        this.editor_dossier_comments = new Editor();
        this.editor_first_decret = new Editor();
        this.editor_second_decret = new Editor();
        this.editor_third_decret = new Editor();

        this.editor_first_etude = new Editor();
        this.editor_second_etude = new Editor();
        this.editor_third_etude = new Editor();
        this.editor_four_etude = new Editor();

        this.editor_decision_comments = new Editor();

        // editor
       this.editor_contre_swot_opportunity = new Editor();
       this.editor_contre_swot_weakness = new Editor();
       this.editor_contre_swot_stengths = new Editor();
       this.editor_contre_swot_threats = new Editor();
       this.editor_indicateur_performance = new Editor();


    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** GET DETAILS PROJECT
        // get info by project
        getProjetDetails(){
            let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');

            this._request.getGlobalProjetHelpDetails(get_projet_code_encrypt).subscribe(
                {
                    next: (response: any)=>{

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

                        this.plan_financement_data = response.plan_financement_data;

                        this.impact_project = response.impact_project_data;
                        this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                        this.impact_project.impact_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur);
                        this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);


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

                        this.swot_faiblesse = response.swot_faiblesse_data;
                        this.swot_force = response.swot_force_data;
                        this.swot_menace = response.swot_menace_data;
                        this.swot_opportunity = response.swot_opportunity_data;

                        this.user_email = response.user_email;

                        // etude project
                        if(this.project_data.etude_pertinance_projet != null){
                            this.html_first_etude = this.project_data.etude_pertinance_projet;
                            this.removeLs();
                        }else{
                            this.getOldAnalyseDataToLs();
                        }
                        if(this.project_data.etude_quantum != null){
                            this.html_second_etude = this.project_data.etude_quantum;
                            this.removeLs();
                        }else{
                            this.getOldAnalyseDataToLs();
                        }
                        if(this.project_data.etude_modalite_financement != null){
                            this.html_third_etude  = this.project_data.etude_modalite_financement;
                            this.removeLs();
                        }else{
                            this.getOldAnalyseDataToLs();
                        }
                        if(this.project_data.etude_modalite_mise_en_oeuvre != null){
                            this.html_four_etude = this.project_data.etude_modalite_mise_en_oeuvre;
                            this.removeLs();
                        }else{
                            this.getOldAnalyseDataToLs();
                        }

                        if(this.project_data.decisions_comments != null){
                            this.html_decision_comments = this.project_data.decisions_comments;
                        }

                        if(this.project_data.status_decisions_on == 1){
                            this.isDecisionYes = true;
                            this.isDecisionNo = false;
                        }else if(this.project_data.status_decisions_off == 1){
                            this.isDecisionNo = true;
                            this.isDecisionYes = false;
                        }

                        this._loading.stop();
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
            );
        }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //

// 😇😇 ************************************************ //
// ****************** START FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** EVENTS FOR ANALYSE STEP
        // set data to Ls
        setOrUpdateEtudeProjectDataToLs(step: number){
            if(step == 1){
                const data = {
                    id: 1,
                    html_first_etude: this.html_first_etude,
                    status_first_etude: this.status_first_etude,
                };

                localStorage.setItem('s_e_first_help', JSON.stringify(data));
            }

            if(step == 2){
                const data = {  id: 1,
                    html_second_etude: this.html_second_etude,
                    status_second_etude: this.status_second_etude,
                };
                localStorage.setItem('s_e_second_help', JSON.stringify(data));
            }

            if(step == 3){
                const data = {
                    id: 1,
                    html_third_etude: this.html_third_etude,
                    status_third_etude: this.status_third_etude
                };
                localStorage.setItem('s_e_third_help', JSON.stringify(data));
            }

            if(step == 4){
                const data = {
                    id: 1,
                    html_four_etude: this.html_four_etude,
                    status_four_etude: this.status_four_etude
                };
                localStorage.setItem('s_e_four_help', JSON.stringify(data));
            }
        }
        // get data to Ls
        getOldAnalyseDataToLs(){
            let s_e_first: any = localStorage.getItem('s_e_first_help');
            let s_e_second: any = localStorage.getItem('s_e_second_help');
            let s_e_third: any = localStorage.getItem('s_e_third_help');
            let s_e_four: any = localStorage.getItem('s_e_four_help');
            if(s_e_first != null){
                s_e_first = JSON.parse(s_e_first);
                this.html_first_etude = s_e_first.html_first_etude;
                this.status_first_etude = s_e_first.status_first_etude
            }

            if(s_e_second != null){
                s_e_second = JSON.parse(s_e_second);
                this.html_second_etude = s_e_second.html_second_etude;
                this.status_second_etude = s_e_second.status_second_etude
            }

            if(s_e_third != null){
                s_e_third = JSON.parse(s_e_third);
                this.html_third_etude = s_e_third.html_third_etude;
                this.status_third_etude = s_e_third.status_third_etude
            }

            if(s_e_four != null){
                s_e_four = JSON.parse(s_e_four);
                this.html_four_etude = s_e_four.html_four_etude;
                this.status_four_etude = s_e_four.status_four_etude
            }
        }
        // remove Ls
        removeLs(){
            localStorage.removeItem('s_e_first_help');
            localStorage.removeItem('s_e_second_help');
            localStorage.removeItem('s_e_third_help');
            localStorage.removeItem('s_e_four_help');
        }


    // 😇😇 **** EVENTS FOR DECISION STEP
        // set to ls
        setOrUpdateDecisionToLs(){
            const data = {
                html_decision_comments: this.html_decision_comments,
                status_decision_comments: this.status_decision_comments,
            };
            localStorage.setItem('s_decision_comments_help', JSON.stringify(data));

            this._message.successOperation({status: 'Succès', message: 'Sauvegarde temporaire réussie. merci !'})
        }
        // set to ls
        setOrUpdateDecisionProjectDataToLs(e: any){
            if(e){
                const data = {
                    html_decision_comments: this.html_decision_comments,
                    status_decision_comments: this.status_decision_comments,
                };
                localStorage.setItem('s_decision_comments_help', JSON.stringify(data));
            }
        }
        // get to ls
        getOldDecisionDataToLs(){
            let s_decision_comments: any = localStorage.getItem('s_decision_comments_help');
            if(s_decision_comments != null){
                s_decision_comments = JSON.parse(s_decision_comments);
                this.html_decision_comments = s_decision_comments.html_decision_comments;
                this.status_decision_comments = s_decision_comments.status_decision_comments;

                if(s_decision_comments.status_decision_comments == 'validated'){
                    this.isDecisionYes = true;
                    this.isDecisionNo = false;
                }else if(s_decision_comments.status_decision_comments == 'rejected'){
                    this.isDecisionNo = true;
                    this.isDecisionYes = false;
                }
            }
        }
        // status
        statusDecision(e: any){
            if(e){
                if(e.value == 'validated'){
                    this.isDecisionYes = true;
                    this.isDecisionNo = false;
                }else if(e.value == 'rejected'){
                    this.isDecisionNo = true;
                    this.isDecisionYes = false;
                }
                this.status_decision_comments = e.value;

                setTimeout(() => {
                    this.setOrUpdateDecisionToLs();
                }, 500);
            }
        }
        // remove Ls
        removeDecisionProjectDataToLs(){
            localStorage.removeItem('s_decision_comments_help');
        }


    // 😇😇 **** EVENTS FOR GLOBAL STEP
        // click to back
        back(){
            this._location.back();
        }
        // sanitazer for data
        sanitazedData(data: any){
            return this.sanitizer.bypassSecurityTrustHtml(data);
        }
        // next mat-tab
        nextBtnClick(step: number) {
            const tabGroup: any = this.demo3Tab;
            if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
            const tabCount = tabGroup._tabs.length;
            const res: any = tabGroup.selectedIndex;
            tabGroup.selectedIndex = (res + 1) % tabCount;
            setTimeout(() => {
                this.setOrUpdateEtudeProjectDataToLs(step);
            }, 500);
        }
        // previous mat-tab
        previousBtnClick(step: number) {
            const tabGroup: any = this.demo3Tab;
            if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
            const tabCount = tabGroup._tabs.length;
            const res: any = tabGroup.selectedIndex;
            tabGroup.selectedIndex = (res - 1) % tabCount;
            setTimeout(() => {
                this.setOrUpdateEtudeProjectDataToLs(step);
            }, 500);
        }
        // send document convention
        sendDocumentConvention(data: any){
            Object.assign(data, {time:'is_direct_add', user_email: this.user_email});
            const dialogRef = this._dialog.open(AddDocumentsConventionsBaseComponent,
            {
                width: 'auto',
                height: 'auto',
                data
            });
            dialogRef.afterClosed().subscribe({
                next: (val: any) => {
                    if (val == 'close') {
                        this.getProjetDetails();
                    }
                },
            });
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
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

}
