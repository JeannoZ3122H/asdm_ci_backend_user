import {
  Component,
  Inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  CategoryDocsService,
} from 'src/app/services/request/category-docs/category-docs.service';
import {
  DocsFournirService,
} from 'src/app/services/request/docs-fournir/docs-fournir.service';

@Component({
  selector: 'app-add-docs-fournir',
  templateUrl: './add-docs-fournir.component.html',
  styleUrls: ['./add-docs-fournir.component.css']
})
export class AddDocsFournirComponent {

    public is_update: boolean = false;
    public category_docs_exists: boolean = false;

    public _liste_category_docs: any = [];

    public document_name: string = '';
    public type_category_document_code: string = '';
    public type_category_document_name: string = '';
    public document_name_id: number = 0;
    public document_name_slug: string = '';

    constructor(
        private _message: MessageService,
        private _request: DocsFournirService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        private _request_category: CategoryDocsService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddDocsFournirComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.type_category_document_name = this.data.type_document_name;
            this.type_category_document_code = this.data.type_category_document_code;
            this.document_name_id = this.data.id;
            this.document_name_slug = this.data.slug;
            this.document_name = this.data.document_name;
        }

        this.getListeCategoryDocs();
    }

    getListeCategoryDocs(){
        this._request_category.get().subscribe(
            {
                next: (response: any) =>{
                    console.log(response)
                    this._liste_category_docs = response;
                },
                error: (error: any)=>{
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        );
    }

    chooseCategory(e: any){
        let data = e.value;
        if(e){
            this.type_category_document_code = data.type_category_document_code;
            this.category_docs_exists = true;
        }else{
            this.category_docs_exists = false;
        }
    }

    save(){
        this._loading.start();
        const data = {
            document_name: this.document_name,
            type_category_document_code: this.type_category_document_code,
        }
        this._request.store(data).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this._dialogRef.close(true);
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        )
    }

    update(){
        this._loading.start();
        const data = {
            document_name: this.document_name
        }
        this._request.update(this.document_name_slug, data).subscribe(
            {
                next: (response: any )=>{
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this._dialogRef.close(true);
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },error: (error: any)=>{
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        )
    }

}
