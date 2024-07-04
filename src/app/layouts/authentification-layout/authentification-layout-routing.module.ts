import { Routes } from '@angular/router';

import { AuthComponent } from 'src/app/pages/auth/auth.component';

export const AuthentificationLayoutRoutes: Routes = [

    //***🥲🫥*******************************
      // START ROUTE FOR ADMIN CONFIG
        //**********************************🥲🫥//
        // [AUTHENTIFICATION] page route
            {
                path: '',
                component: AuthComponent
            },
        //***🥲🫥*******************************
      // END ROUTE FOR ANY LINK PROJECT
    //**********************************🥲🫥//
];
