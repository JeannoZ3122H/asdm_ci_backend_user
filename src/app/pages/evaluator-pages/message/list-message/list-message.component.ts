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
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit{
    public p: number = 1;
    public evaluator: any = {};
    public _liste_message: any = [];

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
        this.getAllMessage();
    }

    getAllMessage() {
        this._request.getAllMessage(this.evaluator.id).subscribe(
            {
                next: (response: any) => {
                    this._liste_message = response;
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
