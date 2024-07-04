import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from 'src/app/services/apiUrl/api-url.service';
import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';

@Injectable({
    providedIn: 'root'
})
export class UtilisateursService {


    constructor(
        private _cookie: CustomerCookieService,
        private _http: HttpClient,
        private _api_url: ApiUrlService
    ){}

// 😇😇 ************************************************ //
  // ****************** START GET TOKEN ****************** //
    // ************************************************ 😇😇😇😇 //
    getToken = () => {
        let get_token = this._cookie.getTokenToCookie();
        return { headers: { 'Authorization': 'Bearer ' + get_token } };
    }
    // 😇😇 ************************************************ //
  // ****************** END GET TOKEN ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
 // ****************** START SEND AND GET DATA IN DB FOR SUBMIT PROJECT ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** DEFAULT ACCOUNT
    // 😇 Commercial && Non commercial
        // List user defalut account
        getListeDefaultCompte = () => {
            const url = this._api_url.apiUrl + 'get_default_commercial_business_account';
            return this._http.get(url, this.getToken());
        }
        // update user default account
        updateDefaultCompte = (slug: any, data: any, type_user: any) => {
            let url: any = '';
            if(type_user == "TC-002"){
                url = this._api_url.apiUrl+'update_default_non_commercial_business_account/' + slug;
            }
            if(type_user == "TC-001"){
                url = this._api_url.apiUrl+'update_default_commercial_business_account/' + slug;
            }
            return this._http.post(url, data, this.getToken());
        }
        // delete user default account
        deleteDefaultCompte = (slug: any) => {
            const url = this._api_url.apiUrl + 'destroy_default_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }


    // 😇 Non commercial
        // List user defalut account
        getListeDefaultCompteNonCommercial = () => {
            const url = this._api_url.apiUrl + 'get_default_non_commercial_business_account';
            return this._http.get(url, this.getToken());
        }
        // update user default account
        updateDefaultCompteNonCommercial = (slug: any, data: any) => {
            const url = this._api_url.apiUrl + 'update_default_non_commercial_business_account/' + slug;
            return this._http.post(url, data, this.getToken());
        }
        // delete user default account
        deleteDefaultCompteNonCommercial = (slug: any) => {
            const url = this._api_url.apiUrl + 'destroy_default_non_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }

// 😇😇 **** OFFICIEL ACCOUNT
    // 😇 Commercial
        // list user officiel account
        getListeActivedCompte = () => {
            const url = this._api_url.apiUrl + 'get_official_commercial_business_account';
            return this._http.get(url, this.getToken());
        }
        // update user officiel account
        updateActivedCompte = (slug: any, data: any, type_user: any) => {
            let url: any = '';
            if(type_user == "TC-002"){
                url = this._api_url.apiUrl+'update_official_non_commercial_business_account/' + slug;
            }
            if(type_user == "TC-001"){
                url = this._api_url.apiUrl+'update_official_commercial_business_account/' + slug;
            }
            return this._http.post(url, data, this.getToken());
        }
        // delete user officiel account
        deleteActivedCompte = (slug: any) => {
            const url = this._api_url.apiUrl + 'destroy_official_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }
        // migrate user officiel account
        migrateDefaultCompte = (slug: any) => {
            const url = this._api_url.apiUrl + 'migrate_default_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }
        // status toggle user officiel account
        statusActionCompteActived = (slug: any) => {
            const url = this._api_url.apiUrl + 'approve_official_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }


    // 😇 Non commercial
        // list user officiel account
        getListeActivedCompteNonCommercial = () => {
            const url = this._api_url.apiUrl + 'get_official_non_commercial_business_account';
            return this._http.get(url, this.getToken());
        }
        // update user officiel account
        updateActivedCompteNonCommercial = (slug: any, data: any) => {
            const url = this._api_url.apiUrl + 'update_official_non_commercial_business_account/' + slug;
            return this._http.post(url, data, this.getToken());
        }
        // delete user officiel account
        deleteActivedCompteNonCommercial = (slug: any) => {
            const url = this._api_url.apiUrl + 'destroy_official_non_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }
        // migrate user officiel account
        migrateDefaultCompteNonCommercial = (slug: any) => {
            const url = this._api_url.apiUrl + 'migrate_default_non_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }
        // status toggle user officiel account
        statusActionCompteActivedNonCommercial = (slug: any) => {
            const url = this._api_url.apiUrl + 'approve_official_non_commercial_business_account/' + slug;
            return this._http.get(url, this.getToken());
        }
}
