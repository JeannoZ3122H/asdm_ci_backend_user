import { Routes } from '@angular/router';

import {
  BudgetAnnuelComponent,
} from 'src/app/pages/admin-pages/budget-annuel/budget-annuel.component';
import {
  CategoryDocsComponent,
} from 'src/app/pages/admin-pages/category-docs/category-docs.component';
import {
  DashboardComponent,
} from 'src/app/pages/admin-pages/dashboard/dashboard.component';
import {
  DocsFournirComponent,
} from 'src/app/pages/admin-pages/docs-fournir/docs-fournir.component';
import {
  FormeJuridiqueComponent,
} from 'src/app/pages/admin-pages/forme-juridique/forme-juridique.component';
import {
  ListeCategoriesComponent,
} from 'src/app/pages/admin-pages/liste-categories/liste-categories.component';
import {
  ListeCompteAdminComponent,
} from 'src/app/pages/admin-pages/liste-compte-admin/liste-compte-admin.component';
import {
  ListeCompteEvaluateursComponent,
} from 'src/app/pages/admin-pages/liste-compte-evaluateurs/liste-compte-evaluateurs.component';
import {
  ListeCompteUtilisateurComponent,
} from 'src/app/pages/admin-pages/liste-compte-utilisateur/liste-compte-utilisateur.component';
import {
  ListeNiveauComponent,
} from 'src/app/pages/admin-pages/liste-niveau/liste-niveau.component';
import {
  ListeRoleComponent,
} from 'src/app/pages/admin-pages/liste-role/liste-role.component';
import {
  ListeTypesCategoriesComponent,
} from 'src/app/pages/admin-pages/liste-types-categories/liste-types-categories.component';
import {
  ProfileComponent,
} from 'src/app/pages/admin-pages/profile/profile.component';
import {
  DetailsCommercialONonCommercialProjectAdminHelpComponent,
} from 'src/app/pages/admin-pages/projects-pages/details-commercial-o-non-commercial-project-admin-help/details-commercial-o-non-commercial-project-admin-help.component';
import {
  DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent,
} from 'src/app/pages/admin-pages/projects-pages/details-commercial-o-non-commercial-project-admin-resolved-help/details-commercial-o-non-commercial-project-admin-resolved-help.component';
import {
  DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent,
} from 'src/app/pages/admin-pages/projects-pages/details-commercial-o-non-commercial-project-admin-resolved-subv/details-commercial-o-non-commercial-project-admin-resolved-subv.component';
import {
  DetailsCommercialONonCommercialProjectAdminSubvComponent,
} from 'src/app/pages/admin-pages/projects-pages/details-commercial-o-non-commercial-project-admin-subv/details-commercial-o-non-commercial-project-admin-subv.component';
import {
  GlobalProjetsCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-commercials/global-projets-commercials/global-projets-commercials.component';
import {
  ProjectCompletedCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-commercials/project-completed-commercials/project-completed-commercials.component';
import {
  GlobalProjetsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-help/global-projets/global-projets.component';
import {
  ProjectCompletedComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-help/project-completed/project-completed.component';
import {
  GlobalProjetsNonCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-non-commercials/global-projets-non-commercials/global-projets-non-commercials.component';
import {
  ProjectCompletedNonCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-non-commercials/project-completed-non-commercials/project-completed-non-commercials.component';
import {
  SessionComponent,
} from 'src/app/pages/admin-pages/session/session.component';
import {
  StatistiquesComponent,
} from 'src/app/pages/admin-pages/statistiques/statistiques.component';
import {
  TauxInteretsComponent,
} from 'src/app/pages/admin-pages/taux-interets/taux-interets.component';
import {
  TypeMediaComponent,
} from 'src/app/pages/admin-pages/type-media/type-media.component';
import {
  ViewsProjetRepportBaseAdminComponent,
} from 'src/app/pages/admin-pages/views-projet-repport-base-admin/views-projet-repport-base-admin.component';

export const AdminLayoutRoutes: Routes = [

//***🥲🫥*******************************
  // START ROUTE FOR ADMIN CONFIG
    //**********************************🥲🫥//
    // [welcome] page route
        {
            path: 'web.administration.welcome',
            component: DashboardComponent
        },
    // [profile] page route
        {
            path: 'web.administration.profile',
            component: ProfileComponent
        },
    // [repport] page route
    {
        path: 'web.administration.view-project-repport',
        component: ViewsProjetRepportBaseAdminComponent
    },
    // [profile] page route
        {
            path: 'web.administration.liste-role',
            component: ListeRoleComponent
        },
    // [profile] page route
        {
            path: 'web.administration.statistiques',
            component: StatistiquesComponent
        },
    // [profile] page route
        {
            path: 'web.administration.liste-session',
            component: SessionComponent
        },
    // [profile] page route
        {
            path: 'web.administration.type-media',
            component: TypeMediaComponent
        },
    // [profile] page route
        {
            path: 'web.administration.budget-annuel',
            component: BudgetAnnuelComponent
        },
    //***🥲🫥*******************************
  // END ROUTE FOR ANY LINK PROJECT
//**********************************🥲🫥//


//***🥲🫥*******************************
  // START ROUTE FOR ADMIN
    //**********************************🥲🫥//
    {
        path: 'web.administration.liste-compte-admin',
        component: ListeCompteAdminComponent
    },
    {
        path: 'web.administration.liste-compte-evaluateurs',
        component: ListeCompteEvaluateursComponent
    },
    {
        path: 'web.administration.liste-compte-utilisateurs',
        component: ListeCompteUtilisateurComponent
    },
    {
        path: 'web.administration.liste-types-categories',
        component: ListeTypesCategoriesComponent
    },
    {
        path: 'web.administration.liste-categories',
        component: ListeCategoriesComponent
    },
    {
        path: 'web.administration.liste-niveaux',
        component: ListeNiveauComponent
    },
    {
        path: 'web.administration.list-docs-fournir',
        component: DocsFournirComponent
    },
    {
        path: 'web.administration.list-category-docs',
        component: CategoryDocsComponent
    },
    {
        path: 'web.administration.list-taux-interets',
        component: TauxInteretsComponent
    },
    {
        path: 'web.administration.list-forme-juridique',
        component: FormeJuridiqueComponent
    },
    //***🥲🫥*******************************
  // END ROUTE FOR ADMIN
//**********************************🥲🫥//


//***🥲🫥*******************************
  // START ROUTE FOR ANY LINK PROJECT
    //**********************************🥲🫥//

    // 🫥 PROJECT SUBVENTION COMMERCIAL
        {
            path: 'web.administration.commercial.show-project-seleted-details/:project_code',
            component: DetailsCommercialONonCommercialProjectAdminSubvComponent
        },
        {
            path: 'web.administration.commercial.show-project-seleted-resolved-details/:project_code',
            component: DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent
        },
        {
            path: 'web.administration.commercial.liste-projet-globale',
            component: GlobalProjetsCommercialsComponent
        },
        {
            path: 'web.administration.commercial.liste-projet-resolved-finale',
            component: ProjectCompletedCommercialsComponent
        },

    // 🫥 PROJECT SUBVENTION NON COMMERCIAL
        {
            path: 'web.administration.non-commercial.show-project-seleted-details/:project_code',
            component: DetailsCommercialONonCommercialProjectAdminSubvComponent
        },
        {
            path: 'web.administration.non-commercial.show-project-seleted-resolved-details/:project_code',
            component: DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent
        },
        {
            path: 'web.administration.non-commercial.liste-projet-globale',
            component: GlobalProjetsNonCommercialsComponent
        },
        {
            path: 'web.administration.non-commercial.liste-projet-resolved-finale',
            component: ProjectCompletedNonCommercialsComponent
        },


    // 🫥 PROJECT HELP
        {
            path: 'web.administration.help.show-project-seleted-details/:project_code',
            component: DetailsCommercialONonCommercialProjectAdminHelpComponent
        },
        {
            path: 'web.administration.help.liste-projet-globale',
            component: GlobalProjetsComponent
        },
        {
            path: 'web.administration.help.liste-projet-resolved-finale',
            component: ProjectCompletedComponent
        },
        {
            path: 'web.administration.help.show-project-seleted-resolved-details/:project_code',
            component: DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent
        },

    //***🥲🫥*******************************
  // END ROUTE FOR ANY LINK PROJECT
//**********************************🥲🫥//

];
