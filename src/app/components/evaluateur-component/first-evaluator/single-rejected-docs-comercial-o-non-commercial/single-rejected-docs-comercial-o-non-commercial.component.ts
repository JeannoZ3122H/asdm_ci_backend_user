import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';

import {
  Editor,
  schema,
  Toolbar,
} from 'ngx-editor';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-single-rejected-docs-comercial-o-non-commercial',
  templateUrl: './single-rejected-docs-comercial-o-non-commercial.component.html',
  styleUrls: ['./single-rejected-docs-comercial-o-non-commercial.component.css']
})
export class SingleRejectedDocsComercialONonCommercialComponent implements OnInit{

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
    public libelle_doc: string = '';

    constructor(
        private _localStorage: CustomerStorageService,
        @Inject(MAT_DIALOG_DATA)
        public data: any, private _dialogRef: MatDialogRef<SingleRejectedDocsComercialONonCommercialComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null){
            this.libelle_doc = this.data.project_docs_name;
            let result: any = this._localStorage.getFolderRejectedDataToStorage();
            if(result == null){
                this._get_liste_info_folder_rejected = [];
            }else {
                this._get_liste_info_folder_rejected = result;
            }
        }

        this.editor_descriptions = new Editor();
    }

    close(){
        this._dialogRef.close('close');
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** EVENTS FOR ANALYSE STEP 1
        // store document status data to ls
        storeToLs(){
            this._get_liste_info_folder_rejected = this._get_liste_info_folder_rejected.concat({id: this._get_liste_info_folder_rejected.length+1, motif: this.html_descriptions, folder_label: this.libelle_doc});
            let send_data: string = this._localStorage.setFolderRejectedDataToStorage(this._get_liste_info_folder_rejected);
            if(send_data == 'good'){
               this._dialogRef.close('good');
            }
        }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

}
