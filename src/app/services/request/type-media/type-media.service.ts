import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from '../../apiUrl/api-url.service';

@Injectable({
  providedIn: 'root'
})
export class TypeMediaService {
  constructor(
  private _http: HttpClient,
  private _api_url: ApiUrlService
) { }

getListeTypeMedia = () => {
const url = this._api_url.apiUrl+'get_type_media';
return this._http.get(url);
}

saveTypeMedia = (data: any) => {
const url = this._api_url.apiUrl+'store_type_media';
return this._http.post(url, data);
}

updateTypeMedia = (item_slug:string ,data: any) => {
const url = this._api_url.apiUrl+'update_type_media/'+item_slug;
return this._http.post(url, data);
}

deleteTypeMedia = (item_slug: any) => {
const url = this._api_url.apiUrl+'destroy_type_media/'+item_slug;
return this._http.get(url);
}
}
