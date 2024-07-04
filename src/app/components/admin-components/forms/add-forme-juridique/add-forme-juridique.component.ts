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

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  FormeJuridiqueService,
} from 'src/app/services/request/forme-juridique/forme-juridique.service';

@Component({
  selector: 'app-add-forme-juridique',
  templateUrl: './add-forme-juridique.component.html',
  styleUrls: ['./add-forme-juridique.component.css']
})
export class AddFormeJuridiqueComponent implements OnInit{

    public forme_juridique: string = '';
    public item_id: number = 0;
    public item_slug: number = 0;
    public is_update: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: FormeJuridiqueService,
        private _loading: NgxUiLoaderService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AddFormeJuridiqueComponent>,
    ){
    }

    ngOnInit(){
        if(this.data != null) {
            this.is_update = true;
            this.forme_juridique = this.data.forme_juridique_name;
            this.item_id = this.data.id;
            this.item_slug = this.data.slug;
        }
    }

    save(){
        if(this.forme_juridique == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {forme_juridique_name: this.forme_juridique}
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
        if(this.forme_juridique == '')
        {
            this._message.errorField();
            return
        }
        this._loading.start();
        const data = {forme_juridique_name: this.forme_juridique}
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
