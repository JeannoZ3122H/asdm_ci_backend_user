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
  SecondEvaluatorService,
} from 'src/app/services/request/evaluator-request/second-evaluator/second-evaluator.service';

@Component({
  selector: 'app-update-comments-by-element',
  templateUrl: './update-comments-by-element.component.html',
  styleUrls: ['./update-comments-by-element.component.css']
})
export class UpdateCommentsByElementComponent implements OnInit{

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
    public html_comments: string = '';
    public element: string = '';
    public editor_comments: any = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    public object: string = '';
    public element_data_type: string = '';

    constructor(
        private _message: MessageService,
        private _request: SecondEvaluatorService,
        private _loading: NgxUiLoaderService,
        private _coockie: CookieService,
        private _router: Router, @Inject(MAT_DIALOG_DATA)
        public data: any, private _dialogRef: MatDialogRef<UpdateCommentsByElementComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null){
            let old_data = this.data.element_data;
            this.html_comments = old_data.element_comments;
            this.element_data_type = old_data.element;
            this.checkElementForGetOriginsName(this.data.element_data);
        }

        this.editor_comments = new Editor();
    }

    close(){
        this._dialogRef.close('close');
    }


// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    send(){
        this._loading.start();
        //
        if(this.element_data_type == 'objet_projet'){
            const data = {
                comments_objet_projet: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToProjectData(data).subscribe(
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
        if(this.element_data_type == 'description_projet'){
            const data = {
                comments_description_projet: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToProjectData(data).subscribe(
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
        if(this.element_data_type == 'justification_projet'){
            const data = {
                comments_justification_projet: this.html_comments,
                project_code: this.data.project_code,
                type: 'justification'
            }
            this._request.setOrUpdateCommentsToProjectData(data).subscribe(
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
        if(this.element_data_type == 'objectif_general'){
            const data = {
                comments_objectif_general: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToProjectData(data).subscribe(
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
        //
        if(this.element_data_type == 'objectif_specifique'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToObjectifSpecifique(data).subscribe(
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
        //
        if(this.element_data_type == 'resultat_attendus'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToResultatAttendus(data).subscribe(
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
        //
        if(this.element_data_type == 'beneficiaire_project'){
            const data = {
                comments: this.html_comments,
                project_code: this.data.project_code,
                type: 'beneficiaire'
            }
            this._request.setOrUpdateCommentsToBeneficiaire(data).subscribe(
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
        //
        if(this.element_data_type == 'impact_business'){
            const data = {
                comments_impact_business: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToImpact(data).subscribe(
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
        if(this.element_data_type == 'impact_secteur_medias'){
            const data = {
                comments_impact_secteur_medias: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToImpact(data).subscribe(
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
        if(this.element_data_type == 'impact_sous_secteur'){
            const data = {
                comments_impact_sous_secteur: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToImpact(data).subscribe(
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
        if(this.element_data_type == 'indicateurs'){
            const data = {
                comments_indicateurs: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToImpact(data).subscribe(
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
        //
        if(this.element_data_type == 'strengths'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: 'strength'
            }
            this._request.setOrUpdateCommentsToSwotForce(data).subscribe(
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
        if(this.element_data_type == 'weakness'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToSwotFaiblesse(data).subscribe(
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
        if(this.element_data_type == 'opportunity'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToSwotOpportunite(data).subscribe(
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
        if(this.element_data_type == 'threats'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToSwotMenace(data).subscribe(
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
        //
        if(this.element_data_type == 'besoin_exprimer'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: 'besions_exprime'
            }
            this._request.setOrUpdateCommentsToBesoin(data).subscribe(
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
        if(this.element_data_type == 'recap_besoin_exprime'){
            const data = {
                comments: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToRecarpBesoin(data).subscribe(
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
        if(this.element_data_type == 'planning'){
            const data = {
                comments_mise_en_oeuvre: this.html_comments,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToMiseOeuvre(data).subscribe(
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

        if(this.element_data_type == 'piece_jointe'){
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.element_data_type
            }
            this._request.setOrUpdateCommentsToPiecesJointes(data).subscribe(
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
    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //


// 😇😇 ************************************************ //
// ****************** START FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
    // check element for get origin name
    checkElementForGetOriginsName(data: any){
        //
        if(data.element == 'objet_projet'){
            this.element = "Objet du projet";
        }
        if(data.element == 'description_projet'){
            this.element = "Description du projet";
        }
        if(data.element == 'justification_projet'){
            this.element = "Justification du projet";
        }
        if(data.element == 'objectif_general'){
            this.element = "Objectif général du projet";
        }
        //
        if(data.element == 'objectif_specifique'){
            this.element = "Objectif spécifique";
        }
        //
        if(data.element == 'resultat_attendus'){
            this.element = "Résultats attendus";
        }
        //
        if(data.element == 'beneficiaire_project'){
            this.element = "Bénéficiaires du projet";
        }
        //
        if(data.element == 'impact_business'){
            this.element = "Impacts du projet pour l'"+this.data.type_category_code == 'TC-001'?'entreprise':'organisation';
        }
        if(data.element == 'impact_secteur_medias'){
            this.element = "Impacts du projet pour le secteur des médias";
        }
        if(data.element == 'impact_sous_secteur'){
            this.element = "Impacts du projet Pour le sous-secteur";
        }
        if(data.element == 'indicateurs'){
            this.element = "Indicateurs";
        }
        //
        if(data.element == 'strengths'){
            this.element = "ANALYSE SWOT (Forces)";
        }
        if(data.element == 'weakness'){
            this.element = "ANALYSE SWOT (Faiblesses)";
        }
        if(data.element == 'opportunity'){
            this.element = "ANALYSE SWOT (Opportunités)";
        }
        if(data.element == 'threats'){
            this.element = "ANALYSE SWOT (Menaces)";
        }
        //
        if(data.element == 'besoin_exprimer'){
            this.element = "BESOINS EXPRIMÉS";
        }
        if(data.element == 'recap_besoin_exprime'){
            this.element = "RÉCAPITULATIF";
        }
        if(data.element == 'planning'){
            this.element = "MISE EN ŒUVRE DU PROJET";
        }

        if(data.element == 'piece_jointe'){
            this.element = "pièces justificatives";
        }
    }

    // 😇😇 ************************************************ //
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //


}
