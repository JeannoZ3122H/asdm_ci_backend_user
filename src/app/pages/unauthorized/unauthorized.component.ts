import { Location } from '@angular/common';
import { Component } from '@angular/core';

import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent {
    public current_user_role: string = '';
    constructor(
        private _location: Location,
        private _coockie: CustomerCookieService,
        private _localStorage: CustomerStorageService
    ){}
    ngOnInit(){
        let get_user_type_normal = this._coockie.getKeywordToCookie();
        this.current_user_role = get_user_type_normal.toLocaleLowerCase();

        if(this.current_user_role == 'administrateur' || this.current_user_role == 'administrateurs' || this.current_user_role == 'admin'){
            this.current_user_role = 'Administrateur';
        }

        if(this.current_user_role == 'evaluateur' || this.current_user_role == 'evaluateurs' || this.current_user_role == 'evaluator'){
            let niveau_for_ev: any = this._localStorage.getDataToStorage();
            let niveau_name = niveau_for_ev.niveau_name;
            niveau_name = niveau_name.toLowerCase();

            if(niveau_name == "instructeur 1" || niveau_name == "instructeurs 1"){
                this.current_user_role = 'Instructeur 1';
            }else if(niveau_name == "instructeur 2" || niveau_name == "instructeurs 2"){
                this.current_user_role = 'Instructeur 2';
            }
        }
    }
    goToBack(){this._location.back();}
}
