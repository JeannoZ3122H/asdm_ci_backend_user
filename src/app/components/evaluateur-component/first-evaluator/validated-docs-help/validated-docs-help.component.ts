import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';

@Component({
  selector: 'app-validated-docs-help',
  templateUrl: './validated-docs-help.component.html',
  styleUrls: ['./validated-docs-help.component.css']
})
export class ValidatedDocsHelpComponent implements OnInit{

    public project_id: any;
    public project_code: any;
    public evaluator_id: any;
    public object: string = '';
    public message: string = '';
    public user_email: string = '';
    public evaluator_slug: string = '';
    public user_ref: string = '';

    constructor(
        private _dialog: MatDialog,
        private _message: MessageService,
        private _request: FirstEvaluatorService,
        private _loading: NgxUiLoaderService,
        private _router: Router, @Inject(MAT_DIALOG_DATA)
        public data: any, private _dialogRef: MatDialogRef<ValidatedDocsHelpComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null){
            this.project_id = this.data.project_id;
            this.project_code = this.data.project_code;
            this.evaluator_id = this.data.evaluator_id;
            this.user_email = this.data.user_email;
            this.user_ref = this.data.user_ref;
            this.evaluator_slug = this.data.evaluator_slug;

            console.log('eval_slug:', this.evaluator_slug);
            console.log('data:', this.data);
        }
    }

    close(){
        this._dialogRef.close('close');
    }

    sendMessage(){

        // Data go with comment
        const data = {
            project_id: this.project_id,
            object: this.object,
            message: this.message,
            project_code: this.project_code,
            user_ref: this.user_ref,
            user_email: this.user_email,
            evaluator_id: this.evaluator_id,
            evaluator_slug: this.evaluator_slug,
            type: 'validated'
        }

        console.log(data)
        this._loading.start();
        // this._request.sendValidatedMessageToUsers2(data).subscribe(
        //     {
        //         next: (response: any)=>{
        //             console.log(response)
        //             if (response.code == 200) {
        //                 setTimeout(() => {
        //                     this._message.successOperation(response);
        //                     this._loading.stop();
        //                     this._dialogRef.close('close');
        //                     this._router.navigateByUrl('/evaluateur.liste-projet-non-commercial');
        //                 }, 1000);
        //             } else if (response.code == 302 || response.code == 300) {
        //                 this._loading.stop();
        //                 this._message.error(response);
        //             }
        //         },
        //         error: (error: any)=>{
        //             if (error.status == 401) {
        //                 this._message.tokenExpired();
        //                 localStorage.clear();
        //                 this._router.navigateByUrl('/');
        //                 window.location.reload();
        //             }
        //         }
        //     }
        // )
    }
}
