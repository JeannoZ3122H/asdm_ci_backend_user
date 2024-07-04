import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  SecondEvaluatorService,
} from 'src/app/services/request/evaluator-request/second-evaluator/second-evaluator.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-add-documents-conventions-base',
  templateUrl: './add-documents-conventions-base.component.html',
  styleUrls: ['./add-documents-conventions-base.component.css']
})
export class AddDocumentsConventionsBaseComponent implements OnInit{

    public file!: File;
    public project_type: string = '';
    public user_email: string = '';
    public current_project: string = '';
    public code_enter: string = '';
    public is_direct_add: boolean = false;
    public is_indirect_add: boolean = false;
    public is_good_enter_code: boolean = false;
    public is_bad_enter_code: boolean = false;
    public project_data: any = {};

    constructor(
        private _message: MessageService,
        private _request: SecondEvaluatorService,
        private _request_project: ProjetsService,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _coockie: CookieService,
        private _router: Router, @Inject(MAT_DIALOG_DATA)
        public data: any, private _dialogRef: MatDialogRef<AddDocumentsConventionsBaseComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null){
            if(this.data.time == 'is_direct_add'){
                this.is_direct_add = true;
                this.is_indirect_add = false;
                this.current_project = this.data.project_code;
            }
            if(this.data.time == 'is_indirect_add'){
                this.is_direct_add = false;
                this.is_indirect_add = true;
            }
        }
    }

    close(){
        this._dialogRef.close('close');
    }

    checkIfExistProjectByCode(){
        if(this.code_enter == ''){
            this._message.errorField();
            return
        }
        this._loading.start();
        if(this.project_type == 'help'){
            this._request_project.getGlobalProjetHelpDetails(this.code_enter).subscribe(
                {
                    next: (response: any) =>{
                        if(response != null || undefined){
                            let data = response.project_data;
                            this.is_good_enter_code = true;
                            this.current_project = data.project_code;
                            this.project_data = data;
                            this.user_email = response.user_email;
                            this.is_bad_enter_code = false;
                            this._loading.stop();
                        }else{
                            this.is_good_enter_code = false;
                            this.is_bad_enter_code = true;
                            this._loading.stop();
                        }
                    }, error: (error: any) => {
                        this._loading.stop();
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
            )
        }

        if(this.project_type == 'subvention'){
            this._request_project.getGlobalProjetDetails(this.code_enter).subscribe(
                {
                    next: (response: any) =>{
                        if(response != null || undefined){
                            let data = response.project_data;
                            this.is_good_enter_code = true;
                            this.current_project = data.project_code;
                            this.project_data = data;
                            this.user_email = response.user_email;
                            this.is_bad_enter_code = false;
                            this._loading.stop();
                        }else{
                            this.is_good_enter_code = false;
                            this.is_bad_enter_code = true;
                            this._loading.stop();
                        }
                    }, error: (error: any) => {
                        this._loading.stop();
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
            )
        }
    }
    // status choice type project
    status(e: any){
        this.project_type = e.value;
    }
    // upload file
    uploadFile(e: any){
        this.file = e.target.files[0];
    }
    // send data
    send(){
        this._loading.start();
        let ev_data = this._localStorage.getDataToStorage();
        const formData = new FormData();
        formData.append('instructeur_id', ev_data.id);
        formData.append('document_convention', this.file);
        formData.append('project_code', this.current_project);
        formData.append('user_email', this.data.user_email == undefined?this.user_email:this.data.user_email);
        formData.append('user_ref', this.data.user_ref == undefined?this.project_data.user_ref:this.data.user_ref);
        this._request.setDocumentConventionByEvaluator(formData).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200){
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

    initProjectCodeBadEnter(){
        this._loading.start();
        setTimeout(() => {
            this.is_bad_enter_code = false;
            this.is_good_enter_code = false;
            this._loading.stop();
        }, 500);
    }
}
