import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  SecondEvaluatorService,
} from 'src/app/services/request/evaluator-request/second-evaluator/second-evaluator.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-second-list-projet-help',
  templateUrl: './second-list-projet-help.component.html',
  styleUrls: ['./second-list-projet-help.component.css']
})
export class SecondListProjetHelpComponent implements OnInit{

    public p: number = 1;
    public evaluator: any = {};
    public _liste_global_projet: any = [];
    public is_loading_data: boolean = true;

    constructor(
        private _request: SecondEvaluatorService,
        private _router: Router,
        private _message: MessageService,
        private _localeStorage: CustomerStorageService,
        private _coockie: CookieService
    ){}

    ngOnInit() {
       this.evaluator = this._localeStorage.getDataToStorage();
        this.getListeProjetHelp();
    }

    getListeProjetHelp() {
        this._request.getListeProjetHelp(this.evaluator.id).subscribe(
            {
                next: (response: any) => {
                    this._liste_global_projet = response;

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
