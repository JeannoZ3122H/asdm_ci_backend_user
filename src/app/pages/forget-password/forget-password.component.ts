import { Location } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  ForgotPasswordService,
} from 'src/app/services/request/forgot-password/forgot-password.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{

    public is_verify_email: boolean = true;
    public is_reset_password: boolean = false;
    public update_my_password: boolean = false;

    public email_verify: string = '';
    public new_password: string = '';
    public confirm_password: string = '';

    constructor (
        private _message: MessageService,
        private _request: ForgotPasswordService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        private _location: Location
    ){
    }

    ngOnInit(){
        setInterval(()=>{
            this.getCurrentStep();
        })
    }

    getCurrentStep(){
        let status_verify_email = localStorage.getItem('sve');
        let status_reset_password_by_email = localStorage.getItem('srpe');
        let status_update_password = localStorage.getItem('iup');

        if(status_verify_email != null && status_verify_email == 'start'){
            this.is_verify_email = true;
            this.is_reset_password = false;
            this.update_my_password = false;
        }

        if(status_reset_password_by_email != null){
            this.is_verify_email = false;
            this.is_reset_password = true;
            this.update_my_password = false;
        }

        if(status_update_password != null && status_update_password == 'finished'){
            this.update_my_password = true;
            this.is_verify_email = false;
            this.is_reset_password = false;
        }
    }

    verifyMyEmail(){
        this._loading.start();
        const data = {
            email: this.email_verify
        }
        this._request.verifyEmail(data).subscribe(
            {
                next: (response: any) => {
                    if(response.code == 200){
                        this._message.successOperation(response);
                        localStorage.setItem('srpe', this.email_verify);
                        this.getCurrentStep();
                        this._loading.stop();
                    }else{
                        this._message.error({status: 'Erreur', message:'Erreur detectée'});
                        this._loading.stop();
                        return
                    }
                }, error: (error: any) => {
                    this._loading.stop();
                    if (error.status == 401) {
                        this._message.error(error);
                        return
                    }else{
                        this._message.error({status: 'Erreur', message:'Erreur detectée'});
                        return
                    }
                }
            }
        )
    }

    resetMyPassword(){

        if(this.new_password == ''){
            this._message.errorField();
            return
        }

        if(this.confirm_password != this.new_password){
            this._message.error({status: 'Attention !', message:'Le mot de passe et la confirmation ne sont pas conformes'});
            return
        }

        let email = localStorage.getItem('srpe');
        const data = {
            email: email,
            password: this.new_password,
        }

        this._loading.start();
        this._request.resetPassword(data).subscribe(
            {
                next: (response: any) => {
                    if(response.code == 200){
                        this._message.successOperation(response);
                        localStorage.setItem('iup', 'finished');
                        setTimeout(() => {
                            this.getCurrentStep();
                            this._loading.stop();
                        }, 500);
                    }else{
                        this._message.error({status: 'Erreur', message:'Erreur detectée'});
                        this._loading.stop();
                        return
                    }
                }, error: (error: any) => {
                    this._loading.stop();
                    if (error.status == 401) {
                        this._message.error(error);
                        return
                    }else{
                        this._message.error({status: 'Erreur', message:'Erreur detectée'});
                        return
                    }
                }
            }
        )
    }

    deletedLs(){
        localStorage.removeItem('sve');
        localStorage.removeItem('srpe');
        localStorage.removeItem('iup');
        setTimeout(() => {
            this._router.navigateByUrl('/');
        }, 1000);
    }

    return(){
        localStorage.removeItem('sve');
        localStorage.removeItem('srpe');
        localStorage.removeItem('iup');
        setTimeout(() => {
            this._location.back();
        }, 100);
    }
}
