import { Location } from '@angular/common';
import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';

import { CookieService } from 'ngx-cookie-service';
import {
  Editor,
  schema,
  Toolbar,
} from 'ngx-editor';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-previews-final-projet-repport-admin',
  templateUrl: './previews-final-projet-repport-admin.component.html',
  styleUrls: ['./previews-final-projet-repport-admin.component.css']
})
export class PreviewsFinalProjetRepportAdminComponent implements OnInit{

    @ViewChild("demo3Tab", { static: false }) public demo3Tab!: MatTabGroup;

        public response: any;
        public is_loading: boolean = true;
        public is_type_project: string = '';

    // 😇😇 ************************************************ //
    // ****************** START VARIABLE ****************** //
        // ************************************************ 😇😇😇😇 //
        // 😇😇 **** SUBVENTION VARIABLE
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


        // 😇😇 **** HELP VARIABLE
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

                public global_data: any = {};
                public detail_request_data: any = [];
                public total_montant_detail_request: number = 0;
                public plan_financement_data: any = [];
                public etude_financiere_docs_data: any = [];
                public condition_financement_data: any = {};
                public user_data: any = {};
                public total_taux_plan_financement: number = 0;
                public total_montant_plan_financement: number = 0;

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
            // 😇😇 ************************************************ //
    // ****************** END VARIABLE ****************** //
    // ************************************************ 😇😇😇😇 //


        constructor(
            private _loading: NgxUiLoaderService,
            private _localStorage: CustomerStorageService,
            private sanitizer: DomSanitizer,
            private _coockie: CookieService,
            private _location: Location
        ){}

        ngOnInit() {
            //
            this.editor_dossier_comments = new Editor();
            this.editor_first_decret = new Editor();
            this.editor_second_decret = new Editor();
            this.editor_third_decret = new Editor();
            this.editor_first_etude = new Editor();
            this.editor_second_etude = new Editor();
            this.editor_third_etude = new Editor();
            this.editor_four_etude = new Editor();
            this.editor_decision_comments = new Editor();
            //

            this.response = this._localStorage.getResultProjetInfoRepportToLs();
            this.is_loading = true;
            setTimeout(() => {
                this.getDataToLs();
                let get: any = localStorage.getItem('my_type_project');
                this.is_type_project = get;
                setTimeout(() => {
                    this.is_loading = false;
                }, 1000);
            }, 1000);
        }

        // get
        getDataToLs(){
            let get_type_projet =  localStorage.getItem('my_type_project');
            if(get_type_projet == 'subvention'){
                this.project_data = this.response.project_data;
                this.doc_list = this.response.doc_list;
                this.planning = this.response.planning;
                this.piece_jointe = this.response.piece_jointe;
                this.objectif_specifique = this.response.objectif_specifique;
                this.mise_en_oeuvre = this.response.mise_en_oeuvre;
                this.fonctionnement_data = this.response.fonctionnement_data;
                this.besoin_exprimer = this.response.besoin_exprimer;

                this.impact_project = this.response.impact_project;
                this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                this.impact_project.impact_secteur_medias = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur_medias);
                this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);
                this.impact_project.indicateurs = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.indicateurs);

                this.beneficiaire = this.response.beneficiaire;
                this.beneficiaire.beneficiaire_directs = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_directs);
                this.beneficiaire.beneficiaire_indirects = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_indirects);

                //  dossier_comments
                this.html_dossier_comments = this.project_data.dossier_comments;

                //  decrets
                this.html_first_decret = this.project_data.decret_comments;
                this.html_second_decret = this.project_data.decrets_plan_strategie_comments;
                this.html_third_decret = this.project_data.decrets_plan_annuel_comments;
                this.status_first_decret = this.project_data.status_decrets;
                this.status_second_decret = this.project_data.status_decrets_plan_strategie;
                this.status_third_decret = this.project_data.status_decrets_plan_annuel;

                this.recap_besoin_exprime = this.response.recap_besoin_exprime;
                this.resultat_attendus = this.response.resultat_attendus;
                this.swot_faiblesse = this.response.swot_faiblesse;
                this.swot_force = this.response.swot_force;
                this.swot_menace = this.response.swot_menace;
                this.swot_opportunity = this.response.swot_opportunity;

                this.user_email = this.response.user_email;

                // etude project
                if(this.project_data.etude_pertinance_projet != null){
                    this.html_first_etude = this.project_data.etude_pertinance_projet;
                }
                if(this.project_data.etude_quantum != null){
                    this.html_second_etude = this.project_data.etude_quantum;
                }
                if(this.project_data.etude_modalite_financement != null){
                    this.html_third_etude  = this.project_data.etude_modalite_financement;
                }
                if(this.project_data.etude_modalite_mise_en_oeuvre != null){
                    this.html_four_etude = this.project_data.etude_modalite_mise_en_oeuvre;
                }

                if(this.project_data.decision_comments != null){
                    this.html_decision_comments = this.project_data.decision_comments;
                }

                if(this.project_data.status_decisions_on == 1){
                    this.isDecisionYes = true;
                    this.isDecisionNo = false;
                }else if(this.project_data.status_decisions_off == 1){
                    this.isDecisionNo = true;
                    this.isDecisionYes = false;
                }
            }

            if(get_type_projet == 'help'){
                this.global_data = this.response;

                this.project_data = this.response.project_data;
                this.doc_list = this.response.doc_list;
                this.etude_financiere_docs_data = this.response.etude_financiere_docs_data;
                this.planning = this.response.planning_data;
                this.piece_jointe = this.response.piece_jointe_data;
                this.objectif_specifique = this.response.objectif_specifique_data;
                this.mise_en_oeuvre = this.response.mise_en_oeuvre_data;
                this.fonctionnement_data = this.response.fonctionnement_data;
                this.besoin_exprimer = this.response.besoin_exprimer_data;

                this.plan_financement_data = this.response.plan_financement_data;

                this.impact_project = this.response.impact_project_data;
                this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                this.impact_project.impact_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur);
                this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);


                // performance_anterieur_data
                this.performance_anterieur_data = this.response.performance_anterieur_data;
                if(this.performance_anterieur_data.length > 0){
                    this.performance_anterieur_data.forEach((e:any) => {
                        e.detail_performance_anterieur = JSON.parse(e.detail_performance_anterieur);
                    });
                }

                // performance_projet_data
                this.performance_projet_data = this.response.performance_projet_data;
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
                this.detail_request_data = this.response.detail_request_data;
                this.total_montant_detail_request = 0;
                this.detail_request_data.forEach((e:any) => {
                    this.total_montant_detail_request += Number(e.montant_detail_request);
                });

                // condition_financement_data
                this.condition_financement_data = this.response.condition_financement_data;
                this.condition_financement_data.garantie_proposee = this.sanitizer.bypassSecurityTrustHtml(this.condition_financement_data.garantie_proposee);
                if(this.condition_financement_data.differe_condition_financement == null){
                    this.is_edit_condition_financement = true;
                }else{
                    this.is_edit_condition_financement = false;
                }

                // encours_endettement_data
                this.encours_endettement_data = this.response.encours_endettement_data;

                // swot
                this.swot_faiblesse = this.response.swot_faiblesse_data;
                this.swot_force = this.response.swot_force_data;
                this.swot_menace = this.response.swot_menace_data;
                this.swot_opportunity = this.response.swot_opportunity_data;
                this.user_email = this.response.user_email;

                // contre swot
                this.contre_analyse_swot_faiblesse_data = this.response.contre_analyse_swot_faiblesse_data;
                this.contre_analyse_swot_force_data = this.response.contre_analyse_swot_force_data;
                this.contre_analyse_swot_menace_data = this.response.contre_analyse_swot_menace_data;
                this.contre_analyse_swot_opportunity_data = this.response.contre_analyse_swot_opportunity_data;

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
                this.indicateur_performance_data = this.response.indicateur_performance_data;
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

                this.swot_faiblesse = this.response.swot_faiblesse_data;
                this.swot_force = this.response.swot_force_data;
                this.swot_menace = this.response.swot_menace_data;
                this.swot_opportunity = this.response.swot_opportunity_data;

                this.user_email = this.response.user_email;

                // etude project
                if(this.project_data.etude_pertinance_projet != null){
                    this.html_first_etude = this.project_data.etude_pertinance_projet;
                }

                if(this.project_data.etude_quantum != null){
                    this.html_second_etude = this.project_data.etude_quantum;
                }
                if(this.project_data.etude_modalite_financement != null){
                    this.html_third_etude  = this.project_data.etude_modalite_financement;
                }
                if(this.project_data.etude_modalite_mise_en_oeuvre != null){
                    this.html_four_etude = this.project_data.etude_modalite_mise_en_oeuvre;
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
            }
        }
        // print
        print(){
            let get_type_projet =  localStorage.getItem('my_type_project');
            if(get_type_projet == 'help'){
                console.log('e', this.response)
            }
            setTimeout(()=> {
                let printContents: any = document.querySelector('#card-content')?.innerHTML;
                let originalContents = document.body.innerHTML;
                document.body.innerHTML = printContents;
                window.print();
                document.body.innerHTML = originalContents;
                window.addEventListener("afterprint", () => self.close);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }, 1000)
        }
        // click to back
        back(){
            this._location.back();
        }
        // next mat-tab
        nextBtnClick(step: number) {
            const tabGroup: any = this.demo3Tab;
            if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
            const tabCount = tabGroup._tabs.length;
            const res: any = tabGroup.selectedIndex;
            tabGroup.selectedIndex = (res + 1) % tabCount;
        }
        // previous mat-tab
        previousBtnClick(step: number) {
            const tabGroup: any = this.demo3Tab;
            if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
            const tabCount = tabGroup._tabs.length;
            const res: any = tabGroup.selectedIndex;
            tabGroup.selectedIndex = (res - 1) % tabCount;
        }
        // sanitazer for data
        sanitazedData(data: any){
            return this.sanitizer.bypassSecurityTrustHtml(data);
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
}
