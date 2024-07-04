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
  ActivatedRoute,
  Router,
} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FirstEvaluatorService,
} from 'src/app/services/request/evaluator-request/first-evaluator/first-evaluator.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';

@Component({
  selector: 'app-set-performance-anterieure',
  templateUrl: './set-performance-anterieure.component.html',
  styleUrls: ['./set-performance-anterieure.component.css']
})
export class SetPerformanceAnterieureComponent implements OnInit{

    public is_set_data: boolean = false;
    public is_update_data: boolean = false;
    public alreadly_set_data: boolean = false;

    // forms var
    public one_montant: string = '';
    public one_year: string = '';

    public second_year: string = '';
    public second_montant: string = '';

    public third_montant: string = '';
    public third_year: string = '';

    public len_list: number = 0;
    public _list_year: any = [];
    public list_libelle: any = [
        {
            id: 1,
            name: 'Chiffre d’affaires'
        },
        {
            id: 2,
            name: 'Résultat net'
        },
        {
            id: 3,
            name: 'Cash-flow'
        },
    ];
    public new_list_performance: any = [];
    public detail_performance_anterieur: any = [];
    public project_data: any = {};

    constructor(
        private _route_active: ActivatedRoute,
        private _message: MessageService,
        private _coockie: CookieService,
        private _request_ev: FirstEvaluatorService,
        private _request: ProjetsService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA)public data: any,
        private _dialogRef: MatDialogRef<SetPerformanceAnterieureComponent>,
    ) { }

    ngOnInit() {
        this.getListYear();
        if(this.data != null ){
            this.project_data = this.data.project_data;
            if(this.data.type == 'update'){
                this.is_set_data = false;
                this.is_update_data = true;
            }else if(this.data.type == 'set'){
                let get: any = localStorage.getItem('is_old_performance_ant');
                if(get == null){
                    localStorage.setItem('is_old_performance_ant', 'is');
                    this.is_set_data = true;
                    this.is_update_data = false;
                }else{
                    this.is_set_data = true;
                    this.is_update_data = false;
                    this.getToLs();
                }
                
                if(this.data.performance_anterieur_data.length > 0){
                    this.new_list_performance = this.data.performance_anterieur_data;
                    this.len_list = this.new_list_performance.length;
                }
            }
        }
    }

    close(){
        this._dialogRef.close('close');
    }

// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // get list year
    storeAllDataToDB(item: any){
        let status = this.groupOldData();
        if(status == false){
            this._message.errorField();
            return
        }
        const data = {
            project_code: this.project_data.project_code,
            user_ref: this.project_data.user_ref,
            element_performance: item.name,
            detail_performance_anterieur: JSON.stringify(this.detail_performance_anterieur)
        }

        this._loading.start();
        this._request_ev.storePerformanceAnterieureData(data).subscribe(
            {
                next: (response: any)=>{
                    if (response.code == 200) {
                        this.removeOldData();
                        setTimeout(() => {
                            localStorage.setItem('alreadly_set_data', 'is');
                            this._message.successOperation(response);
                            this._loading.stop();
                            window.location.reload();
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.stop();
                        this._message.error(response);
                    }
                },
                error: (error: any)=>{
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
// ****************** START FUNCTION FOR EVENTS ****************** //
    // ************************************************ 😇😇😇😇 //
    // get list year
    getListYear(){
        const currentYear = (new Date()).getFullYear();
        const range = (start: any, stop: any, step: any) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
        this._list_year = range(currentYear + 3, currentYear - 3, -1);

        // let tab_preview: any [] = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
        // let tab_next: any[] = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() + i);

        // tab_preview.concat(tab_next);
        // const max = new Date().getUTCFullYear();
        // const min = max - 60;
        // const yearRange = this._list_year.range(min, max + 1);


    }
    // 😇😇 **** YEAR
    chooseYear(e: any, niv: number){
        if(niv == 1){
            this.one_year = e.value;
            const data = {
                year: e.value,
                montant: this.one_montant
            }
            localStorage.setItem('one_performance_data', JSON.stringify(data));
            localStorage.setItem('one_year', e.value);
        }
        if(niv == 2){
            this.second_year = e.value;
            const data = {
                year: e.value,
                montant: this.second_montant
            }
            localStorage.setItem('second_performance_data', JSON.stringify(data));
            localStorage.setItem('second_year', e.value);
        }
        if(niv == 3){
            this.third_year = e.value;
            const data = {
                year: e.value,
                montant: this.third_montant
            }
            localStorage.setItem('third_performance_data', JSON.stringify(data));
            localStorage.setItem('third_year', e.value);
        }
    }
    // store my performance old data
    storeToLs(e: any, niv: number){
        if(e){
            if(niv == 1){
                const data = {
                    year: this.one_year,
                    montant: e.target.value
                }
                localStorage.setItem('one_performance_data', JSON.stringify(data));
            }
            if(niv == 2){
                const data = {
                    year: this.second_year,
                    montant: e.target.value
                }
                localStorage.setItem('second_performance_data', JSON.stringify(data));
            }
            if(niv == 3){
                const data = {
                    year: this.third_year,
                    montant: e.target.value
                }
                localStorage.setItem('third_performance_data', JSON.stringify(data));
            }
        }
    }
    // get old data to ls
    getToLs(){

        let alreadly_set_data: any = localStorage.getItem('alreadly_set_data');

        let get_one: any = localStorage.getItem('one_performance_data');
        let get_second: any = localStorage.getItem('second_performance_data');
        let get_third: any = localStorage.getItem('third_performance_data');

        if(alreadly_set_data == null){
            this.alreadly_set_data = false;
            if(get_one != null){
                let data = JSON.parse(get_one);
                this.one_year = data.year;
                this.one_montant = data.montant;
            }
            if(get_second != null){
                let data = JSON.parse(get_second);
                this.second_year = data.year;
                this.second_montant = data.montant;
            }
            if(get_third != null){
                let data = JSON.parse(get_third);
                this.third_year = data.year;
                this.third_montant = data.montant;
            }
        }else {
            this.alreadly_set_data = true;

            let one_year: any = localStorage.getItem('one_year');
            let second_year: any = localStorage.getItem('second_year');
            let third_year: any = localStorage.getItem('third_year');

            // one
            if(one_year != null){
                this.one_year = one_year;
            }
            if(get_one != null){
                let data = JSON.parse(get_one);
                this.one_montant = data.montant;
            }

            // second
            if(second_year != null){
                this.second_year = second_year;
            }
            if(get_second != null){
                let data = JSON.parse(get_second);
                this.second_montant = data.montant;
            }

            // third
            if(third_year != null){
                this.third_year = third_year;
            }
            if(get_third != null){
                let data = JSON.parse(get_third);
                this.third_montant = data.montant;
            }
        }

    }
    // remove old data
    removeOldData(){
        localStorage.removeItem('one_performance_data');
        localStorage.removeItem('second_performance_data');
        localStorage.removeItem('third_performance_data');
    }
    // is end
    isEndSet(){
        localStorage.removeItem('one_performance_data');
        localStorage.removeItem('second_performance_data');
        localStorage.removeItem('third_performance_data');

        localStorage.removeItem('one_year');
        localStorage.removeItem('second_year');
        localStorage.removeItem('third_year');
        localStorage.removeItem('alreadly_set_data');
        localStorage.removeItem('is_old_code');
        localStorage.removeItem('is_old_performance_ant');

        setTimeout(() => {
            this.close();
        }, 500);

    }
    // group old data
    groupOldData(){
        let tab_one: any = [];
        let tab_second: any = [];
        let tab_third: any = [];
        let data_one: any = localStorage.getItem('one_performance_data');
        let data_second: any = localStorage.getItem('second_performance_data');
        let data_third: any = localStorage.getItem('third_performance_data');

        if(data_one != null){
            tab_one = JSON.parse(data_one);
        }
        if(data_second != null){
            tab_second = JSON.parse(data_second);
        }
        if(data_third != null){
            tab_third = JSON.parse(data_third);
        }

        if(data_one != null && data_second != null && data_third != null){
            this.detail_performance_anterieur = [].concat(tab_one, tab_second, tab_third);
            return true;
        }else{
            return false;
        }
    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION FOR EVENTS ****************** //
// ************************************************ 😇😇😇😇 //

}
