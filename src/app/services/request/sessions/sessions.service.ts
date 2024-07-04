import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {
    constructor(
        private _http: HttpClient,
        private _api_url: ApiUrlService
      ) { }

      getListeSession = () =>{
        const url = this._api_url.apiUrl+'get_session';
        return this._http.get(url);
      }

      saveSession = (data: any) =>{
        const url = this._api_url.apiUrl+'store_session';
        return this._http.post(url, data);
      }

      updateSession = (slug:any ,data: any) =>{
        const url = this._api_url.apiUrl+'update_session/'+slug;
        return this._http.post(url, data);
      }

      deleteSession = (slug: any) =>{
        const url = this._api_url.apiUrl+'destroy_session/'+slug;
        return this._http.get(url);
      }
}
