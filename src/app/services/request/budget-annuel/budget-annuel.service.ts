import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetAnnuelService {

  constructor(
    
  private _http: HttpClient,
  private _api_url: ApiUrlService
  ) { }

  getListeBudget = () => {
    const url = this._api_url.apiUrl+'get_budget';
    return this._http.get(url);
    }
    
    saveBudget = (data: any) => {
    const url = this._api_url.apiUrl+'store_budget';
    return this._http.post(url, data);
    }
    
    updateBudget = (slug:string ,data: any) => {
    const url = this._api_url.apiUrl+'update_budget/'+slug;
    return this._http.post(url, data);
    }
    
    deleteBudget = (slug: any) => {
    const url = this._api_url.apiUrl+'destroy_budget/'+slug;
    return this._http.get(url);
    }

    /***BUDGET ORGANISATION */
    getListeBudget_organisation = () => {
    const url = this._api_url.apiUrl+'get_budget_organisation';
    return this._http.get(url);
    }
    
    saveBudget_organisation = (data: any) => {
    const url = this._api_url.apiUrl+'store_budget_organisation';
    return this._http.post(url, data);
    }
    
    updateBudget_organisation = (slug:string ,data: any) => {
    const url = this._api_url.apiUrl+'update_budget_organisation/'+slug;
    return this._http.post(url, data);
    }
    
    deleteBudget_organisation = (slug: any) => {
    const url = this._api_url.apiUrl+'destroy_budget_organisation/'+slug;
    return this._http.get(url);
    }
    
}
