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
  CategoryDocsService,
} from 'src/app/services/request/category-docs/category-docs.service';
import {
  CategoryService,
} from 'src/app/services/request/category/category.service';
import {
  TypeCategoryService,
} from 'src/app/services/request/type-category/type-category.service';

@Component({
  selector: 'app-add-category-docs',
  templateUrl: './add-category-docs.component.html',
  styleUrls: ['./add-category-docs.component.css']
})
export class AddCategoryDocsComponent implements OnInit{
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

    public category_name: string = '';
    public html_description: string = '';
    public category_id: string = '';
    public type_document_name: string = '';
    public type_category_code: string = '';
    public type_category: string = '';
    public type_category_name: string = '';
    public item_id: number = 0;
    public item_slug: number = 0;
    public type_category_id: number = 0;
    public is_update: boolean = false;
    public editor_description = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    public _liste_type_category: any = [];
    public _liste_category: any = [];

    constructor(
        private _message: MessageService,
        private _request: CategoryDocsService,
        private _loading: NgxUiLoaderService,
        private _request_type_category: TypeCategoryService,
        private _router: Router,
        private _request_category: CategoryService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddCategoryDocsComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.category_name = this.data.category_name;
            this.type_document_name = this.data.type_document_name;
            this.type_category_name = this.data.type_category_name;
            this.type_category_code = this.data.code_unique;
            this.category_id = this.data.category_id;
            this.html_description = this.data.description;
            this.item_id = this.data.id;
            this.item_slug = this.data.slug;


            this.getListeCategory(this.data.type_category_id);
            // type_category_id
        }

        this.getListeTypecategory();
    }

    getListeTypecategory(){
        this._request_type_category.getListeTypeCategory().subscribe(
            {
                next: (response: any) =>{
                    this._liste_type_category = response;
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
        )
    }

    getListeCategory(id: number){
        this._request_category.getListeCategoryByTypeCategory(id).subscribe(
            {
                next: (response: any) =>{
                    this._liste_category = response;
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
        )
    }

    chooseTypeCategory(e: any){
        let data = e.value;
        this.getListeCategory(data.id);
    }

    chooseCategory(e: any){
        let data = e.value;
        this.category_id = data.id;
        this.type_category_id = data.type_category_id;
        this.type_category_code = data.code_unique;
    }

    save(){
        this._loading.start();
        const data = {
            category_id: this.category_id,
            description: this.html_description,
            type_category_code: this.type_category_code,
            type_document_name: this.type_document_name
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
            category_id: this.category_id,
            description: this.html_description,
            type_category_code: this.type_category_code,
            type_document_name: this.type_document_name
        }
        this._request.update(this.item_slug, data).subscribe(
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
