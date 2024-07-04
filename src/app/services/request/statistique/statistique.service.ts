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
export class StatistiqueService {
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
// ****************** START GET DATA IN DB ****************** //
    // ************************************************ 😇😇😇😇 //

    // 😇😇 **** REQUEST STATISTIQUE GLOBAL PROJECT
        // get statistique admin
        getStatistiqueAdmin = () =>{
            const url = this._api_url.apiUrl+'get_default_statistique';
            return this._http.get(url, this.getToken());
        }
        // get statistique instructor
        getStatistiqueEvaluator = (instructor_id: any, niveau_code: string) =>{
            const url = this._api_url.apiUrl+'get_instructor_default_statistique/'+niveau_code+'/'+instructor_id;
            return this._http.get(url, this.getToken());
        }

    // 😇😇 ************************************************ //
// ****************** END GET DATA IN DB ****************** //
// ************************************************ 😇😇😇😇 //

}
