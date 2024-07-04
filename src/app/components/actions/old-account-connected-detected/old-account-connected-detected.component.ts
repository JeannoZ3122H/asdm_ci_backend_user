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
  CustomerCookieService,
} from 'src/app/services/secure/cookies/customer-cookie.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-old-account-connected-detected',
  templateUrl: './old-account-connected-detected.component.html',
  styleUrls: ['./old-account-connected-detected.component.css']
})
export class OldAccountConnectedDetectedComponent implements OnInit{

    public user_type: string = '';
    public new_user_type: string = '';

    constructor(
        private _coockie: CustomerCookieService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _localStorage: CustomerStorageService,
        private _dialogRef: MatDialogRef<OldAccountConnectedDetectedComponent>,
    ){}

    ngOnInit() {
        this.getData();
    }

    getData(){
        let get_user_type_normal = this._coockie.getKeywordToCookie();
        let get_user_type = get_user_type_normal.toLocaleLowerCase();

        if(get_user_type == 'administrateur' || get_user_type == 'administrateurs' || get_user_type == 'admin'){
            this.user_type = 'administrateur';
        }

        if(get_user_type == 'evaluateur' || get_user_type == 'evaluateurs' || get_user_type == 'evaluator'){
            if(this.data == 'INSTRUCTEUR 1'){
                this.user_type = 'Instructeur 2';
            }
            if(this.data == 'INSTRUCTEUR 2'){
                this.user_type = 'Instructeur 1';
            }
        }

        if(this.data){
            let get_new_user_type = (this.data).toLocaleLowerCase();
            if(get_new_user_type == 'administrateur' || get_new_user_type == 'administrateurs' || get_new_user_type == 'admin'){
                this.new_user_type = 'administrateur';
            }else{
                let niveau_name = this.data;
                niveau_name = niveau_name.toLowerCase();
                this.new_user_type = niveau_name;
            }
        }

    }

    myVoice(type: string){
        this._dialogRef.close(type)
    }
}
