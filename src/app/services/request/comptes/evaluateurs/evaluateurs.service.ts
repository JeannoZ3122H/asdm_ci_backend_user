import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from 'src/app/services/apiUrl/api-url.service';

@Injectable({
    providedIn: 'root'
})
export class EvaluateursService {

    constructor(
        private _http: HttpClient,
        private _api_url: ApiUrlService
    ) { }


    getListeCompte = () => {
        const url = this._api_url.apiUrl + 'get_evaluator_account';
        return this._http.get(url);
    }

    getListeEvaluateur = (niveau_code: any) => {
        const url = this._api_url.apiUrl + 'get_evaluator_account_by_niveau/' + niveau_code;
        return this._http.get(url);
    }

    saveCompte = (data: any) => {
        const url = this._api_url.apiUrl + 'store_evaluator_account';
        return this._http.post(url, data);
    }

    updateCompte = (slug: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_evaluator_account/' + slug;
        return this._http.post(url, data);
    }

    deleteCompte = (slug: any) => {
        const url = this._api_url.apiUrl + 'destroy_evaluator_account/' + slug;
        return this._http.get(url);
    }

    statusAction = (slug: any) => {
        const url = this._api_url.apiUrl + 'action_evaluator_account/' + slug;
        return this._http.get(url);
    }
}

