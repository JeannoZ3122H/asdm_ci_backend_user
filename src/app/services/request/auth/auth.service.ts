import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../apiUrl/api-url.service';
import {
  CustomerCookieService,
} from '../../secure/cookies/customer-cookie.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private _coockie: CustomerCookieService,
        private _http: HttpClient,
        private _api_url: ApiUrlService
    ) { }


// 😇😇 ************************************************ //
// ****************** START GET TOKEN ****************** //
    // ************************************************ 😇😇😇😇 //
    getToken = () => {
        let get_token = this._coockie.getTokenToCookie();
        return {headers: {'Authorization': 'Bearer ' +get_token}};
    }
    // 😇😇 ************************************************ //
// ****************** END GET TOKEN ****************** //
// ************************************************ 😇😇😇😇 //


    logIn = (data: any) => {
        const url = this._api_url.apiUrl + 'admin_authentificator';
        return this._http.post(url, data);
    }

    logOut = (id: number) => {
        let get_token = this._coockie.getTokenToCookie();
        const url = this._api_url.apiUrl+'logout_users/'+id;
        return this._http.get(url, this.getToken());
    }
}
