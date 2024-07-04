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
  selector: 'app-details-commercial-o-non-commercial-project-admin-resolved-subv',
  templateUrl: './details-commercial-o-non-commercial-project-admin-resolved-subv.component.html',
  styleUrls: ['./details-commercial-o-non-commercial-project-admin-resolved-subv.component.css']
})
export class DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent {

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
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** GET DETAILS PROJECT
        // get info by project
        getProjetDetails(){
            let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');
            // console.log(get_projet_code_encrypt)
            this._request.getGlobalProjetDetails(get_projet_code_encrypt).subscribe(
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
                        this.status_first_decret = this.project_data.status_decrets;
                        this.status_second_decret = this.project_data.status_decrets_plan_strategie;
                        this.status_third_decret = this.project_data.status_decrets_plan_annuel;

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

    // 😇😇 ************************************************ //
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //

}
