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
export class FirstEvaluatorService {

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
        // set evaluator status single doc on
        setProjetCommercialSingleDocsStatusValidate = (project_code: string, id_document: number) => {
            const url = this._api_url.apiUrl+'status_commercial_business_action_on/'+project_code+'/'+id_document;
            return this._http.get(url, this.getToken());
        }
        // set evaluator status single doc off
        setProjetCommercialSingleDocsStatusReject = (project_code: string, id_document: number) => {
            const url = this._api_url.apiUrl+'status_commercial_business_action_off/'+project_code+'/'+id_document;
            return this._http.get(url, this.getToken());
        }
        // rejected evaluator evaluation
        setProjetCommercialCompletedDocsStatus = (data: any) => {
            const url = this._api_url.apiUrl+'store_comment';
            return this._http.post(url, data, this.getToken());
        }
        // get list project assignements
        getListeProjetCommercialResolved = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_project_commercial_validated_by_evaluator_two/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }

    // 😇 Non Commerciale
        // get list project assignements
        getListeProjetNonCommercial = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_evaluator_projet_from_non_commercial_business_assignment/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }
        // set evaluator status single doc on
        setProjetNonCommercialSingleDocsStatusValidate = (project_code: string, id_document: number) => {
            const url = this._api_url.apiUrl+'status_non_commercial_business_action_on/'+project_code+'/'+id_document;
            return this._http.get(url, this.getToken());
        }
        // set evaluator status single doc off
        setProjetNonCommercialSingleDocsStatusReject = (project_code: string, id_document: number) => {
            const url = this._api_url.apiUrl+'status_non_commercial_business_action_off/'+project_code+'/'+id_document;
            return this._http.get(url, this.getToken());
        }
        // rejected evaluator evaluation
        setProjetNonCommercialCompletedDocsStatus = (data: any) => {
            const url = this._api_url.apiUrl+'store_comment_non_commercial';
            return this._http.post(url, data, this.getToken());
        }
        // get list project assignements
        getListeProjetNonCommercialResolved = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_project_non_commercial_validated_by_evaluator_two/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }

    // 😇😇 **** REQUEST HELP
        // 😇 Help
        // List projects
        getListeProjetHelp = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_projet_fond_business_assignment_by_instructeur/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }
        //  Rejected
        setProjetHelpSingleDocsStatusReject = (project_code: any, item_id: any) => {
            const url = this._api_url.apiUrl+'status_doc_projet_fond_action_off/'+project_code+'/'+item_id;
            return this._http.get(url, this.getToken());
        }
        //
        setProjetHelpSingleDocsStatusValidate = (project_code: any, item_id: any) => {
            const url = this._api_url.apiUrl+'status_doc_projet_fond_action_on/'+project_code+'/'+item_id;
            return this._http.get(url, this.getToken());
        }
        // send rejected mail
        setProjetHelpCompletedDocsStatus = (data: any) => {
            const url = this._api_url.apiUrl+'store_projet_fond_comment';
            return this._http.post(url, data, this.getToken());
        }
        // setProjetHelpSingleDocsStatusValidate
        //
        getListeProjetHelpResolved = (evaluator_id: any) => {
            const url = this._api_url.apiUrl+'get_projet_fond_validated_by_evaluator_two/'+evaluator_id;
            return this._http.get(url, this.getToken());
        }

    // 😇😇 **** REQUEST COMMERCIAL AND NON COMMERCIAL
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
        //
        storeEvEvaluationDecret = (data: any) => {
            const url = this._api_url.apiUrl+'validate_evaluator_conformite_project_comments_by_decrets';
            return this._http.post(url, data, this.getToken());
        }
        //
        storeEvEvaluationDecretHelp = (data: any) => {
            const url = this._api_url.apiUrl+'validate_evaluator_conformite_project_comments_by_decrets';
            return this._http.post(url, data, this.getToken());
        }

    // 😇 UPDATE PROJECT DATA
        // 😇 Condition financement
            // update_projet_fond_condition_financement
            updateConditionFinancement = (data: any, condition_slug: string) => {
                const url = this._api_url.apiUrl+'update_projet_fond_condition_financement/'+condition_slug;
                return this._http.post(url, data, this.getToken());
            }
        // 😇 Performance anterieure
            // set performance anterieure to db
            storePerformanceAnterieureData = (data: any) => {
                const url = this._api_url.apiUrl+'store_projet_fond_performance_anterieur';
                return this._http.post(url, data, this.getToken());
            }
            // update performance anterieure to db
            updatePerformanceAnterieureData = (data: any, item_slug: string) => {
                const url = this._api_url.apiUrl+'update_projet_fond_performance_anterieur/'+item_slug;
                return this._http.post(url, data, this.getToken());
            }
            // update variation
             updatePerformanceAnterieureVariationData = (data: any) => {
                const url = this._api_url.apiUrl+'update_variation_data';
                return this._http.post(url, data, this.getToken());
            }
        // 😇 Encours endettement
            // set to db
            storeEncoursEndettementData = (data: any) => {
                const url = this._api_url.apiUrl+'store_projet_fond_encour_endettement';
                return this._http.post(url, data, this.getToken());
            }
            // update to db
            updateEncoursEndettementData = (data: any, item_slug: string) => {
                const url = this._api_url.apiUrl+'update_projet_fond_encour_endettement/'+item_slug;
                return this._http.post(url, data, this.getToken());
            }

        // 😇 Performance project
            // set performance project to db
            storePerformanceProjectData = (data: any) => {
                const url = this._api_url.apiUrl+'store_projet_fond_performance_projet';
                return this._http.post(url, data, this.getToken());
            }
            // update performance project to db
            updatePerformanceProjectData = (data: any, item_slug: string) => {
                const url = this._api_url.apiUrl+'update_projet_fond_performance_projet/'+item_slug;
                return this._http.post(url, data, this.getToken());
            }
            // update variation
            updatePerformanceProjectVariationData = (data: any) => {
                const url = this._api_url.apiUrl+'update_variation_projet_data';
                return this._http.post(url, data, this.getToken());
            }

        // 😇 CONTRE ANALYSE SWOT
            // *** strengths
                // set strengths to db
                storeContreStrengths = (data: any) => {
                    const url = this._api_url.apiUrl+'store_contre_analyse_swot_force';
                    return this._http.post(url, data, this.getToken());
                }
                // update strengths to db
                updateContreStrengths = (data: any, item_slug: string) => {
                    const url = this._api_url.apiUrl+'update_contre_analyse_swot_force/'+item_slug;
                    return this._http.post(url, data, this.getToken());
                }

            // *** weakness
                // set weakness to db
                storeContreWeakness = (data: any) => {
                    const url = this._api_url.apiUrl+'store_contre_analyse_swot_faiblesse';
                    return this._http.post(url, data, this.getToken());
                }
                // update weakness to db
                updateContreWeakness = (data: any, item_slug: string) => {
                    const url = this._api_url.apiUrl+'update_contre_analyse_swot_faiblesse/'+item_slug;
                    return this._http.post(url, data, this.getToken());
                }


            // *** opportunity
                // set opportunity to db
                storeContreOpportunity = (data: any) => {
                    const url = this._api_url.apiUrl+'store_contre_analyse_swot_opportunity';
                    return this._http.post(url, data, this.getToken());
                }
                // update opportunity to db
                updateContreOpportunity = (data: any, item_slug: string) => {
                    const url = this._api_url.apiUrl+'update_contre_analyse_swot_opportunity/'+item_slug;
                    return this._http.post(url, data, this.getToken());
                }


            // *** threats
                // set threats to db
                storeContreThreats = (data: any) => {
                    const url = this._api_url.apiUrl+'store_contre_analyse_swot_menace';
                    return this._http.post(url, data, this.getToken());
                }
                // update threats to db
                updateContreThreats = (data: any, item_slug: string) => {
                    const url = this._api_url.apiUrl+'update_contre_analyse_swot_menace/'+item_slug;
                    return this._http.post(url, data, this.getToken());
                }


        // 😇 INDICATEURS
            // *** store to db
            storeIndicateurs = (data: any) => {
                const url = this._api_url.apiUrl+'store_indicateur_performance';
                return this._http.post(url, data, this.getToken());
            }
            // update to db
            updateIndicateurs = (data: any, item_slug: string) => {
                const url = this._api_url.apiUrl+'update_indicateur_performance/'+item_slug;
                return this._http.post(url, data, this.getToken());
            }

    // 😇😇 **** REQUEST GLOBAL PAGES
        // 😇 send message
        // store_comment_non_commercial

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

        //
    // 😇😇 ************************************************ //
// ****************** END SEND AND GET DATA IN DB FOR SUBMIT PROJECT ****************** //
// ************************************************ 😇😇😇😇 //

}
