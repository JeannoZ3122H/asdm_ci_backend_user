import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from 'src/app/material-module';
import { AuthComponent } from 'src/app/pages/auth/auth.component';

import {
  AuthentificationLayoutRoutes,
} from './authentification-layout-routing.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AuthentificationLayoutRoutes),
    FormsModule,
    MaterialModule,

    NgxPaginationModule
  ]
})
export class AuthentificationLayoutModule { }
