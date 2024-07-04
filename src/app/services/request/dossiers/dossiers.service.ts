import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class DossiersService {

  constructor(
    private _http: HttpClient,
    private _api_url: ApiUrlService
  ) { }


  getListeDossiersCommercial = () =>{
    const url = this._api_url.apiUrl+'';
    return this._http.get(url);
  }

  getListeDossiersNonCommercial = () =>{
    const url = this._api_url.apiUrl+'';
    return this._http.get(url);
  }

}
