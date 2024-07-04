import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  constructor(
    private _http: HttpClient,
    private _api_url: ApiUrlService
  ) { }
  
  getListeOrganisation = () => {
  const url = this._api_url.apiUrl+'get_type_organisation';
  return this._http.get(url);
  }
  
  saveOrganisation = (data: any) => {
  const url = this._api_url.apiUrl+'store_organisation';
  return this._http.post(url, data);
  }
  
  updateOrganisation = (slug:string ,data: any) => {
  const url = this._api_url.apiUrl+'update_organisation/'+slug;
  return this._http.post(url, data);
  }
  
  deleteOrganisation = (slug: any) => {
  const url = this._api_url.apiUrl+'destroy_organisation/'+slug;
  return this._http.get(url);
  }
}
