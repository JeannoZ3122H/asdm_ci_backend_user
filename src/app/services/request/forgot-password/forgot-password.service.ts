import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
constructor(
    private _http: HttpClient,
    private _api_url: ApiUrlService
    ) { }

    verifyEmail = (email: any) =>{
        const url = this._api_url.apiUrl+'check_user_account';
        return this._http.post(url, email);
    }

    resetPassword = (data: any) =>{
        // mail + new_password
        const url = this._api_url.apiUrl+'update_user_password';
        return this._http.post(url, data);
    }
}
