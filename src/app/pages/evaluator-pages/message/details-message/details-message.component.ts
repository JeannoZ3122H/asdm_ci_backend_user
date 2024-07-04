import { Location } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';

@Component({
  selector: 'app-details-message',
  templateUrl: './details-message.component.html',
  styleUrls: ['./details-message.component.css']
})
export class DetailsMessageComponent implements OnInit {

    public detail_message: any = {};
    public reject_data: any = [];
    public doc_list: any = [];
    public default_img: string = 'assets/img/avatar.png';
    public key: string = 'params';

    public is_message_content_found: boolean = false;
    public is_rejected_documents: boolean = false;

    constructor(
        private _router: Router,
        private _request: FirstEvaluatorService,
        private _dialog: MatDialog,
        private _message: MessageService,
        private ngxService: NgxUiLoaderService,
        private _location: Location,
        private _route_active: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private _coockie: CookieService
    ) { }

    ngOnInit() {
        this.getDetailsMessage();
    }

    getDetailsMessage() {
        let message_slug: any = this._route_active.snapshot.paramMap.get('message_slug');
        this._request.getDetailsMessage(message_slug).subscribe(
            {
                next: (response: any) => {
                    this.detail_message = response.comment_data;
                    if(this.detail_message.message != null){
                      this.detail_message.message = this.sanitizer.bypassSecurityTrustHtml(this.detail_message.message)
                    }
                    this.doc_list = response.doc_list;

                    if(this.detail_message.reject_data != null){
                      this.is_rejected_documents = true;
                      this.reject_data = JSON.parse(this.detail_message.reject_data);
                    }else{
                      this.is_rejected_documents = false;
                    }
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

    sanitazerText(text: any){
      return this.sanitizer.bypassSecurityTrustHtml(this.detail_message.message)
    }

    goToBack() { this._location.back(); }
}
