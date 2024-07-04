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
    selector: 'app-liste-projet-commercial',
    templateUrl: './liste-projet-commercial.component.html',
    styleUrls: ['./liste-projet-commercial.component.css']
})
export class ListeProjetCommercialComponent implements OnInit {

    public p: number = 1;
    public evaluator: any = {};
    public _liste_global_projet: any = [];
    public is_loading_data: boolean = true;

    constructor(
        private _dialog: MatDialog,
        private _request: FirstEvaluatorService,
        private _router: Router,
        private _message: MessageService,
        private _loading: NgxUiLoaderService,
        private _localeStorage: CustomerStorageService,
        private _coockieService: CookieService
    ) {

    }

    ngOnInit() {
       this.evaluator = this._localeStorage.getDataToStorage();
        this.getListeProjetCommercials();
    }

    getListeProjetCommercials() {
        this._request.getListeProjetCommercial(this.evaluator.id).subscribe(
            {
                next: (response: any) => {
                    this._liste_global_projet = response;
                    this.is_loading_data = false;
                },
                error: (error: any) => {
                    if (error.status == 401) {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        )
    }

}

