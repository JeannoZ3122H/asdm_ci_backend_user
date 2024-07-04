import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-list-projet-resolved-non-commercial',
  templateUrl: './list-projet-resolved-non-commercial.component.html',
  styleUrls: ['./list-projet-resolved-non-commercial.component.css']
})
export class ListProjetResolvedNonCommercialComponent implements OnInit{

    public p: number = 1;
    public evaluator: any = {};
    public _liste_global_projet_resolved: any = [];
    public is_loading_data: boolean = true;

    constructor(
        private _dialog: MatDialog,
        private _request: FirstEvaluatorService,
        private _router: Router,
        private _message: MessageService,
        private _loading: NgxUiLoaderService,
        private _localeStorage: CustomerStorageService,
        private _coockie: CookieService
    ) {

    }

    ngOnInit() {
       this.evaluator = this._localeStorage.getDataToStorage();
        this.getListeProjetNonCommercialResolved();
    }

    getListeProjetNonCommercialResolved() {
        this._request.getListeProjetNonCommercialResolved(this.evaluator.id).subscribe(
            {
                next: (response: any) => {
                    this._liste_global_projet_resolved = response;
                    if(response.code == 302){
                        this._liste_global_projet_resolved = [];
                    }

                    this.is_loading_data = false;
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
