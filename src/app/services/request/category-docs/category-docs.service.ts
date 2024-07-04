import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../apiUrl/api-url.service';
import {
  CustomerCookieService,
} from '../../secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from '../../secure/storages/customer-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryDocsService {

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
// ****************** START REQUEST FROM DB ****************** //
    // ************************************************ 😇😇😇😇 //
// 😇😇 **** REQUEST
    // get
    get = () =>{
        const url = this._api_url.apiUrl+'get_category_document';
        return this._http.get(url, this.getToken());
    }
    // store
    store = (data: any) =>{
        const url = this._api_url.apiUrl+'store_category_document';
        return this._http.post(url, data, this.getToken());
    }
    // update
    update = (slug:any ,data: any) =>{
        const url = this._api_url.apiUrl+'update_category_document/'+slug;
        return this._http.post(url, data, this.getToken());
    }
    // delete
    delete = (slug: any) =>{
        const url = this._api_url.apiUrl+'destroy_category_document/'+slug;
        return this._http.get(url, this.getToken());
    }

    // 😇😇 ************************************************ //
// ****************** END REQUEST FROM DB ****************** //
// ************************************************ 😇😇😇😇 //

}
