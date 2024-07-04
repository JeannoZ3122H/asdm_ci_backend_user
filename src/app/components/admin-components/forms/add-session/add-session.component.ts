import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/services/_actions/message/message.service';
import { SessionsService } from 'src/app/services/request/sessions/sessions.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent implements OnInit {

    public session: string = '';
    public date_debut: string = '';
    public date_fin: string = '';
    public item_id: number = 0;
    public item_slug: number = 0;
    public is_update: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: SessionsService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddSessionComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.session = this.data.sessions;
            this.date_debut = this.data.date_debut;
            this.date_fin = this.data.date_fin;
            this.item_id = this.data.id;
            this.item_slug = this.data.slug;
        }
    }

    saveSession(){
        if(this.session == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {
            session: this.session,
            date_debut: this.date_debut,
            date_fin: this.date_fin,
        }
        this._request.saveSession(data).subscribe(
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

    updateSession(){
        if(this.session == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {
            session: this.session,
            date_debut: this.date_debut,
            date_fin: this.date_fin,
        }
        this._request.updateSession(this.item_slug, data).subscribe(
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
