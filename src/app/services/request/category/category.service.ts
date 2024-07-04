import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(
        private _http: HttpClient,
        private _api_url: ApiUrlService
    ) { }

    getListeCategoryByTypeCategory = (id: number) => {
        const url = this._api_url.apiUrl + 'get_category_by_type_category_id/'+id;
        return this._http.get(url);
    }

    getListeCategory = () => {
        const url = this._api_url.apiUrl + 'get_category';
        return this._http.get(url);
    }

    saveCategory = (data: any) => {
        const url = this._api_url.apiUrl + 'store_category';
        return this._http.post(url, data);
    }

    updateCategory = (slug: any, data: any) => {
        const url = this._api_url.apiUrl + 'update_category/' + slug;
        return this._http.post(url, data);
    }

    deleteCategory = (slug: any) => {
        const url = this._api_url.apiUrl + 'destroy_category/' + slug;
        return this._http.get(url);
    }
}
