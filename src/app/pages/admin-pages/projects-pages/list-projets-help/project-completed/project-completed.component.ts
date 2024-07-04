import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-project-completed',
  templateUrl: './project-completed.component.html',
  styleUrls: ['./project-completed.component.css']
})
export class ProjectCompletedComponent {

    public p: number = 1;
    public evaluator: any = {};
    public _liste_global_projet_resolved: any = [];

    _visitor: boolean = false;
    constructor(
        private _request: ProjetsService,
        private _router: Router,
        private _message: MessageService,
        private _localeStorage: CustomerStorageService,
        private _coockie: CookieService,
        private _authorized: AuthorizedService
    ) {
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }
    }

    ngOnInit() {
       this.evaluator = this._localeStorage.getDataToStorage();
        this.getListeProjetHelpResolved();
    }

    getListeProjetHelpResolved() {
        this._request.getAllProjectsCompletedHelp().subscribe(
            {
                next: (response: any) => {
                    this._liste_global_projet_resolved = response;
                },
                error: (error: any) => {
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockie.delete('us_id');
                        this._coockie.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }
}
