import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import {
  AdminLayoutComponent,
} from './layouts/admin-layout/admin-layout.component';
import {
  AuthentificationLayoutComponent,
} from './layouts/authentification-layout/authentification-layout.component';
import {
  EvaluatorLayoutComponent,
} from './layouts/evaluator-layout/evaluator-layout.component';
import {
  ForgetPasswordComponent,
} from './pages/forget-password/forget-password.component';
import { OoopsComponent } from './pages/ooops/ooops.component';
import {
  UnauthorizedComponent,
} from './pages/unauthorized/unauthorized.component';

const routes: Routes = [
    {
        path: "",
        redirectTo: "/",
        pathMatch: "full"
    },
    {
        path: "",
        component: AuthentificationLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import ("./layouts/authentification-layout/authentification-layout.module").then(m => m.AuthentificationLayoutModule)
            }
        ]
    },
    {
        path: "",
        component: AdminLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
            }
        ]
    },
    {
        path: "",
        component: EvaluatorLayoutComponent,
        children: [
            {
                path: "",
                loadChildren: () => import ("./layouts/evaluator-layout/evaluator-layout.module").then(m => m.EvaluatorLayoutModule)
            }
        ]
    },
    {
        path: 'unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: "web.forgot-password",
        component: ForgetPasswordComponent
    },
    {
        path: "404-error",
        component: OoopsComponent
    },
    {
        path: "*",
        redirectTo: "/unauthorized"
    },
    {
        path: "**",
        redirectTo: "/404-error"
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
