import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  DeleteModalComponent,
} from 'src/app/components/actions/delete-modal/delete-modal.component';
import {
  AddDocumentsConventionsBaseComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/add-documents-conventions-base/add-documents-conventions-base.component';
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
  selector: 'app-documents-conventions-base',
  templateUrl: './documents-conventions-base.component.html',
  styleUrls: ['./documents-conventions-base.component.css']
})
export class DocumentsConventionsBaseComponent implements OnInit{

    public p: number = 1;
    public is_edit: boolean = false;
    public evaluator: any = {};
    public _liste: any = [];
    public user_ref: string = '';
    public current_project: string = '';
    public document_slug: string = '';
    public file!: File;

    constructor(
        private _dialog: MatDialog,
        private _request: SecondEvaluatorService,
        private _router: Router,
        private _message: MessageService,
        private _loading: NgxUiLoaderService,
        private _localeStorage: CustomerStorageService,
        private _coockieService: CookieService
    ) {

    }

    ngOnInit() {
       this.evaluator = this._localeStorage.getDataToStorage();
        this.getAll();
    }

    getAll() {
        this._request.getDocumentConventionByEvaluator(this.evaluator.id).subscribe(
            {
                next: (response: any) => {
                    console.log(response)
                    this._liste = response;
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

    sendDocumentConvention(data: any){
        Object.assign(data, {time:'is_indirect_add'});
        const dialogRef = this._dialog.open(AddDocumentsConventionsBaseComponent,
        {
            width: '60%',
            height: 'auto',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'close') {
                    this.getAll();
                }
            },
        });
    }

    sendUpdateDocumentConvention(){
        this._loading.start();
        const formData = new FormData();
        formData.append('instructeur_id', this.evaluator.id);
        formData.append('document_convention', this.file);
        formData.append('project_code', this.current_project);
        formData.append('user_ref', this.user_ref);
        this._request.updateDocumentConventionByEvaluator(formData, this.document_slug).subscribe(
            {
                next: (response: any) => {
                    if (response.code == 200){
                        this.is_edit = false;
                        this._message.successOperation(response);
                        this._loading.stop();
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                }, error: (error: any) => {
                    this._loading.stop;
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockieService.delete('us_id');
                        this._coockieService.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        );
    }

    update(data: any){
        this.is_edit = true;
        this.document_slug = data.slug;
        this.user_ref = data.user_ref;
        this.current_project = data.project_code;
    }

    // upload file
    uploadFile(e: any){
        this.file = e.target.files[0];
    }

    deleteDocumentConventionByEvaluator(slug: any){
        const dialogRef = this._dialog.open(DeleteModalComponent, {width: 'auto'});
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'confirm') {
                   this._request.deleteDocumentConventionByEvaluator(slug).subscribe(
                    {
                        next: (response: any)=>{
                            if (response.code == 200) {
                                setTimeout(() => {
                                    this._message.successOperation(response);
                                    this._loading.stop();
                                    this.getAll();
                                }, 1000);
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
                            }
                        },
                        error: (error: any)=>{
                            this._loading.stop;
                            let _error = error.error;
                            if (error.status == 401 || _error.message == "Token has expired") {
                                localStorage.removeItem('Ramzan_Kadyrov');
                                this._coockieService.delete('us_id');
                                this._coockieService.delete('dragonFly');
                                this._message.tokenExpired();
                                this._router.navigateByUrl('/');
                                window.location.reload();
                            }
                        }
                    }
                   )
                }
            },
        });
    }
}
