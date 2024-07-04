import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
} from '@angular/router';

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
  selector: 'app-views-projet-repport-base',
  templateUrl: './views-projet-repport-base.component.html',
  styleUrls: ['./views-projet-repport-base.component.css']
})
export class ViewsProjetRepportBaseComponent implements OnInit{

    public ev_data: any = {};
    public is_mode_code_enter: string = '';
    public is_category_project: string = '';
    public my_option_type_project: string = '';
    public project_code_enter: string = '';
    public type_repport_project: string = '';
    public list_project: any = [];
    public filteredOptions: string[] = [];

    public is_after_choosing_entrer_mode: boolean = false;
    public is_subvention_project: boolean = false;
    public is_help_project: boolean = false;
    public is_good_enter_code: boolean = false;
    public is_bad_enter_code: boolean = false;
    public is_show_content_by_type_repport: boolean = false;
    public is_loading: boolean = false;


    // check project status
    public is_not_found_project: boolean = false;
    public is_not_complected_project_step_one: boolean = false;
    public is_not_complected_project_step_second: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _request_ev: SecondEvaluatorService,
        private _router: Router,
        private _route_active: ActivatedRoute,
        private _loading: NgxUiLoaderService,
        private _localStorage: CustomerStorageService,
        private sanitizer: DomSanitizer,
        private _coockie: CookieService,
        private _dialog: MatDialog
    ){
        _router.events.forEach((event: any) => {
            if(event instanceof NavigationEnd) {
                this.deletedLs();
            }
        });
    }

    ngOnInit(){
        this.filteredOptions = this.list_project.slice();
        this.ev_data = this._localStorage.getDataToStorage();
        let get = localStorage.getItem('my_type_project');
        if(get != null){
            this.getOldTypeProject(get);
        }
    }

    // choosing mode enter project code
    choosingCategoryProject(category: string){
        this.is_category_project = category;

        setTimeout(() => {
            this.getListByProjectSelected();
        }, 500);
    }
    // choosing mode enter project code
    choosingModeEnterCodeProject(mode: string){
        this.is_after_choosing_entrer_mode = true;
        setTimeout(() => {
            if(this.my_option_type_project == 'help'){
                setTimeout(() => {
                    this.getListByProjectSelected();
                    this.is_mode_code_enter = mode;
                }, 500);
            }else{
                this.is_mode_code_enter = mode;
            }
        }, 500);
    }
    // select project
    isSelectedProject(code: any){
        this.project_code_enter = code.value;
        setTimeout(() => {
            this.checkIfExistProjectByCode();
        }, 1500);
    }
    // get list project after chooser other enter
    getListByProjectSelected(){
        this._loading.start();
        setTimeout(() => {
            if(this.is_category_project == 'commercial' && this.my_option_type_project == 'subvention'){
                this._request_ev.getListeProjetCommercialResolved(this.ev_data.id).subscribe(
                    {
                        next: (response: any) =>{
                            this.list_project = response;
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
                )
            }

            if(this.is_category_project == 'non-commercial' && this.my_option_type_project == 'subvention'){
                this._request_ev.getListeProjetNonCommercialResolved(this.ev_data.id).subscribe(
                    {
                        next: (response: any) =>{
                            this.list_project = response;
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
                )
            }

            if(this.my_option_type_project == 'help'){
                this._request_ev.getListeProjetHelpResolved(this.ev_data.id).subscribe(
                    {
                        next: (response: any) =>{
                            this.list_project = response;
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
                )
            }
        }, 1000);
    }

    // status
    typeProject(e: any){
        this._loading.start();
        localStorage.setItem('my_type_project', e.value);
        setTimeout(() => {
            this.my_option_type_project = e.value;

            if(this.my_option_type_project == 'subvention'){
                this.is_help_project = false;
                this.is_show_content_by_type_repport = false;
                this.is_subvention_project = true;
            }
            if(this.my_option_type_project == 'help'){
                this.is_subvention_project = false;
                this.is_show_content_by_type_repport = false;
                this.is_help_project = true;
            }

            this._loading.stop();
        }, 500);
    }
    // get to ls
    getOldTypeProject(type: string){
        this.my_option_type_project = type;
        if(this.my_option_type_project == 'subvention'){
            this.is_help_project = false;
            this.is_show_content_by_type_repport = false;
            this.is_subvention_project = true;
        }
        if(this.my_option_type_project == 'help'){
            this.is_subvention_project = false;
            this.is_show_content_by_type_repport = false;
            this.is_help_project = true;
        }

        let get = localStorage.getItem('my_type_project_code_enter');
        if(get != null){
            this.project_code_enter = get;
            setTimeout(() => {
                this.checkIfExistProjectByCode();
                setTimeout(() => {
                    let is_show_content_by_type_repport: any = localStorage.getItem('is_show_content_by_type_repport');
                    if(is_show_content_by_type_repport == null){
                        setTimeout(() => {
                            this.is_show_content_by_type_repport = true;
                            this.type_repport_project = is_show_content_by_type_repport;
                            this._loading.stop();
                        }, 500);
                    }
                }, 1500);
            }, 1000);
        }
    }
    // delete to ls
    deletedLs(){
        localStorage.removeItem('my_type_project');
        localStorage.removeItem('my_type_project_code_enter');
        localStorage.removeItem('is_show_content_by_type_repport');
        localStorage.removeItem('chazam_repport');
    }
    // init all
    initAll(){
        this.deletedLs();
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    // get project by project codes
    checkIfExistProjectByCode(){
        if(this.project_code_enter == ''){
            this._message.errorField();
            return
        }

        this._loading.start();
        if(this.my_option_type_project == 'help'){
            this._request.getGlobalProjetHelpDetails(this.project_code_enter).subscribe(
                {
                    next: (response: any) =>{
                        if(response != null || undefined){
                            this.is_good_enter_code = true;
                            localStorage.setItem('my_type_project_code_enter', this.project_code_enter);
                            this._localStorage.setResultProjetInfoRepportToLs(response);
                            this.is_bad_enter_code = false;
                            this.is_show_content_by_type_repport = false;
                            this._loading.stop();
                        }else{
                            this.is_good_enter_code = false;
                            this.is_show_content_by_type_repport = false;
                            this.is_bad_enter_code = true;
                            this.is_loading = true;
                            this._loading.stop();

                            setTimeout(()=>{
                                this.is_loading = false;
                            }, 6000)
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

        if(this.my_option_type_project == 'subvention'){
            this._request.getGlobalProjetDetails(this.project_code_enter).subscribe(
                {
                    next: (response: any) =>{
                        if(response != null || undefined){
                            this.is_good_enter_code = true;
                            localStorage.setItem('my_type_project_code_enter', this.project_code_enter);
                            this._localStorage.setResultProjetInfoRepportToLs(response);
                            this.is_bad_enter_code = false;
                            this.is_show_content_by_type_repport = false;
                            this._loading.stop();
                        }else{
                            this.is_good_enter_code = false;
                            this.is_show_content_by_type_repport = false;
                            this.is_bad_enter_code = true;
                            this.is_loading = true;
                            this._loading.stop();
                        }

                        setTimeout(()=>{
                            this.is_loading = false;
                        }, 6000)
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
     // status
     typeRepport(e: any){
        this._loading.start();
        localStorage.setItem('is_show_content_by_type_repport', e.value);
        this.type_repport_project = e.value;

        let data: any = this._localStorage.getResultProjetInfoRepportToLs().project_data;
        if(this.my_option_type_project == 'subvention'){
            if(this.type_repport_project == 'pre-repport'){
                // verify code project
                if(
                    data.status_projet_info == 0
                ){
                    this.is_not_found_project = true;
                }else{
                    // verify step one
                    if(
                        (data.status_dossiers == 0 || 1)
                        && data.status_decrets == null
                        || data.status_decrets_plan_annuel == null
                        || data.status_decrets_plan_strategie == null
                    ){
                        this.is_not_complected_project_step_one = true;
                    }else{
                        this.is_not_found_project = false;
                        this.is_not_complected_project_step_one = false;
                    }
                }
            }
            if(this.type_repport_project == 'global-repport'){
                // verify step second
                if(
                    (data.status_etude == 0 || 1)
                    && data.status_decisions_on == 0
                    && data.status_decisions_on == 0
                ){
                    this.is_not_complected_project_step_second = true;
                }else{

                    this.is_not_complected_project_step_second = false;
                }
            }
        }

        if(this.my_option_type_project == 'help'){
            if(this.type_repport_project == 'pre-repport'){
                // verify code project
                if(
                    data.status_projet_fond_info == 0
                ){
                    this.is_not_found_project = true;
                }else{
                    // verify step one
                    if(
                        (data.status_dossiers == 0 || 1)
                        && data.status_decrets == null
                        || data.status_decrets_plan_annuel == null
                        || data.status_decrets_plan_strategie == null
                    ){
                        this.is_not_complected_project_step_one = true;
                    }else{
                        this.is_not_found_project = false;
                        this.is_not_complected_project_step_one = false;
                    }
                }
            }
            if(this.type_repport_project == 'global-repport'){
                // verify step second
                if(
                    (data.status_etude == 0 || 1)
                    && data.status_decisions_on == 0
                    && data.status_decisions_on == 0
                ){
                    this.is_not_complected_project_step_second = true;
                }else{

                    this.is_not_complected_project_step_second = false;
                }
            }
        }

        setTimeout(() => {
            this.is_show_content_by_type_repport = true;
            this._loading.stop();
        }, 1500);
    }
}

