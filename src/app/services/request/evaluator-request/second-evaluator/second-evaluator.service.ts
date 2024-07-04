import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from 'src/app/services/apiUrl/api-url.service';
import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecondEvaluatorService {

    public user_data: any = {};

    constructor(
        private _http: HttpClient,
        private _api_url: ApiUrlService,
        private _cookie: CustomerCookieService,
        private _localStorage: CustomerStorageService,
    ) {
        this.user_data = this._localStorage.getDataToStorage();
    }

// 😇😇 ************************************************ //
// ****************** START GET TOKEN ****************** //
    // ************************************************ 😇😇😇😇 //
    getToken = () => {
        let get_token = this._cookie.getTokenToCookie();
        return {headers: {'Authorization': 'Bearer ' +get_token}};
    }
    // 😇😇 ************************************************ //
// ****************** END GET TOKEN ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START SEND AND GET DATA IN DB FOR SUBMIT PROJECT ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** REQUEST SUBVENTION
    // 😇 Commercial
        // get list project assignements
        getListeProjetCommercial = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_evaluator_projet_from_commercial_business_assignment/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }
        // get list project assignements
        getListeProjetCommercialResolved = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_project_commercial_completed_by_evaluator/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }

    // 😇 Non Commerciale
        // get list project assignements
        getListeProjetNonCommercial = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_evaluator_projet_from_non_commercial_business_assignment/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }
        // get list project assignements
        getListeProjetNonCommercialResolved = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_project_non_commercial_completed_by_evaluator/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }


    // 😇😇 **** REQUEST HELP
        // 😇 Help
        // List projects
        getListeProjetHelp = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_projet_fond_business_assignment_by_instructeur/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }
        // setProjetHelpSingleDocsStatusValidate
        getListeProjetHelpResolved = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_project_front_completed_by_evaluator/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }

    // 😇😇 **** REQUEST ETUDE & DECISISON FINAL PROJECT
        // set data etude to db
        setOrUpdateEtudeProjectDataToDB = (data: any) =>{
            const url = this._api_url.apiUrl+'update_etude_fields_on_project_models';
            return this._http.post(url, data, this.getToken());
        }
        // set data etude to db
        setOrUpdateDecisionProjectDataToDB = (data: any) =>{
            const url = this._api_url.apiUrl+'store_decision_final_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set data etude to db
        setOrUpdateEtudeProjectHelpDataToDB = (data: any) =>{
            const url = this._api_url.apiUrl+'update_etude_fields_on_projet_fond_models';
            return this._http.post(url, data, this.getToken());
        }
        // set data etude to db
        setOrUpdateDecisionProjectHelpDataToDB = (data: any) =>{
            const url = this._api_url.apiUrl+'store_projet_fond_decision_final_comments';
            return this._http.post(url, data, this.getToken());
        }

        // validate_project_by_etude

    // 😇😇 **** REQUEST GLOBAL PAGES
        // get project seleted details
        getProjetHelpDetails = (project_code: string, ev_id: number) => {
            const url = this._api_url.apiUrl+'evaluator_show_projet_fond_details/'+project_code+'/'+ev_id;
            return this._http.get(url, this.getToken());
        }
        // get project seleted details
        getProjetDetails = (project_code: string, ev_id: number) => {
            const url = this._api_url.apiUrl+'evaluator_show_project_details/'+project_code+'/'+ev_id;
            return this._http.get(url, this.getToken());
        }
        // 😇 get message
        getAllMessage = (evaluator_id: number) => {
            const url = this._api_url.apiUrl+'get_evaluator_comment_by_evaluator_id/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }
        // details
        getDetailsMessage = (message_slug: string) =>{
            const url = this._api_url.apiUrl+'get_evaluator_comment_by_slug/'+message_slug;
            return this._http.get(url, this.getToken());
        }
    // 😇😇 ************************************************ //
// ****************** END SEND AND GET DATA IN DB FOR SUBMIT PROJECT ****************** //
// ************************************************ 😇😇😇😇 //

// 😇😇 ************************************************ //
// ****************** START SET COMMMENTS SUBVENTION DATA IN DB ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** TO PROJECT DATA
        // set
        setOrUpdateCommentsToProjectData = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO OBJECTIF DATA
        // set
        setOrUpdateCommentsToObjectifSpecifique = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_objectif_specifique_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO RESULTATS DATA
        // set
        setOrUpdateCommentsToResultatAttendus = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_resultat_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO BENEFICIAIRE DATA
        // set
        setOrUpdateCommentsToBeneficiaire = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_beneficiaire_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO IMPACT DATA
        // set
        setOrUpdateCommentsToImpact = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_impacts_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO SWOT DATA
        // set force
        setOrUpdateCommentsToSwotForce = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_swot_force_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set faiblesse
        setOrUpdateCommentsToSwotFaiblesse = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_swot_faiblesse_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set opportunités
        setOrUpdateCommentsToSwotOpportunite = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_swot_opportunity_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set menace
        setOrUpdateCommentsToSwotMenace = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_swot_menace_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO BESOIN DATA
        // set
        setOrUpdateCommentsToBesoin = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_besoin_exprime_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO RECARP BESOIN DATA
        // set
        setOrUpdateCommentsToRecarpBesoin = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_recap_besoin_exprime_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO MISE EN OEUVRE DATA
        // set
        setOrUpdateCommentsToMiseOeuvre = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_mise_en_oeuvre_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO PIECES JUSTIFICATIVES DATA
        // set
        setOrUpdateCommentsToPiecesJointes = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_piece_jointe_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 ************************************************ //
// ****************** END SET COMMMENTS SUBVENTION DATA IN DB ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START SET COMMMENTS HELP DATA IN DB ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** TO PROJECT DATA
        // set
        setOrUpdateCommentsHelpToProjectData = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO OBJECTIF DATA
        // set
        setOrUpdateCommentsHelpToObjectifSpecifique = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_objectif_specifique_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO DETAILS REQUEST DATA
        // set
        setOrUpdateCommentsToDetailsRequest = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_detail_request_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO CONDITION FINANCEMENT DATA
        // set
        setOrUpdateCommentsToConditionFinancement = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_condition_financement_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO CONDITION FINANCEMENT DATA
        // set
        setOrUpdateCommentsToIndicateurPerformance = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_indicateur_performance_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO CONDITION FINANCEMENT DATA
        // set
        setOrUpdateCommentsToPlanFinancement = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_plan_financement_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO ETUDE FINANCIERE DATA
        // set
        setOrUpdateCommentsToEtudeFinanciere = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_etude_financiere_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO PERFORMANCE ANTERIEURE DATA
        // set
        setOrUpdateCommentsToPerformanceAnterieure = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_performance_anterieur_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO ENCOURS ENDETTEMENT DATA
        // set
        setOrUpdateCommentsToEncoursEndettement = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_encours_endettement_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO PERFORMANCE ANTERIEURE DATA
        // set
        setOrUpdateCommentsToPerformanceProject = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_performance_projet_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO IMPACT DATA
        // set
        setOrUpdateCommentsHelpToImpact = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_impacts_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO SWOT DATA
        // set force
        setOrUpdateCommentsHelpToSwotForce = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_swot_force_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set faiblesse
        setOrUpdateCommentsHelpToSwotFaiblesse = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_swot_faiblesse_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set opportunités
        setOrUpdateCommentsHelpToSwotOpportunite = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_swot_opportunity_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set menace
        setOrUpdateCommentsHelpToSwotMenace = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_swot_menace_comments';
            return this._http.post(url, data, this.getToken());
        }


    // 😇😇 **** TO SWOT DATA
        // set force
        setOrUpdateCommentsHelpToSwotContreForce = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_contre_analyse_swot_force_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set faiblesse
        setOrUpdateCommentsHelpToSwotContreFaiblesse = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_contre_analyse_swot_faiblesse_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set opportunités
        setOrUpdateCommentsHelpToSwotContreOpportunite = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_contre_analyse_swot_opportunity_comments';
            return this._http.post(url, data, this.getToken());
        }
        // set menace
        setOrUpdateCommentsHelpToSwotContreMenace = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_contre_analyse_swot_menace_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO PLANNING DATA
        // set
        setOrUpdateCommentsHelpToPlanning = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_planning_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 **** TO PIECES JUSTIFICATIVES DATA
        // set
        setOrUpdateCommentsHelpToPiecesJointes = (data: any) =>{
            const url = this._api_url.apiUrl+'set_evaluator_projet_fond_piece_jointe_comments';
            return this._http.post(url, data, this.getToken());
        }

    // 😇😇 ************************************************ //
// ****************** END SET COMMMENTS HELP DATA IN DB ****************** //
// ************************************************ 😇😇😇😇 //



// 😇😇 ************************************************ //
// ****************** START DOCUMENTS CONVENTION DATA IN DB ****************** //
    // ************************************************ 😇😇😇😇 //
    // get
    getDocumentConventionByEvaluator = (evaluator_id: any) => {
        const url = this._api_url.apiUrl+'get_document_convention_by_instructeur/'+evaluator_id;
        return this._http.get(url, this.getToken());
    }
    // search
    searchDocumentConventionByEvaluator = (project_code: any) =>{
        const url = this._api_url.apiUrl+'get_document_convention/'+project_code;
        return this._http.get(url, this.getToken());
    }
    // set
    setDocumentConventionByEvaluator = (data: any) =>{
        const url = this._api_url.apiUrl+'store_document_convention';
        return this._http.post(url, data, this.getToken());
    }
    // update
    updateDocumentConventionByEvaluator = (data: any, slug: string) =>{
        const url = this._api_url.apiUrl+'update_document_convention/'+slug;
        return this._http.post(url, data, this.getToken());
    }
    // delete
    deleteDocumentConventionByEvaluator = (slug: any) =>{
        const url = this._api_url.apiUrl+'destroy_document_convention/'+slug;
        return this._http.get(url, this.getToken());
    }

    // 😇😇 ************************************************ //
// ****************** END DOCUMENTS CONVENTION DATA IN DB ****************** //
// ************************************************ 😇😇😇😇 //
}
