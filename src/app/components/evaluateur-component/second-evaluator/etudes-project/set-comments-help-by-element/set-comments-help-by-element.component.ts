import {
  Component,
  Inject,
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
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
    selector: 'app-set-comments-help-by-element',
    templateUrl: './set-comments-help-by-element.component.html',
    styleUrls: ['./set-comments-help-by-element.component.css']
})
export class SetCommentsHelpByElementComponent {

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

    public _get_liste_info_folder_rejected: any = [];

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

    constructor(
        private _message: MessageService,
        private _request: SecondEvaluatorService,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _coockie: CookieService,
        private _router: Router, @Inject(MAT_DIALOG_DATA)
        public data: any, private _dialogRef: MatDialogRef<SetCommentsHelpByElementComponent>,
    ) { }

    ngOnInit() {
        if (this.data != null) {
            // console.log(this.data);
            this.checkElementForGetOriginsName();
        }

        this.editor_comments = new Editor();
    }

    close() {
        this._dialogRef.close('close');
    }


    // 😇😇 ************************************************ //
    // ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    send() {
        this._loading.start();
        //
        if (this.data.element == 'objet_projet') {
            const data = {
                comments_objet_projet: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToProjectData(data).subscribe(
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
        if (this.data.element == 'description_projet') {
            const data = {
                comments_description_projet: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToProjectData(data).subscribe(
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
        if (this.data.element == 'justification_projet') {
            const data = {
                comments_justification_projet: this.html_comments,
                project_code: this.data.project_code,
                type: 'justification'
            }
            this._request.setOrUpdateCommentsHelpToProjectData(data).subscribe(
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
        if (this.data.element == 'objectif_general') {
            const data = {
                comments_objectif_general: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToProjectData(data).subscribe(
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
        //
        if (this.data.element == 'objectif_specifique') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToObjectifSpecifique(data).subscribe(
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
        //
        if (this.data.element == 'details_request') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsToDetailsRequest(data).subscribe(
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
        //
        if (this.data.element == 'condition_financement') {
            const data = {
                comments: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsToConditionFinancement(data).subscribe(
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
        //
        if (this.data.element == 'impact_business') {
            const data = {
                comments_impact_business: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToImpact(data).subscribe(
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
        if (this.data.element == 'impact_secteur_medias') {
            const data = {
                comments_impact_secteur_medias: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToImpact(data).subscribe(
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
        if (this.data.element == 'impact_sous_secteur') {
            const data = {
                comments_impact_sous_secteur: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToImpact(data).subscribe(
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
        if (this.data.element == 'indicateur_performance_projet') {
            const data = {
                comments: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            console.log('s', data)
            this._request.setOrUpdateCommentsToIndicateurPerformance(data).subscribe(
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
        //
        if (this.data.element == 'strengths') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: 'strength'
            }
            this._request.setOrUpdateCommentsHelpToSwotForce(data).subscribe(
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
        if (this.data.element == 'weakness') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToSwotFaiblesse(data).subscribe(
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
        if (this.data.element == 'opportunity') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToSwotOpportunite(data).subscribe(
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
        if (this.data.element == 'threats') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToSwotMenace(data).subscribe(
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

        if (this.data.element == 'piece_just') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToPiecesJointes(data).subscribe(
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

        if (this.data.element == 'plan_financement') {
            const data = {
                comments: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsToPlanFinancement(data).subscribe(
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
        //
        if (this.data.element == 'etude_financiere') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsToEtudeFinanciere(data).subscribe(
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
        //
        if (this.data.element == 'performance_anterieure') {
            const data = {
                comments: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsToPerformanceAnterieure(data).subscribe(
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
        //
        if (this.data.element == 'encours_endettement') {
            const data = {
                encours_endettement_comments: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            console.log(data)
            this._request.setOrUpdateCommentsToEncoursEndettement(data).subscribe(
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
        //
        if (this.data.element == 'performance_projet') {
            const data = {
                comments: this.html_comments,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsToPerformanceProject(data).subscribe(
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
        //
        if (this.data.element == 'contre_analyse_swot_force_comments') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToSwotContreForce(data).subscribe(
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
        //
        if (this.data.element == 'contre_analyse_swot_faiblesse_comments') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToSwotContreFaiblesse(data).subscribe(
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
        //
        if (this.data.element == 'contre_analyse_swot_opportunite_comments') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToSwotContreOpportunite(data).subscribe(
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
        //
        if (this.data.element == 'contre_analyse_swot_menace_comments') {
            const data = {
                comments: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToSwotContreMenace(data).subscribe(
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
        //
        if (this.data.element == 'planning') {
            const data = {
                comments_planning: this.html_comments,
                items_slug: this.data.data.slug,
                project_code: this.data.project_code,
                type: this.data.element
            }
            this._request.setOrUpdateCommentsHelpToPlanning(data).subscribe(
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
    // 😇😇 ************************************************ //
    // ****************** END FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //


    // 😇😇 ************************************************ //
    // ****************** START FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
    // check element for get origin name
    checkElementForGetOriginsName() {
        //
        if (this.data.element == 'objet_projet') {
            this.element = "Objet du projet";
        }
        if (this.data.element == 'description_projet') {
            this.element = "Description du projet";
        }
        if (this.data.element == 'justification_projet') {
            this.element = "Justification du projet";
        }
        if (this.data.element == 'objectif_general') {
            this.element = "Objectif général du projet";
        }
        //
        if (this.data.element == 'objectif_specifique') {
            this.element = "Objectif spécifique";
        }
        //
        if (this.data.element == 'impact_business') {
            this.element = "Impacts du projet pour l'" + this.data.type_category_code == 'TC-001' ? 'entreprise' : 'organisation';
        }
        if (this.data.element == 'impact_secteur_medias') {
            this.element = "Impacts du projet pour le secteur";
        }
        if (this.data.element == 'impact_sous_secteur') {
            this.element = "Impacts du projet Pour le sous-secteur";
        }
        if (this.data.element == 'indicateur_performance_projet') {
            this.element = "Indicateur de performance du projet";
        }
        //
        if (this.data.element == 'strengths') {
            this.element = "ANALYSE SWOT (Forces)";
        }
        if (this.data.element == 'weakness') {
            this.element = "ANALYSE SWOT (Faiblesses)";
        }
        if (this.data.element == 'opportunity') {
            this.element = "ANALYSE SWOT (Opportunités)";
        }
        if (this.data.element == 'threats') {
            this.element = "ANALYSE SWOT (Menaces)";
        }
        //
        if (this.data.element == 'contre_analyse_swot_force_comments') {
            this.element = "CONtre ANALYSE SWOT (Forces)";
        }
        if (this.data.element == 'contre_analyse_swot_faiblesse_comments') {
            this.element = "CONTRe ANALYSE SWOT (Faiblesses)";
        }
        if (this.data.element == 'contre_analyse_swot_opportunite_comments') {
            this.element = "CONTRE ANALYSE SWOT (Opportunités)";
        }
        if (this.data.element == 'contre_analyse_swot_menace_comments') {
            this.element = "CONTRE ANALYSE SWOT (Menaces)";
        }
        //
        if (this.data.element == 'planning') {
            this.element = "MISE EN ŒUVRE DU PROJET";
        }
        //
        if (this.data.element == 'piece_just') {
            this.element = "pièces justificatives";
        }
        //
        if (this.data.element == 'details_request') {
            this.element = "Détail de la requête";
        }
        //
        if (this.data.element == 'condition_financement') {
            this.element = "Condition de financement";
        }
        //
        if (this.data.element == 'plan_financement') {
            this.element = "Plan de financement";
        }
        //
        if (this.data.element == 'encours_endettement') {
            this.element = "Encours d'endettement du projet";
        }
        //
        if (this.data.element == 'performance_projet') {
            this.element = "Performances du projet";
        }
        //
        if (this.data.element == 'performance_anterieure') {
            this.element = "Performances antérieure du projet";
        }
        //
        if (this.data.element == 'etude_financiere') {
            this.element = "Etude finacière du projet";
        }
        //
        if (this.data.element == 'plan_financement') {
            this.element = "Plan de financement";
        }
        //
        if (this.data.element == 'plan_financement') {
            this.element = "Plan de financement";
        }
    }

    // 😇😇 ************************************************ //
    // ****************** END FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //

}
