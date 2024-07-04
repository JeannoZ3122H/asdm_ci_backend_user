import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class TypeCategoryService {

    constructor(
        private _http: HttpClient,
        private _api_url: ApiUrlService
    ) { }

    getListeTypeCategory = () => {
    const url = this._api_url.apiUrl+'get_type_category';
    return this._http.get(url);
    }

    saveTypeCategory = (data: any) => {
    const url = this._api_url.apiUrl+'store_type_category';
    return this._http.post(url, data);
    }

    updateTypeCategory = (slug:number ,data: any) => {
    const url = this._api_url.apiUrl+'update_type_category/'+slug;
    return this._http.post(url, data);
    }

    deleteTypeCategory = (slug: any) => {
    const url = this._api_url.apiUrl+'destroy_type_category/'+slug;
    return this._http.get(url);
    }
}
