import { Location } from '@angular/common';
import {
  Component,
  OnInit,
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
  SetCommentsByElementComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/etudes-project/set-comments-by-element/set-comments-by-element.component';
import {
  UpdateCommentsByElementComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/etudes-project/update-comments-by-element/update-comments-by-element.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  SecondEvaluatorService,
} from 'src/app/services/request/evaluator-request/second-evaluator/second-evaluator.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-second-evaluator-details-projet-commercial-o-non-commercial',
  templateUrl: './second-evaluator-details-projet-commercial-o-non-commercial.component.html',
  styleUrls: ['./second-evaluator-details-projet-commercial-o-non-commercial.component.css']
})
export class SecondEvaluatorDetailsProjetCommercialONonCommercialComponent implements OnInit{


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


    // var details
    public swot_opportunity: any = [];
    public swot_menace: any = [];
    public swot_force: any = [];
    public swot_faiblesse: any = [];
    public recap_besoin_exprime: any = [];
    public resultat_attendus: any = [];
    public planning: any = [];
    public piece_jointe: any = [];
    public objectif_specifique: any = [];
    public mise_en_oeuvre: any = {};
    public beneficiaire: any = {};
    public impact_project: any = {};
    public besoin_exprimer: any = [];
    public fonctionnement_data: any = [];
    public doc_list: any = [];
    public project_data: any = {};
    public ev_data: any = {};
    public user_email: string = '';

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

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _request_ev: SecondEvaluatorService,
        private _router: Router,
        private _route_active: ActivatedRoute,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _location: Location,
        private sanitizer: DomSanitizer,
        private _coockie: CookieService,
        private _dialog: MatDialog
    ) { }

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
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** GET DETAILS PROJECT
        // get info by project
        getProjetDetails(){
            let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');
            // console.log(get_projet_code_encrypt)
            this._request_ev.getProjetDetails(get_projet_code_encrypt, this.ev_data.id).subscribe(
                {
                    next: (response: any)=>{

                        this.project_data = response.project_data;
                        this.doc_list = response.doc_list;
                        this.planning = response.planning;
                        this.piece_jointe = response.piece_jointe;
                        this.objectif_specifique = response.objectif_specifique;
                        this.mise_en_oeuvre = response.mise_en_oeuvre;
                        this.fonctionnement_data = response.fonctionnement_data;
                        this.besoin_exprimer = response.besoin_exprimer;

                        this.impact_project = response.impact_project;
                        this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                        this.impact_project.impact_secteur_medias = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur_medias);
                        this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);
                        this.impact_project.indicateurs = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.indicateurs);

                        this.beneficiaire = response.beneficiaire;
                        this.beneficiaire.beneficiaire_directs = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_directs);
                        this.beneficiaire.beneficiaire_indirects = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_indirects);

                        //  dossier_comments
                        this.html_dossier_comments = this.project_data.dossier_comments;

                        //  decrets
                        this.html_first_decret = this.project_data.decret_comments;
                        this.html_second_decret = this.project_data.decrets_plan_strategie_comments;
                        this.html_third_decret = this.project_data.decrets_plan_annuel_comments;
                        this.status_first_decret = this.project_data.status_eecrets;
                        this.status_second_decret = this.project_data.status_eecrets_plan_strategie;
                        this.status_third_decret = this.project_data.status_eecrets_plan_annuel;

                        this.recap_besoin_exprime = response.recap_besoin_exprime;
                        this.resultat_attendus = response.resultat_attendus;
                        this.swot_faiblesse = response.swot_faiblesse;
                        this.swot_force = response.swot_force;
                        this.swot_menace = response.swot_menace;
                        this.swot_opportunity = response.swot_opportunity;

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

                        if(this.project_data.decision_comments != null){
                            this.html_decision_comments = this.project_data.decision_comments;
                            this.removeDecisionProjectDataToLs();
                        }else{
                            this.getOldDecisionDataToLs();
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
    // 😇😇 **** STORE DATA
        // 😇 SET SINGLE DATA COMMENT
            // set single comment from object data
            setSingleCommentData(data: any, element: string){
                const _data = {
                    project_code: this.project_data.project_code,
                    element: element,
                    data: data
                }
                const dialogRef = this._dialog.open(SetCommentsByElementComponent,
                {
                    width: 'auto',
                    height: 'auto',
                    data: _data
                });
                dialogRef.afterClosed().subscribe({
                    next: (val: any) => {
                        if (val == 'close') {
                            this.getProjetDetails();
                        }
                    },
                });
            }
        // 😇 UPDATE SINGLE DATA COMMENT
            // update single comment from object data
            updateSingleCommentData(data: any, element: string, element_comments: any){
                const _data = {
                    project_code: this.project_data.project_code,
                    element_data: {element: element, element_comments: element_comments},
                    data: data
                }
                const dialogRef = this._dialog.open(UpdateCommentsByElementComponent,
                {
                    width: 'auto',
                    height: 'auto',
                    data: _data
                });
                dialogRef.afterClosed().subscribe({
                    next: (val: any) => {
                        if (val == 'close') {
                            this.getProjetDetails();
                        }
                    },
                });
            }

    // 😇😇 **** STORE EVALUATION BY ETUDE
        // store evaluation
        setOrUpdateEtudeProjectDataToDB(){
            if(
                (this.html_first_etude.length <= 7 || this.html_first_etude == undefined || this.html_first_etude == '') ||
                (this.html_second_etude.length <= 7 || this.html_second_etude == undefined || this.html_second_etude == '') ||
                (this.html_third_etude.length <= 7 || this.html_third_etude == undefined || this.html_third_etude == '') ||
                (this.html_four_etude.length <= 7 || this.html_four_etude == undefined || this.html_four_etude == '')
            ){
                this._message.error({status: 'Erreur', message: 'Tous les champs de saisir son obligatoire. Merci !'});
                return
            }

            const data = {
                etude_pertinance_projet: this.html_first_etude,
                etude_quantum: this.html_second_etude,
                etude_modalite_financement: this.html_third_etude,
                etude_modalite_mise_en_oeuvre: this.html_four_etude,
                project_code: this.project_data.project_code,
                user_ref: this.project_data.user_ref
            }

            this._loading.start();
            this._request_ev.setOrUpdateEtudeProjectDataToDB(data).subscribe(
                {
                    next: (response: any) => {
                        if (response.code == 200) {
                            this.removeLs();
                            setTimeout(() => {
                                this.is_init_page = true;
                                this._message.successOperation(response);
                                this.getProjetDetails();
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
            );
        }

        // 😇😇 **** STORE EVALUATION BY ETUDE
        // store evaluation
        setOrUpdateDecisionProjectDataToDB(){
            if(
                (this.html_decision_comments.length <= 7 || this.html_decision_comments == undefined || this.html_decision_comments == '')
            ){
                this._message.error({status: 'Erreur', message: 'Tous les champs de saisir son obligatoire. Merci !'});
                return
            }

            const data = {
                type: this.status_decision_comments,
                comments: this.html_decision_comments,
                author: this.project_data.business,
                user_email: this.user_email,
                project_code: this.project_data.project_code,
                user_ref: this.project_data.user_ref
            }

            this._loading.start();
            this._request_ev.setOrUpdateDecisionProjectDataToDB(data).subscribe(
                {
                    next: (response: any) => {
                        if (response.code == 200) {
                            this.removeLs();
                            setTimeout(() => {
                                this.is_init_page = true;
                                this._message.successOperation(response);
                                this.getProjetDetails();
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

                localStorage.setItem('s_e_first', JSON.stringify(data));
            }

            if(step == 2){
                const data = {  id: 1,
                    html_second_etude: this.html_second_etude,
                    status_second_etude: this.status_second_etude,
                };
                localStorage.setItem('s_e_second', JSON.stringify(data));
            }

            if(step == 3){
                const data = {
                    id: 1,
                    html_third_etude: this.html_third_etude,
                    status_third_etude: this.status_third_etude
                };
                localStorage.setItem('s_e_third', JSON.stringify(data));
            }

            if(step == 4){
                const data = {
                    id: 1,
                    html_four_etude: this.html_four_etude,
                    status_four_etude: this.status_four_etude
                };
                localStorage.setItem('s_e_four', JSON.stringify(data));
            }
        }
        // get data to Ls
        getOldAnalyseDataToLs(){
            let s_e_first: any = localStorage.getItem('s_e_first');
            let s_e_second: any = localStorage.getItem('s_e_second');
            let s_e_third: any = localStorage.getItem('s_e_third');
            let s_e_four: any = localStorage.getItem('s_e_four');
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
            localStorage.removeItem('s_e_first');
            localStorage.removeItem('s_e_second');
            localStorage.removeItem('s_e_third');
            localStorage.removeItem('s_e_four');
        }


    // 😇😇 **** EVENTS FOR DECISION STEP
        // set to ls
        setOrUpdateDecisionToLs(){
            const data = {
                html_decision_comments: this.html_decision_comments,
                status_decision_comments: this.status_decision_comments,
            };
            localStorage.setItem('s_decision_comments', JSON.stringify(data));

            this._message.successOperation({status: 'Succès', message: 'Sauvegarde temporaire réussie. merci !'})
        }
        // set to ls
        setOrUpdateDecisionProjectDataToLs(e: any){
            if(e){
                const data = {
                    html_decision_comments: this.html_decision_comments,
                    status_decision_comments: this.status_decision_comments,
                };
                localStorage.setItem('s_decision_comments', JSON.stringify(data));
            }
        }
        // get to ls
        getOldDecisionDataToLs(){
            let s_decision_comments: any = localStorage.getItem('s_decision_comments');
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
            }
        }
        // remove Ls
        removeDecisionProjectDataToLs(){
            localStorage.removeItem('s_decision_comments');
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

    // 😇😇 ************************************************ //
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

}
