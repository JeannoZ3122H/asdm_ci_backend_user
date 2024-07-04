import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  DeleteModalComponent,
} from 'src/app/components/actions/delete-modal/delete-modal.component';
import {
  AddTypeMediaComponent,
} from 'src/app/components/admin-components/forms/add-type-media/add-type-media.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  TypeMediaService,
} from 'src/app/services/request/type-media/type-media.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-type-media',
  templateUrl: './type-media.component.html',
  styleUrls: ['./type-media.component.css']
})
export class TypeMediaComponent implements OnInit{


  public _liste_type_media: any;

    _visitor: boolean = false;
  constructor(
      private _dialog: MatDialog,
      private _request: TypeMediaService,
      private _router: Router,
      private _message: MessageService,
      private _loading: NgxUiLoaderService,
        private _authorized: AuthorizedService
  ) {

        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }
  }

  ngOnInit(){
      this.getListeTypeMedia();
  }

  getListeTypeMedia(){
      this._request.getListeTypeMedia().subscribe(
          {
              next: (response: any) =>{
                  this._liste_type_media= response;
              },
              error: (error: any)=>{
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

  openDialog() {
      const dialogRef = this._dialog.open(AddTypeMediaComponent, {width: 'auto'});
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val==true) {
                  this.getListeTypeMedia();
              }
          },
      });
  }

  editMedia(data: any){
      const dialogRef = this._dialog.open(AddTypeMediaComponent, {width: 'auto', data});
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val==true) {
               this.getListeTypeMedia();
              }
          },
      });
  }

  deleteMedia(slug: any){
      const dialogRef = this._dialog.open(DeleteModalComponent, {width: 'auto'});
      dialogRef.afterClosed().subscribe({
          next: (val: any) => {
              if (val == 'confirm') {
                 this._request.deleteTypeMedia(slug).subscribe(
                  {
                      next: (response: any)=>{
                          if (response.code == 200) {
                              setTimeout(() => {
                                  this._message.successOperation(response);
                                  this._loading.stop();
                                  this.getListeTypeMedia();
                              }, 1000);
                          } else if (response.code == 302 || response.code == 300) {
                              this._loading.stop();
                              this._message.error(response);
                          }
                      },
                      error: (error: any)=>{
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
          },
      });
  }
}
