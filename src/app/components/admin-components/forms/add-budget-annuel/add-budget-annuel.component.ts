import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'src/app/services/_actions/message/message.service';
import { AddTypeMediaComponent } from '../add-type-media/add-type-media.component';
import { BudgetAnnuelService } from './../../../../services/request/budget-annuel/budget-annuel.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-budget-annuel',
  templateUrl: './add-budget-annuel.component.html',
  styleUrls: ['./add-budget-annuel.component.css']
})
export class AddBudgetAnnuelComponent implements OnInit {

  public _liste_budget_annuel: any;
  public budget_annuel: string = '';
  public item_slug: string = '';
  public annee: string = '';
  public item_id: number = 0;
  public is_update: boolean = false;

  constructor(
      private _message: MessageService,
      private _request: BudgetAnnuelService,
      private _loading: NgxUiLoaderService,
      private _router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _dialogRef: MatDialogRef<AddTypeMediaComponent>,
  ){
  }

  ngOnInit(){
      if(this.data != null) {
          this.is_update = true;
          this.budget_annuel = this.data.budget_annuel;
          this.item_slug = this.data.slug;
          this.item_id = this.data.id;
      }
      this.getListeBudget();
  }

  chooseBudget(e: any) {
      this.budget_annuel = e.value;
  }

  getListeBudget(){
      this._liste_budget_annuel.getListeBudget().subscribe(
          {
              next: (response: any) =>{
                  this._liste_budget_annuel = response;
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

  saveBudget(){
      if(this.budget_annuel == '')
      {
          this._message.errorField();
          return
      }
      if(this.annee == '')
      {
          this._message.errorField();
          return
      }
      this._loading.start();
      const data = {budget_annuel: this.budget_annuel,annee: this.annee}
      this._request.saveBudget(data).subscribe(
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

  updateBudget(){
      if(this.budget_annuel == '')
      {
          this._message.errorField();
          return
      }
      
      if(this.annee == '')
      {
          this._message.errorField();
          return
      }
      this._loading.start();
      const data = {budget_annuel: this.budget_annuel,}
      this._request.updateBudget(this.item_slug, data).subscribe(
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
