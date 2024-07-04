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
  selector: 'app-set-o-update-variation-performance-anterieure',
  templateUrl: './set-o-update-variation-performance-anterieure.component.html',
  styleUrls: ['./set-o-update-variation-performance-anterieure.component.css']
})
export class SetOUpdateVariationPerformanceAnterieureComponent implements OnInit{
    public variation_data: any = {};
    public is_set_data: boolean = false;
    public is_update_data: boolean = false;
    public alreadly_set_data: boolean = false;

    // forms data
    public year_start: string = '';
    public _list_year: any = [];
    public year_end: string = '';
    public variation: number = 0;
    public niv: number = 0;

    constructor(
        private _route_active: ActivatedRoute,
        private _message: MessageService,
        private _coockie: CookieService,
        private _request_ev: FirstEvaluatorService,
        private _request: ProjetsService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA)public data: any,
        private _dialogRef: MatDialogRef<SetOUpdateVariationPerformanceAnterieureComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null ){
            console.log(this.data)
            if(this.data.type == 'update'){
                this.is_set_data = false;
                this.is_update_data = true;

                if(this.data.niv == 1){
                    let d_data: any = JSON.parse(this.data.variation_1);
                    this.year_start = d_data.year_start;
                    this.year_end = d_data.year_end;
                    this.variation = d_data.variation;
                }
                if(this.data.niv == 2){
                    let d_data: any = JSON.parse(this.data.variation_2);
                    this.year_start = d_data.year_start;
                    this.year_end = d_data.year_end;
                    this.variation = d_data.variation;
                }

            }else if(this.data.type == 'set'){
                this.is_set_data = true;
                this.is_update_data = false;
            }

            this.niv = this.data.niv;
            this._list_year = this.data.detail_performance_anterieur;
        }
    }


// 😇😇 ************************************************ //
// ****************** START FUNCTION REQUEST TO API ****************** //
    // ************************************************ 😇😇😇😇 //
    // update data to db
    updateDataToDB(){

        if(this.year_start == '' || this.year_end == '' || this.variation == 0){
            this._message.errorField();
            return
        }
        if(this.niv == 2 && this.variation > 100){
            this._message.error({status: 'Erreur', message: 'Veuillez réduire le pourcentage, car il est supérieur à 100. Merci !'});
            return
        }

        const data = {
            content: JSON.stringify({
                year_start: this.year_start,
                year_end: this.year_end,
                variation: this.variation,
            }),
            performance_id: this.data.id,
            variation_index: this.niv
        }
        this._loading.start();
        this._request_ev.updatePerformanceAnterieureVariationData(data).subscribe(
            {
                next: (response: any)=>{
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._message.successOperation(response);
                            this._loading.stop();
                            this.close();
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
    // choose year
    chooseYear(e: any, step: number){
        if(step == 1){
            this.year_start = e.value;
        }
        if(step == 2){
            this.year_end = e.value;
        }
    }
    // close
    close(){
        this._dialogRef.close('close');
    }
    // 😇😇 ************************************************ //
// ****************** END FUNCTION FOR EVENTS ****************** //
// ************************************************ 😇😇😇😇 //


}
