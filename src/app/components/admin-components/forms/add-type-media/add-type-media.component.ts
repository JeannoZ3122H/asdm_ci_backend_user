import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/services/_actions/message/message.service';
import { TypeMediaService } from 'src/app/services/request/type-media/type-media.service';

@Component({
  selector: 'app-add-type-media',
  templateUrl: './add-type-media.component.html',
  styleUrls: ['./add-type-media.component.css']
})
export class AddTypeMediaComponent implements OnInit {

  public _liste_type_media: any;
  public type_category_name: string = '';
  public type_media: string = '';
  public item_slug: string = '';
  public media: string = '';
  public item_id: number = 0;
  public is_update: boolean = false;

  constructor(
      private _message: MessageService,
      private _request: TypeMediaService,
      private _loading: NgxUiLoaderService,
      private _router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _dialogRef: MatDialogRef<AddTypeMediaComponent>,
  ){
  }

  ngOnInit(){
      if(this.data != null) {
          this.is_update = true;
          this.media = this.data.media_name;
          this.item_slug = this.data.slug;
          this.item_id = this.data.id;
      }
      this.getListeTypeMedia();
  }

  chooseTypeMedia(e: any) {
      this.type_media = e.value;
  }

  getListeTypeMedia(){
      this._liste_type_media.getListeTypeMedia().subscribe(
          {
              next: (response: any) =>{
                  this._liste_type_media = response;
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

  saveTypeMedia(){
      if(this.type_media == '')
      {
          this._message.errorField();
          return
      }
      if(this.media == '')
      {
          this._message.errorField();
          return
      }
      this._loading.start();
      const data = {type_media: this.type_media,}
      this._request.saveTypeMedia(data).subscribe(
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

  updateTypeMedia(){
      if(this.type_media == '')
      {
          this._message.errorField();
          return
      }
      this._loading.start();
      const data = {type_media: this.type_media, mediia: this.media}
      this._request.updateTypeMedia(this.item_slug, data).subscribe(
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
