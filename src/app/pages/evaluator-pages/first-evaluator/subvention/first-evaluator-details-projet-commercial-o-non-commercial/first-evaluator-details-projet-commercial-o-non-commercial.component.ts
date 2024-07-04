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
import {
  Editor,
  schema,
  Toolbar,
} from 'ngx-editor';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  CompletedRejectDocsComercialONonCommercialComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/completed-reject-docs-comercial-o-non-commercial/completed-reject-docs-comercial-o-non-commercial.component';
import {
  SingleRejectedDocsComercialONonCommercialComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/single-rejected-docs-comercial-o-non-commercial/single-rejected-docs-comercial-o-non-commercial.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-first-evaluator-details-projet-commercial-o-non-commercial',
  templateUrl: './first-evaluator-details-projet-commercial-o-non-commercial.component.html',
  styleUrls: ['./first-evaluator-details-projet-commercial-o-non-commercial.component.css']
})
export class FirstEvaluatorDetailsProjetCommercialONonCommercialComponent implements OnInit{
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

    // var for analyse doc
    public is_step_one_good_end: boolean = false;
    public is_step_one_no_good_end: boolean = false;

// var for decrets
    public isLinear: boolean = true;
    public is_init_page: boolean = false;
    // var first decret
    public status_first_decret: string = '';
    public isOneYes: boolean = false;
    public isOneNo: boolean = false;
    public isFirstDecretStatus: string = '';
    public html_first_decret: string = '';
    public editor_first_decret = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // var second decret
    public status_second_decret: string = '';
    public isSecondYes: boolean = false;
    public isSecondNo: boolean = false;
    public isSecondDecretStatus: string = '';
    public html_second_decret: string = '';
    public editor_second_decret = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });
    // var third decret
    public status_third_decret: string = '';
    public isThirdYes: boolean = false;
    public isThirdNo: boolean = false;
    public isThirdDecretStatus: string = '';
    public html_third_decret: string = '';
    public editor_third_decret = new Editor({
        content: '',
        plugins: [],
        schema,
        nodeViews: {},
        history: true,
        keyboardShortcuts: true,
        inputRules: true,
    });

    public good_send_rejected_mail: boolean = false;

    // var details
    public swot_opportunity: any = [];
    public swot_menace: any = [];
    public swot_force: any = [];
    public swot_faiblesse: any = [];
    public recap_besoin_exprime: any = [];
    public resultat_attendus: any = [];
    public planning: any = [];
    public piece_jointe: any = [];
    public objectif_specifique: any = [];
    public mise_en_oeuvre: any = {};
    public beneficiaire: any = {};
    public impact_project: any = {};
    public besoin_exprimer: any = [];
    public fonctionnement_data: any = [];
    public doc_list: any = [];
    public project_data: any = {};
    public ev_data: any = {};
    public user_email: string = '';

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _request_ev: FirstEvaluatorService,
        private _router: Router,
        private _route_active: ActivatedRoute,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private _location: Location,
        private sanitizer: DomSanitizer,
        private _dialog: MatDialog,
        private _coockie: CookieService
    ){}

    ngOnInit() {
        this.ev_data = this._localStorage.getDataToStorage();

        this.getOldAnalyseDataToLs();

        this.getProjetDetails();

        this.editor_first_decret = new Editor();
        this.editor_second_decret = new Editor();
        this.editor_third_decret = new Editor();

    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** GET DETAILS PROJECT
        // get info by project
        getProjetDetails(){
            let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');
            // console.log(get_projet_code_encrypt)
            this._request_ev.getProjetDetails(get_projet_code_encrypt, this.ev_data.id).subscribe(
                {
                    next: (response: any)=>{

                        this.project_data = response.project_data;
                        this.doc_list = response.doc_list;
                        this.planning = response.planning;
                        this.piece_jointe = response.piece_jointe;
                        this.objectif_specifique = response.objectif_specifique;
                        this.mise_en_oeuvre = response.mise_en_oeuvre;
                        this.fonctionnement_data = response.fonctionnement_data;
                        this.besoin_exprimer = response.besoin_exprimer;

                        this.impact_project = response.impact_project;
                        this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                        this.impact_project.impact_secteur_medias = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur_medias);
                        this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);
                        this.impact_project.indicateurs = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.indicateurs);

                        this.beneficiaire = response.beneficiaire;
                        this.beneficiaire.beneficiaire_directs = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_directs);
                        this.beneficiaire.beneficiaire_indirects = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_indirects);


                        this.recap_besoin_exprime = response.recap_besoin_exprime;
                        this.resultat_attendus = response.resultat_attendus;
                        this.swot_faiblesse = response.swot_faiblesse;
                        this.swot_force = response.swot_force;
                        this.swot_menace = response.swot_menace;
                        this.swot_opportunity = response.swot_opportunity;

                        this.user_email = response.user_email;

                        setTimeout(()=>{
                            this.checkDocumentListStatus();
                        }, 2000)

                        this._loading.stop();
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
            );
        }
    // 😇😇 **** STORE DOCS
        // store single document validate
        singleValidateDoc(data: any){
            this._loading.start();
            if(this.project_data.type_category_code == "TC-001"){
                this._request_ev.setProjetCommercialSingleDocsStatusValidate(this.project_data.project_code, data.id).subscribe(
                    {
                        next: (response: any)=>{
                            if(response.code == 200){
                                this._message.successOperation(response);
                                setTimeout(() => {
                                    this.getProjetDetails();
                                    this._loading.stop();
                                }, 1000);
                            }else{
                                this._message.error({status: 'Erreur', message: 'Quelque s\'est mal passé. veuillez réessayer !'})
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
            if(this.project_data.type_category_code == "TC-002"){
                this._request_ev.setProjetNonCommercialSingleDocsStatusValidate(this.project_data.project_code, data.id).subscribe(
                    {
                        next: (response: any)=>{
                            if(response.code == 200){
                                this._message.successOperation(response);
                                setTimeout(() => {
                                    this.getProjetDetails();
                                    this._loading.stop();
                                }, 1000);
                            }else{
                                this._message.error({status: 'Erreur', message: 'Quelque s\'est mal passé. veuillez réessayer !'})
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
        // completed all document rejected or validated
        setProjetCompletedDocStatus(type: string){
            if(type == 'validated'){
                const data = {
                    evaluator_email: this.ev_data.email,
                    evaluator_id: this.ev_data.id,
                    evaluator_slug: this.ev_data.slug,
                    project_code: this.project_data.project_code,
                    type: type,
                    user_email: this.user_email,
                    user_ref: this.project_data.user_ref,
                    user_type: this.project_data.type_category_code
                }
                this.good_send_rejected_mail = false;
                const dialogRef = this._dialog.open(CompletedRejectDocsComercialONonCommercialComponent,
                {
                    width: '60%',
                    height: '95vh',
                    data
                });
                dialogRef.afterClosed().subscribe({
                    next: (val: any) => {
                        if (val == 'close') {
                            this.getProjetDetails();
                        }
                    },
                });
            }

            if(type == "rejected"){
                this._loading.start();
                let reject_data = this._localStorage.getFolderRejectedDataToStorage();
                const data = {
                    evaluator_email: this.ev_data.email,
                    evaluator_id: this.ev_data.id,
                    evaluator_slug: this.ev_data.slug,
                    object: 'Rejet de document fournis',
                    project_code: this.project_data.project_code,
                    reject_data: reject_data,
                    type: type,
                    user_email: this.user_email,
                    user_ref: this.project_data.user_ref
                }


            console.log('e', this.project_data.user_type)
                if(this.project_data.type_category_code == "TC-001"){
                    console.log('oc',data)
                    this._request_ev.setProjetCommercialCompletedDocsStatus(data).subscribe(
                        {
                            next: (response: any) => {
                                if (response.code == 200){
                                    localStorage.removeItem('liste_folder_rejected');
                                    this._message.successOperation(response);
                                    this._loading.stop();
                                    this.good_send_rejected_mail = true;
                                } else if (response.code == 302 || response.code == 300) {
                                    this._loading.stop();
                                    this._message.error(response);
                                    this.good_send_rejected_mail = false;
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
                if(this.project_data.type_category_code == "TC-002"){
                    console.log('onc',data)
                    this._request_ev.setProjetNonCommercialCompletedDocsStatus(data).subscribe(
                        {
                            next: (response: any) => {
                                if (response.code == 200){
                                    localStorage.removeItem('liste_folder_rejected');
                                    this._message.successOperation(response);
                                    this._loading.stop();
                                    this.good_send_rejected_mail = true;
                                } else if (response.code == 302 || response.code == 300) {
                                    this._loading.stop();
                                    this._message.error(response);
                                    this.good_send_rejected_mail = false;
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
        // store single document validate
        singleRejectDocSend(data: any){
            this._loading.start();
            if(this.project_data.type_category_code == "TC-001"){
                this._request_ev.setProjetCommercialSingleDocsStatusReject(this.project_data.project_code, data.id).subscribe
                (
                    {
                        next: (response: any) => {
                            if (response.code == 200) {
                                this.getProjetDetails();
                                this._loading.stop();
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
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
            if(this.project_data.type_category_code == "TC-002"){
                this._request_ev.setProjetNonCommercialSingleDocsStatusReject(this.project_data.project_code, data.id).subscribe
                (
                    {
                        next: (response: any) => {
                            if (response.code == 200) {
                                this.getProjetDetails();
                                this._loading.stop();
                            } else if (response.code == 302 || response.code == 300) {
                                this._loading.stop();
                                this._message.error(response);
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
    // 😇😇 **** STORE EVALUATION BY DECRETS
        // store evaluation
        storeEvEvaluationDecret(){

            if(
                (this.status_first_decret == '' || this.status_first_decret == undefined) ||
                (this.status_second_decret == '' || this.status_second_decret == undefined) ||
                (this.status_third_decret == '' || this.status_third_decret == undefined) ||
                (this.html_first_decret.length <= 7 || this.html_first_decret == undefined || this.html_first_decret == '') ||
                (this.html_second_decret.length <= 7 || this.html_second_decret == undefined || this.html_second_decret == '') ||
                (this.html_third_decret.length <= 7 || this.html_third_decret == undefined || this.html_third_decret == '')
            ){
                this._message.error({status: 'Erreur', message: 'Tous les champs de saisir son obligatoire. Merci !'});
                return
            }

            const data = {
                status_decrets: this.status_first_decret,
                decret_comments: this.html_first_decret,
                status_decrets_plan_strategie: this.status_second_decret,
                decrets_plan_strategie_comments: this.html_second_decret,
                status_decrets_plan_annuel: this.status_third_decret,
                decrets_plan_annuel_comments: this.html_third_decret,
                project_code: this.project_data.project_code,
                user_ref: this.project_data.user_ref
            }

            // return console.log('end', data)
            this._loading.start();
            this._request_ev.storeEvEvaluationDecret(data).subscribe(
                {
                    next: (response: any) => {
                        if (response.code == 200) {
                            localStorage.removeItem('s_d_first');
                            localStorage.removeItem('s_d_second');
                            localStorage.removeItem('s_d_third');
                            setTimeout(() => {
                                this.is_init_page = true;
                                this._message.successOperation(response);
                                this.getProjetDetails();
                                this._loading.stop();
                            }, 2000);
                        } else if (response.code == 302 || response.code == 300) {
                            this._loading.stop();
                            this._message.error(response);
                        }
                    }, error: (error: any) => {
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
    // 😇😇 ************************************************ //
// ****************** END FUNCTION REQUEST TO API ****************** //
// ************************************************ 😇😇😇😇 //

// 😇😇 ************************************************ //
// ****************** START FUNCTION EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
    // 😇😇 **** EVENTS FOR ANALYSE STEP 1
        // set single doc status to ls
        singleRejectDoc(data: any){
            const dialogRef = this._dialog.open(SingleRejectedDocsComercialONonCommercialComponent,
            {
                width: '60%',
                height: '95vh',
                data
            });
            dialogRef.afterClosed().subscribe({
                next: (val: any) => {
                    if (val == 'close') {
                        this.getProjetDetails();
                    }
                    if (val == 'good') {
                        this.singleRejectDocSend(data);
                    }
                },
            });
        }
        //check all document status in list
        checkDocumentListStatus(): any{
            let val_on: number = 0;
            let val_off: number = 0;
            this.doc_list.find((o: any, i: number) => {
                if ((o.status_on == 1 && o.status_off == 0)) {
                    val_on+=1;
                }else if(o.status_on == 0 && o.status_off == 1){
                    val_off+=1;
                }
            });
            if(val_on == this.doc_list.length){
                this.is_step_one_no_good_end = false;
                this.is_step_one_good_end = true;
            }else if(val_off >= 1 || (val_on+val_off == this.doc_list.length)){
                this.is_step_one_no_good_end = true;
                this.is_step_one_good_end = false;
            }
        }
    // 😇😇 **** EVENTS FOR ANALYSE STEP 2
        // set project analyse
        setProjetCompletedAnalyseStatus(){
            // Object.assign(data, {type_asigned:'asigned'});

            // if(this.project_data.type_category_code == "TC-001"){
            //     const dialogRef = this._dialog.open(AsignedProjetEvaluateurComponent,
            //     {
            //         panelClass: 'fullscreen-dialog',
            //         data
            //     });
            //     dialogRef.afterClosed().subscribe({
            //         next: (val: any) => {
            //             if (val == 'close') {
            //                 this.getProjetDetails();
            //             }
            //         },
            //     });
            // }

            // if(this.project_data.type_category_code == "TC-002"){
            //     const dialogRef = this._dialog.open(AsignedProjetNonCommercialEvaluateurComponent,
            //     {
            //         panelClass: 'fullscreen-dialog',
            //         data
            //     });
            //     dialogRef.afterClosed().subscribe({
            //         next: (val: any) => {
            //             if (val == 'close') {
            //                 this.getProjetDetails();
            //             }
            //         },
            //     });
            // }
        }
        // check all docs status
        checkAllDocsStatus(){
            let result: boolean = false;
            this.doc_list.forEach((e: any) => {
                if(e.status_on == false){
                    result = false;
                }else if(e.status_on == true){
                    result = true;
                }
            });
            return result;
        }
        // status for all decrets
        statusDecret(e: any, step: string){
            if(e){
                if(step == '1'){
                    if(e.value == 'oui'){
                        this.isOneYes = true;
                        this.isOneNo = false;
                    }else if(e.value == 'non'){
                        this.isOneNo = true;
                        this.isOneYes = false;
                    }
                    this.status_first_decret = e.value;
                }
                if(step == '2'){
                    if(e.value == 'oui'){
                        this.isSecondYes = true;
                        this.isSecondNo = false;
                    }else if(e.value == 'non'){
                        this.isSecondNo = true;
                        this.isSecondYes = false;
                    }
                    this.status_second_decret = e.value;
                }
                if(step == '3'){
                    if(e.value == 'oui'){
                        this.isThirdYes = true;
                        this.isThirdNo = false;
                    }else if(e.value == 'non'){
                        this.isThirdNo = true;
                        this.isThirdYes = false;
                    }
                    this.status_third_decret = e.value;
                }
            }
        }
        // set data to Ls
        setAnalyseDataToLs(e: any, step: string){
            if(e){
                if(step == '1'){
                    const data = {
                        id: 1,
                        html_first_decret: this.html_first_decret,
                        status_first_decret: this.status_first_decret,
                    };

                    localStorage.setItem('s_d_first', JSON.stringify(data));
                }

                if(step == '2'){
                    const data = {  id: 1,
                        html_second_decret: this.html_second_decret,
                        status_second_decret: this.status_second_decret,
                    };
                    localStorage.setItem('s_d_second', JSON.stringify(data));
                }

                if(step == '3'){
                    const data = {
                        id: 1,
                        html_third_decret: this.html_third_decret,
                        status_third_decret: this.status_third_decret
                    };
                    localStorage.setItem('s_d_third', JSON.stringify(data));
                }
            }
        }
        // get data to Ls
        getOldAnalyseDataToLs(){
            let s_d_first: any = localStorage.getItem('s_d_first');
            let s_d_second: any = localStorage.getItem('s_d_second');
            let s_d_third: any = localStorage.getItem('s_d_third');
            if(s_d_first != null){
                s_d_first = JSON.parse(s_d_first);
                this.html_first_decret = s_d_first.html_first_decret;
                this.status_first_decret = s_d_first.status_first_decret;

                if(this.status_first_decret == 'oui'){
                    this.isOneYes = true;
                    this.isOneNo = false;
                }else if(this.status_first_decret == 'non'){
                    this.isOneNo = true;
                    this.isOneYes = false;
                }
            }

            if(s_d_second != null){
                s_d_second = JSON.parse(s_d_second);
                this.html_second_decret = s_d_second.html_second_decret;
                this.status_second_decret = s_d_second.status_second_decret;

                if(this.status_second_decret == 'oui'){
                    this.isSecondYes = true;
                    this.isSecondNo = false;
                }else if(this.status_second_decret == 'non'){
                    this.isSecondNo = true;
                    this.isSecondYes = false;
                }
            }

            if(s_d_third != null){
                s_d_third = JSON.parse(s_d_third);
                this.html_third_decret = s_d_third.html_third_decret;
                this.status_third_decret = s_d_third.status_third_decret;

                if(this.status_third_decret == 'oui'){
                    this.isThirdYes = true;
                    this.isThirdNo = false;
                }else if(this.status_third_decret == 'non'){
                    this.isThirdNo = true;
                    this.isThirdYes = false;
                }
            }
        }
        // remove Ls
        removeLs(){
            localStorage.removeItem('s_d_first');
            localStorage.removeItem('s_d_second');
            localStorage.removeItem('s_d_third');
        }
        // click to back
        back(){
            this._location.back();
        }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

}
