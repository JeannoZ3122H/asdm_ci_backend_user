import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(
        private _http: HttpClient,
        private _api_url: ApiUrlService
    ) { }

    getListeRole = () => {
        const url = this._api_url.apiUrl + 'get_role';
        return this._http.get(url);
    }

    saveRole = (data: any) => {
        const url = this._api_url.apiUrl + 'store_role';
        return this._http.post(url, data);
    }

    updateRole = (slug: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_role/' + slug;
        return this._http.post(url, data);
    }

    deleteRole = (slug: any) => {
        const url = this._api_url.apiUrl + 'destroy_role/' + slug;
        return this._http.get(url);
    }
}
