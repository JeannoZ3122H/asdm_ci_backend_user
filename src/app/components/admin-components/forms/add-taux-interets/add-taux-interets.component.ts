import {
  Component,
  Inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  TauxInteretsService,
} from 'src/app/services/request/taux-interets/taux-interets.service';

@Component({
  selector: 'app-add-taux-interets',
  templateUrl: './add-taux-interets.component.html',
  styleUrls: ['./add-taux-interets.component.css']
})
export class AddTauxInteretsComponent {

    public libelle: string = '';
    public description: string = '';
    public taux_interets: string = '';
    public item_id: number = 0;
    public item_slug: number = 0;
    public is_update: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: TauxInteretsService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddTauxInteretsComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.taux_interets = this.data.taux_interet_value;
            this.libelle = this.data.taux_interet_name;
            this.description = this.data.description;
            this.item_id = this.data.id;
            this.item_slug = this.data.slug;
        }
    }

    save(){
        if(this.taux_interets == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {
            description: this.description,
            taux_interet_name: this.libelle,
            taux_interet_value: this.taux_interets
        }
        this._request.store(data).subscribe(
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

    update(){
        if(this.taux_interets == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {
            description: this.description,
            taux_interet_name: this.libelle,
            taux_interet_value: this.taux_interets
        }
        this._request.update(this.item_slug, data).subscribe(
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
