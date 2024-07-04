import { Component, INJECTOR, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/services/_actions/message/message.service';
import { NiveauService } from 'src/app/services/request/niveau/niveau.service';
import { AddCompteAdminComponent } from '../add-compte-admin/add-compte-admin.component';

@Component({
  selector: 'app-add-niveau',
  templateUrl: './add-niveau.component.html',
  styleUrls: ['./add-niveau.component.css']
})
export class AddNiveauComponent implements OnInit {


    public niveau: string = '';
    public item_id: number = 0;
    public item_slug: string = '';
    public is_update: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: NiveauService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddNiveauComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.niveau = this.data.niveau_name;
            this.item_id = this.data.id;
            this.item_slug = this.data.slug;
        }
    }

    saveNiveau(){
        if(this.niveau == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {niveau_name: this.niveau}
        this._request.saveNiveau(data).subscribe(
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

    updateNiveau(){
        if(this.niveau == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {niveau_name: this.niveau}
        this._request.updateNiveau(this.item_slug, data).subscribe(
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
