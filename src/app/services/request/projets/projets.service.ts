import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../apiUrl/api-url.service';
import {
  CustomerCookieService,
} from '../../secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from '../../secure/storages/customer-storage.service';

@Injectable({ providedIn: 'root' }) export class ProjetsService {


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
        // List projects
        getGlobalProjetCommercial = () => {
            const url = this._api_url.apiUrl + 'get_commercial_projects';
            return this._http.get(url, this.getToken());
        }
        //
        getGlobalProjetDetails = (project_code: any) => {
            const url = this._api_url.apiUrl+'admin_show_project_details/'+project_code;
            return this._http.get(url, this.getToken());
        }
        //
        asignedProjetCommercial = (data: any) => {
            const url = this._api_url.apiUrl + 'store_commercial_business_assignment';
            return this._http.post(url, data, this.getToken());
        }
        // Asigned Projet
        getAsignedProjetCommercial = (niveau_code: any) => {
            const url = this._api_url.apiUrl + 'get_commercial_business_assignment/'+niveau_code;
            return this._http.get(url, this.getToken());
        }
        //
        reasignedProjetCommercial = (project_code: number, old_instructor_id: number, instructor_id: any, date_fin: any) => {
            const url = this._api_url.apiUrl+'update_assignment_project_instructeur/'+project_code+'/'+old_instructor_id+'/'+instructor_id+'/'+date_fin;
            return this._http.get(url, this.getToken());
        }
        // get
        getAllProjectsCompletedCommercial = () =>{
            const url = this._api_url.apiUrl+'get_project_business_commercial_completed';
            return this._http.get(url, this.getToken());
        }

    // 😇 Non Commercial
        // Globale Projet
        getGlobalProjetNonCommercial = () => {
            const url = this._api_url.apiUrl + 'get_non_commercial_projects';
            return this._http.get(url, this.getToken());
        }

        asignedProjetNonCommercial = (data: any) => {
            const url = this._api_url.apiUrl + 'store_assignation_non_commercial_business';
            return this._http.post(url, data, this.getToken());
        }

        // Asigned Projet
        getAsignedProjetNonCommercial = (niveau_code: any) => {
            const url = this._api_url.apiUrl + 'get_non_commercial_business_assignment/'+niveau_code;
            return this._http.get(url, this.getToken());
        }

        reasignedProjetNonCommercial = (project_code: number, old_instructor_id: number, instructor_id: any, date_fin: any) => {
            const url = this._api_url.apiUrl+'update_assignment_project_instructeur/'+project_code+'/'+old_instructor_id+'/'+instructor_id+'/'+date_fin;
            return this._http.get(url, this.getToken());
        }
        // get
        getAllProjectsCompletedNonCommercial = () =>{
            const url = this._api_url.apiUrl+'get_project_business_non_commercial_completed';
            return this._http.get(url, this.getToken());
        }

// 😇😇 **** REQUEST HELP
    // 😇
        // List projects
        getGlobalProjetHelp = () => {
            const url = this._api_url.apiUrl + 'get_projet_fond_garantie';
            return this._http.get(url, this.getToken());
        }
        // details project
        getGlobalProjetHelpDetails = (project_code: any) => {
            const url = this._api_url.apiUrl+'show_administration_projet_fond/'+project_code;
            return this._http.get(url, this.getToken());
        }
        // set assigned project
        asignedProjetHelp = (data: any) => {
            const url = this._api_url.apiUrl + 'store_assignation_projet_fond';
            return this._http.post(url, data, this.getToken());
        }
        // get assigned project
        getAsignedProjetHelp = (niveau_code: any) => {
            const url = this._api_url.apiUrl + 'get_projet_fond_assignation/'+niveau_code;
            return this._http.get(url, this.getToken());
        }
        // set reassigned project
        reasignedProjetHelp = (project_code: number, old_instructor_id: number, instructor_id: any, date_fin: any) => {
            const url = this._api_url.apiUrl+'update_assignment_project_instructeur/'+project_code+'/'+old_instructor_id+'/'+instructor_id+'/'+date_fin;
            return this._http.get(url, this.getToken());
        }
        // get
        getAllProjectsCompletedHelp = () =>{
            const url = this._api_url.apiUrl+'get_projet_fond_completed';
            return this._http.get(url, this.getToken());
        }

    // 😇😇 ************************************************ //
// ****************** END SEND AND GET DATA IN DB FOR SUBMIT PROJECT ****************** //
// ************************************************ 😇😇😇😇 //


}
