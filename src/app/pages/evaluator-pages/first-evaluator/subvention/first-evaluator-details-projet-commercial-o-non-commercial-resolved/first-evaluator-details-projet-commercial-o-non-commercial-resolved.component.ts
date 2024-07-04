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
} from 'ngx-editor';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
    selector: 'app-first-evaluator-details-projet-commercial-o-non-commercial-resolved',
    templateUrl: './first-evaluator-details-projet-commercial-o-non-commercial-resolved.component.html',
    styleUrls: ['./first-evaluator-details-projet-commercial-o-non-commercial-resolved.component.css']
})
export class FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent implements OnInit {
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

    // var first decret
    public status_first_decret: string = '';
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


    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _request_ev: FirstEvaluatorService,
        private _router: Router,
        private _route_active: ActivatedRoute,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _location: Location,
        private sanitizer: DomSanitizer,
        private _dialog: MatDialog,
        private _coockie: CookieService
    ) { }

    ngOnInit() {

        this.editor_dossier_comments = new Editor();
        this.editor_first_decret = new Editor();
        this.editor_second_decret = new Editor();
        this.editor_third_decret = new Editor();
        this.ev_data = this._localStorage.getDataToStorage();

        this.getProjetDetails();

    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** GET DETAILS PROJECT
        // get info by project
        getProjetDetails() {
            let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');
            this._request_ev.getProjetDetails(get_projet_code_encrypt, this.ev_data.id).subscribe(
                {
                    next: (response: any) => {

                        this.project_data = response.project_data;
                        this.doc_list = response.doc_list;
                        this.planning = response.planning;
                        this.piece_jointe = response.piece_jointe;
                        this.objectif_specifique = response.objectif_specifique;
                        this.mise_en_oeuvre = response.mise_en_oeuvre;
                        this.fonctionnement_data = response.fonctionnement_data;
                        this.besoin_exprimer = response.besoin_exprimer;

                        //  dossier_comments
                        this.html_dossier_comments = this.project_data.dossier_comments;

                        //  decrets
                        this.html_first_decret = this.project_data.decret_comments;
                        this.html_second_decret = this.project_data.decrets_plan_strategie_comments;
                        this.html_third_decret = this.project_data.decrets_plan_annuel_comments;
                        this.status_first_decret = this.project_data.status_decrets;
                        this.status_second_decret = this.project_data.status_decrets_plan_strategie;
                        this.status_third_decret = this.project_data.status_decrets_plan_annuel;

                        this.impact_project = response.impact_project;
                        this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                        this.impact_project.impact_secteur_medias = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur_medias);
                        this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);
                        this.impact_project.indicateurs = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.indicateurs);

                        this.beneficiaire = response.beneficiaire;
                        this.beneficiaire.beneficiaire_directs = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_directs);
                        this.beneficiaire.beneficiaire_indirects = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_indirects);


                        this.recap_besoin_exprime = response.recap_besoin_exprime;
                        this.resultat_attendus = response.resultat_attendus;
                        this.swot_faiblesse = response.swot_faiblesse;
                        this.swot_force = response.swot_force;
                        this.swot_menace = response.swot_menace;
                        this.swot_opportunity = response.swot_opportunity;

                        this.user_email = response.user_email;

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
    // click to back
    back() {
        this._location.back();
    }
}
