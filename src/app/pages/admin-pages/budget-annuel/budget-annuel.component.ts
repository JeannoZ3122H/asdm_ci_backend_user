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
  AddBudgetAnnuelComponent,
} from 'src/app/components/admin-components/forms/add-budget-annuel/add-budget-annuel.component';
import {
  AddBudgetOrganisationComponent,
} from 'src/app/components/admin-components/forms/add-budget-organisation/add-budget-organisation.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

import {
  BudgetAnnuelService,
} from '../../../services/request/budget-annuel/budget-annuel.service';

@Component({
  selector: 'app-budget-annuel',
  templateUrl: './budget-annuel.component.html',
  styleUrls: ['./budget-annuel.component.css']
})
export class BudgetAnnuelComponent implements OnInit{


  public _liste_budget_annuel: any;
  public is_budget_entreprise: boolean = true;
  public is_budget_organisation: boolean = false;

_visitor: boolean = false;
  constructor(
      private _dialog: MatDialog,
      private _request: BudgetAnnuelService,
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
      this.getListeBudget();
  }

  getListeBudget(){
      this._request.getListeBudget().subscribe(
          {
              next: (response: any) =>{
                  this._liste_budget_annuel= response;
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

  getListeBudget_organisation(){
      this._request.getListeBudget_organisation().subscribe(
          {
              next: (response: any) =>{
                  this._liste_budget_annuel= response;
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

  openDialogEntreprise() {
      const dialogRef = this._dialog.open(AddBudgetAnnuelComponent, {width: 'auto'});
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val==true) {
                  this.getListeBudget();
              }
          },
      });
  }
  openDialogOrganisation() {
      const dialogRef = this._dialog.open(AddBudgetOrganisationComponent, {width: 'auto'});
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val==true) {
                  this.getListeBudget();
              }
          },
      });
  }

  editBudget(data: any){
      const dialogRef = this._dialog.open(AddBudgetAnnuelComponent, {width: 'auto', data});
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val==true) {
               this.getListeBudget();
              }
          },
      });
  }

  deleteBudget(slug: any){
      const dialogRef = this._dialog.open(DeleteModalComponent, {width: 'auto'});
      dialogRef.afterClosed().subscribe({
          next: (val: any) => {
              if (val == 'confirm') {
                 this._request.deleteBudget(slug).subscribe(
                  {
                      next: (response: any)=>{
                          if (response.code == 200) {
                              setTimeout(() => {
                                  this._message.successOperation(response);
                                  this._loading.stop();
                                  this.getListeBudget();
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


  gotToBudgetEntreprise() {
    this._loading.start();
    this.getListeBudget();
    this.is_budget_entreprise = true;
    this.is_budget_organisation = false;
    this._loading.stop();
}

gotToBudgetOrganisation() {
    this._loading.start();
    this.getListeBudget_organisation();
    this.is_budget_entreprise = false;
    this.is_budget_organisation = true;
    this._loading.stop();
}

}
