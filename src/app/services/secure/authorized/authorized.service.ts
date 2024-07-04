import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerCookieService } from '../cookies/customer-cookie.service';
import { CustomerStorageService } from '../storages/customer-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizedService {
    public authorized: boolean = false;

    public list: any[] = [
        'super-administrateur',
        'super-administrator',
        'super-administrateurs',
        'super-administrators',
        'super-admin',
        'directeur général',
        'directeur general',
        'directrice générale',
        'directrice generale',
        'dg',
        'manageur',
        'manager',
        'superviseur',
        'supervisor',
        'visiteur',
        'visitor'
    ];
    constructor(
        private __ls: CustomerStorageService,
        private __co: CustomerCookieService,
        private __route: Router
    ) { }

    authorizedUser()
    {
        const role = (this.__ls.getDataToStorage().role).toLocaleLowerCase();
        if(this.__co.getTokenToCookie()){
            let i: number = 0;
            // Object.values(this.__ls.getDataToStorage()).some((x: any) => {if(x == null || x == ''){i++;}else{i;}});
            let result: any = this.checkRoleInList(role);
            if(result == false){i++;}else{i;};
            if(i == 0){ return true;}else {return false;}
        }else{
            return false;
        }
    }
    //
    checkRoleInList = (role: string): Boolean =>{
        let res: boolean = false;
        if(this.list.includes(role)){
            res = true;
        }else{
            res = false
        }
        return res;
    }
}
