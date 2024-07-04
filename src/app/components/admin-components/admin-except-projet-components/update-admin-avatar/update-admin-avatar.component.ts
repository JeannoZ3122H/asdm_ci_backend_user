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
  AdminService,
} from 'src/app/services/request/comptes/admin/admin.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
  selector: 'app-update-admin-avatar',
  templateUrl: './update-admin-avatar.component.html',
  styleUrls: ['./update-admin-avatar.component.css']
})
export class UpdateAdminAvatarComponent {

    public file!: File;
    public my_avatar!: string;
    public user_data!: any;

    constructor(
        private _loading: NgxUiLoaderService,
        private _request: AdminService,
        private _message: MessageService,
        private _router: Router,
        private _localStorage: CustomerStorageService,
        public dialogRef: MatDialogRef<UpdateAdminAvatarComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ){}

    ngOnInit() {
        this.user_data = this._localStorage.getDataToStorage();
        this.my_avatar = this.user_data.photo_url;
    }


// 😇😇 ************************************************ //
// ****************** START REQUEST DATA TO DB ****************** //
    // ************************************************ 😇😇😇😇 //
    // update file
    uploadFile(e: any){
        this.file = e.target.files[0];
    }

    updateLOgo(){
        const formData = new FormData();
        formData.append('photo', this.file);
        formData.append('admin_slug', this.user_data.slug);

        this._loading.start();
        this._request.updateUserImg(formData).subscribe(
            {
                next: (response: any) =>{
                    this._loading.stop();
                    if(response.code == 200){
                        this._message.successOperation(response);
                        this._localStorage.setDataToStorage(response.user_data);
                        this.close('good');
                    }
                },
                error: (error: any) => {
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                    }
                }
            }
        );

    }
    // send file
    // 😇😇 ************************************************ //
// ****************** END REQUEST DATA TO DB ****************** //
// ************************************************ 😇😇😇😇 //

    close(type: string){
        this.dialogRef.close(type);
    }

}
