import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import * as fr from '@angular/common/locales/fr';
import {
  LOCALE_ID,
  NgModule, isDevMode,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxEditorModule } from 'ngx-editor';
import {
  provideToastr,
  ToastrModule,
} from 'ngx-toastr';
import {
  NgxUiLoaderConfig,
  NgxUiLoaderModule,
  NgxUiLoaderRouterModule,
} from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  ConfirmModalComponent,
} from './components/actions/confirm-modal/confirm-modal.component';
import {
  DeleteModalComponent,
} from './components/actions/delete-modal/delete-modal.component';
import {
  OldAccountConnectedDetectedComponent,
} from './components/actions/old-account-connected-detected/old-account-connected-detected.component';
import {
  UpdateAdminAvatarComponent,
} from './components/admin-components/admin-except-projet-components/update-admin-avatar/update-admin-avatar.component';
import {
  AsignedProjetEvaluateurComponent,
} from './components/admin-components/asigned-projet-evaluateur/asigned-projet-evaluateur.component';
import {
  AsignedProjetNonCommercialEvaluateurComponent,
} from './components/admin-components/asigned-projet-non-commercial-evaluateur/asigned-projet-non-commercial-evaluateur.component';
import {
  FooterComponent,
} from './components/admin-components/footer/footer.component';
import {
  AddBudgetAnnuelComponent,
} from './components/admin-components/forms/add-budget-annuel/add-budget-annuel.component';
import {
  AddBudgetOrganisationComponent,
} from './components/admin-components/forms/add-budget-organisation/add-budget-organisation.component';
import {
  AddCategoryComponent,
} from './components/admin-components/forms/add-category/add-category.component';
import {
  AddCompteAdminComponent,
} from './components/admin-components/forms/add-compte-admin/add-compte-admin.component';
import {
  AddCompteEvaluateurComponent,
} from './components/admin-components/forms/add-compte-evaluateur/add-compte-evaluateur.component';
import {
  AddCompteUtilisateurComponent,
} from './components/admin-components/forms/add-compte-utilisateur/add-compte-utilisateur.component';
import {
  AddNiveauComponent,
} from './components/admin-components/forms/add-niveau/add-niveau.component';
import {
  AddRoleComponent,
} from './components/admin-components/forms/add-role/add-role.component';
import {
  AddSessionComponent,
} from './components/admin-components/forms/add-session/add-session.component';
import {
  AddTypeCategoryComponent,
} from './components/admin-components/forms/add-type-category/add-type-category.component';
import {
  AddTypeMediaComponent,
} from './components/admin-components/forms/add-type-media/add-type-media.component';
import {
  NavbarComponent,
} from './components/admin-components/navbar/navbar.component';
import {
  EvaluateurNavbarComponent,
} from './components/evaluateur-component/first-evaluator/evaluateur-navbar/evaluateur-navbar.component';
import {
  EvaluatorSecondNavbarComponent,
} from './components/evaluateur-component/second-evaluator/evaluator-second-navbar/evaluator-second-navbar.component';
import {
  MailGetForChangePasswordComponent,
} from './components/mail-get-for-change-password/mail-get-for-change-password.component';
import {
  MailVerifyComponent,
} from './components/mail-verify/mail-verify.component';
import {
  AdminLayoutComponent,
} from './layouts/admin-layout/admin-layout.component';
import {
  AuthentificationLayoutComponent,
} from './layouts/authentification-layout/authentification-layout.component';
import {
  EvaluatorLayoutComponent,
} from './layouts/evaluator-layout/evaluator-layout.component';
import { MaterialModule } from './material-module';
import {
  ForgetPasswordComponent,
} from './pages/forget-password/forget-password.component';
import { OoopsComponent } from './pages/ooops/ooops.component';
import {
  UnauthorizedComponent,
} from './pages/unauthorized/unauthorized.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
    "bgsColor": "#d68417",
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#d68417",
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "folding-cube",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": "#d68417",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": true,
    "text": "",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
};

@NgModule({
    declarations: [
    // 😱 GLOBAL
        // pages
        AppComponent,
        AdminLayoutComponent,
        AuthentificationLayoutComponent,
        EvaluatorLayoutComponent,
        OoopsComponent,

        // components
        DeleteModalComponent,
        ConfirmModalComponent,
        MailVerifyComponent,
        MailGetForChangePasswordComponent,
        OldAccountConnectedDetectedComponent,

    // 😱 EVALUATOR
        // Components
        EvaluateurNavbarComponent,
        EvaluatorSecondNavbarComponent,

    // 😱 ADMIN
        // components
        AddRoleComponent,
        AsignedProjetEvaluateurComponent,
        AsignedProjetNonCommercialEvaluateurComponent,
        ForgetPasswordComponent,
        FooterComponent,
        NavbarComponent,
        UpdateAdminAvatarComponent,
        AddCompteAdminComponent,
        AddCompteEvaluateurComponent,
        AddCompteUtilisateurComponent,
        AddNiveauComponent,
        AddCategoryComponent,
        AddTypeCategoryComponent,
        AddTypeMediaComponent,
        AddBudgetOrganisationComponent,
        AddSessionComponent,
        AddBudgetAnnuelComponent,
        UnauthorizedComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        // ComponentsModule,
        MaterialModule,
        NgxEditorModule,

        NgxUiLoaderModule,
        NgxUiLoaderRouterModule,
        NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        provideToastr({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        registerLocaleData(fr.default);
    }
}
