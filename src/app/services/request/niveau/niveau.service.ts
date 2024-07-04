import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class NiveauService {

  constructor(
    private _http: HttpClient,
    private _api_url: ApiUrlService
  ) { }

  getListeNiveau = () =>{
    const url = this._api_url.apiUrl+'get_niveau_evaluator';
    return this._http.get(url);
  }

  saveNiveau = (data: any) =>{
    const url = this._api_url.apiUrl+'store_niveau_evaluator';
    return this._http.post(url, data);
  }

  updateNiveau = (slug:any ,data: any) =>{
    const url = this._api_url.apiUrl+'update_niveau_evaluator/'+slug;
    return this._http.post(url, data);
  }

  deleteNiveau = (slug: any) =>{
    const url = this._api_url.apiUrl+'destroy_niveau_evaluator/'+slug;
    return this._http.get(url);
  }
}
