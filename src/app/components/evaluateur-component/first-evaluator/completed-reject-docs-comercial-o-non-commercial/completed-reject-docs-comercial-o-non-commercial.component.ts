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

import { CookieService } from 'ngx-cookie-service';
import {
  Editor,
  schema,
  Toolbar,
} from 'ngx-editor';
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

import {
  SingleRejectedDocsComercialONonCommercialComponent,
} from '../single-rejected-docs-comercial-o-non-commercial/single-rejected-docs-comercial-o-non-commercial.component';

@Component({
  selector: 'app-completed-reject-docs-comercial-o-non-commercial',
  templateUrl: './completed-reject-docs-comercial-o-non-commercial.component.html',
  styleUrls: ['./completed-reject-docs-comercial-o-non-commercial.component.css']
})
export class CompletedRejectDocsComercialONonCommercialComponent implements OnInit{

    // editor text
    toolbar: Toolbar = [
        // default value
        ['bold', 'italic'],
        ['underline', 'strike'],
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link', 'image'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear'],
    ];
    colorPresets = ['red', '#FF0000', 'rgb(255, 0, 0)'];


    public key: string = 'folder';
    // var get data
    public project_data: any = {};
    public doc_data: any = {};
    public project_id: any;
    public project_code: any;
    public evaluator_id: any;
    public user_email: string = '';
    public user_ref: string = '';
    public evaluator_slug: string = '';

    public _get_liste_info_folder_rejected:any = [];

    // forms var
    public html_descriptions: string = '';
    public editor_descriptions: any = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    public object: string = '';

    constructor(
        private _dialog: MatDialog,
        private _message: MessageService,
        private _request: FirstEvaluatorService,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _coockie: CookieService,
        private _router: Router, @Inject(MAT_DIALOG_DATA)
        public data: any, private _dialogRef: MatDialogRef<SingleRejectedDocsComercialONonCommercialComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null){

            let result: any = this._localStorage.getFolderRejectedDataToStorage();
            if(result == null){
                this._get_liste_info_folder_rejected = [''];
            }else {
                this._get_liste_info_folder_rejected = result;
            }
        }

        this.editor_descriptions = new Editor();
    }

    close(){
        this._dialogRef.close('close');
    }

    sendMessage(){
        this._loading.start();
        if(this.data.type == "rejected"){
            let reject_data = this._localStorage.getFolderRejectedDataToStorage();
            const data = {
                evaluator_email: this.data.evaluator_email,
                evaluator_id: this.data.evaluator_id,
                evaluator_slug: this.data.evaluator_slug,
                object: this.object,
                message: this.html_descriptions,
                project_code: this.data.project_code,
                reject_data: reject_data,
                type: this.data.type,
                user_email: this.data.user_email,
                user_ref: this.data.user_ref
            }

            if(this.data.user_type == "TC-001"){
                this._request.setProjetCommercialCompletedDocsStatus(data).subscribe(
                    {
                        next: (response: any) => {
                            if (response.code == 200){
                                localStorage.removeItem('liste_folder_rejected');
                                this._message.successOperation(response);
                                this._loading.stop();
                                this._dialogRef.close('close');
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
                            }
                        }, error: (error: any) => {
                            this._loading.stop;
                            let _error = error.error;
                            if (error.status == 401 || _error.message == "Token has expired") {
                                localStorage.removeItem('Ramzan_Kadyrov');
                                this._coockie.delete('us_id');
                                this._coockie.delete('dragonFly');
                                this._message.tokenExpired();
                                this._router.navigateByUrl('/');
                                window.location.reload();
                            }
                        }
                    }
                );
            }
            if(this.data.user_type == "TC-002"){
                this._request.setProjetNonCommercialCompletedDocsStatus(data).subscribe(
                    {
                        next: (response: any) => {
                            if (response.code == 200){
                                localStorage.removeItem('liste_folder_rejected');
                                this._message.successOperation(response);
                                this._loading.stop();
                                this._dialogRef.close('close');
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
                            }
                        }, error: (error: any) => {
                            this._loading.stop;
                            let _error = error.error;
                            if (error.status == 401 || _error.message == "Token has expired") {
                                localStorage.removeItem('Ramzan_Kadyrov');
                                this._coockie.delete('us_id');
                                this._coockie.delete('dragonFly');
                                this._message.tokenExpired();
                                this._router.navigateByUrl('/');
                                window.location.reload();
                            }
                        }
                    }
                );
            }
        }
        if(this.data.type == "validated"){
            const data = {
                evaluator_email: this.data.evaluator_email,
                evaluator_id: this.data.evaluator_id,
                evaluator_slug: this.data.evaluator_slug,
                object: this.object,
                message: this.html_descriptions,
                project_code: this.data.project_code,
                type: this.data.type,
                user_email: this.data.user_email,
                user_ref: this.data.user_ref
            }
            if(this.data.user_type == "TC-001"){
                this._request.setProjetCommercialCompletedDocsStatus(data).subscribe(
                    {
                        next: (response: any) => {
                            if (response.code == 200) {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this._dialogRef.close('close');
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
                            }
                        }, error: (error: any) => {
                            this._loading.stop;
                            let _error = error.error;
                            if (error.status == 401 || _error.message == "Token has expired") {
                                localStorage.removeItem('Ramzan_Kadyrov');
                                this._coockie.delete('us_id');
                                this._coockie.delete('dragonFly');
                                this._message.tokenExpired();
                                this._router.navigateByUrl('/');
                                window.location.reload();
                            }
                        }
                    }
                );
            }
            if(this.data.user_type == "TC-002"){
                this._request.setProjetNonCommercialCompletedDocsStatus(data).subscribe(
                    {
                        next: (response: any) => {
                            if (response.code == 200) {
                                this._message.successOperation(response);
                                this._loading.stop();
                                this._dialogRef.close('close');
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
                            }
                        }, error: (error: any) => {
                            this._loading.stop;
                            let _error = error.error;
                            if (error.status == 401 || _error.message == "Token has expired") {
                                localStorage.removeItem('Ramzan_Kadyrov');
                                this._coockie.delete('us_id');
                                this._coockie.delete('dragonFly');
                                this._message.tokenExpired();
                                this._router.navigateByUrl('/');
                                window.location.reload();
                            }
                        }
                    }
                );
            }
        }
    }

}
