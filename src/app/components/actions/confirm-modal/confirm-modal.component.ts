import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import {
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit{

    public user_type: string = '';

    constructor(
        private _coockie: CustomerCookieService,
        private _localStorage: CustomerStorageService,
        private _dialogRef: MatDialogRef<ConfirmModalComponent>,
    ){}

    ngOnInit() {
        let get_user_type_normal = this._coockie.getKeywordToCookie();
        let get_user_type = get_user_type_normal.toLocaleLowerCase();

        if(get_user_type == 'administrateur' || get_user_type == 'administrateurs' || get_user_type == 'admin'){
            this.user_type = get_user_type;
        }

        if(get_user_type == 'evaluateur' || get_user_type == 'evaluateurs' || get_user_type == 'evaluator'){
                this.user_type = 'Instructeur';
        }
    }

    continueWith(){
        this._dialogRef.close('continue')
    }
    closeDialog(){
        this._dialogRef.close('close')
    }
}
