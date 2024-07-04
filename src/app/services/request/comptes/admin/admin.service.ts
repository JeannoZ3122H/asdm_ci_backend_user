import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from 'src/app/services/apiUrl/api-url.service';
import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(
        private _http: HttpClient,
        private _api_url: ApiUrlService,
        private _cookie: CustomerCookieService,
    ){}

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
// 😇😇 **** REQUEST FROM PROFIL
    // 😇 Admin setting
        // get list admin account
        getListeCompte = () => {
            const url = this._api_url.apiUrl + 'get_admin_account';
            return this._http.get(url, this.getToken());
        }
        // store admin account
        saveCompte = (data: any) => {
            const url = this._api_url.apiUrl + 'store_admin_account';
            return this._http.post(url, data, this.getToken());
        }
        // update admin account
        updateCompte = (slug: any, data: any) => {
            const url = this._api_url.apiUrl + 'update_admin_account/' + slug;
            return this._http.post(url, data, this.getToken());
        }
        // delete admin account
        deleteCompte = (slug: any) => {
            const url = this._api_url.apiUrl + 'destroy_admin_account/' + slug;
            return this._http.get(url, this.getToken());
        }
        // toggle admin status account
        statusAction = (slug: any) => {
            const url = this._api_url.apiUrl + 'action_admin_account/' + slug;
            return this._http.get(url, this.getToken());
        }
        // update admin avatar
        updateUserImg = (data: any) =>{
            const url = this._api_url.apiUrl+'update_admin_photo';
            return this._http.post(url, data, this.getToken());
        }
}
