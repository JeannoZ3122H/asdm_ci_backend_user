import { Routes } from '@angular/router';

import {
  EvaluateurProfilComponent,
} from 'src/app/pages/evaluator-pages/evaluateur-profil/evaluateur-profil.component';
import {
  FirstEvaluatorDetailsProjetHelpResolvedComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/help/first-evaluator-details-projet-help-resolved/first-evaluator-details-projet-help-resolved.component';
import {
  FirstEvaluatorDetailsProjetHelpComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/help/first-evaluator-details-projet-help/first-evaluator-details-projet-help.component';
import {
  ListProjetHelpComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/help/list-projet-help/list-projet-help.component';
import {
  ListProjetResolvedHelpComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/help/list-projet-resolved-help/list-projet-resolved-help.component';
import {
  HomeComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/home/home.component';
import {
  FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/subvention/first-evaluator-details-projet-commercial-o-non-commercial-resolved/first-evaluator-details-projet-commercial-o-non-commercial-resolved.component';
import {
  FirstEvaluatorDetailsProjetCommercialONonCommercialComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/subvention/first-evaluator-details-projet-commercial-o-non-commercial/first-evaluator-details-projet-commercial-o-non-commercial.component';
import {
  ListProjetResolvedCommercialComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/subvention/list-projet-resolved-commercial/list-projet-resolved-commercial.component';
import {
  ListProjetResolvedNonCommercialComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/subvention/list-projet-resolved-non-commercial/list-projet-resolved-non-commercial.component';
import {
  ListeProjetCommercialComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/subvention/liste-projet-commercial/liste-projet-commercial.component';
import {
  ListeProjetNonCommercialComponent,
} from 'src/app/pages/evaluator-pages/first-evaluator/subvention/liste-projet-non-commercial/liste-projet-non-commercial.component';
import {
  DetailsMessageComponent,
} from 'src/app/pages/evaluator-pages/message/details-message/details-message.component';
import {
  ListMessageComponent,
} from 'src/app/pages/evaluator-pages/message/list-message/list-message.component';
import {
  DocumentsConventionsBaseComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/documents-conventions-base/documents-conventions-base.component';
import {
  SecondEvaluatorDetailsProjetHelpResolvedComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/help/second-evaluator-details-projet-help-resolved/second-evaluator-details-projet-help-resolved.component';
import {
  SecondEvaluatorDetailsProjetHelpComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/help/second-evaluator-details-projet-help/second-evaluator-details-projet-help.component';
import {
  SecondListProjetHelpComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/help/second-list-projet-help/second-list-projet-help.component';
import {
  SecondListProjetResolvedHelpComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/help/second-list-projet-resolved-help/second-list-projet-resolved-help.component';
import {
  SecondEvaluatorHomeComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/second-evaluator-home/second-evaluator-home.component';
import {
  SecondEvaluaorListProjetCommercialComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/subvention/second-evaluaor-list-projet-commercial/second-evaluaor-list-projet-commercial.component';
import {
  SecondEvaluaorListProjetNonCommercialComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/subvention/second-evaluaor-list-projet-non-commercial/second-evaluaor-list-projet-non-commercial.component';
import {
  SecondEvaluaorListProjetResolvedCommercialComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/subvention/second-evaluaor-list-projet-resolved-commercial/second-evaluaor-list-projet-resolved-commercial.component';
import {
  SecondEvaluaorListProjetResolvedNonCommercialComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/subvention/second-evaluaor-list-projet-resolved-non-commercial/second-evaluaor-list-projet-resolved-non-commercial.component';
import {
  SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/subvention/second-evaluator-details-projet-commercial-o-non-commercial-resolved/second-evaluator-details-projet-commercial-o-non-commercial-resolved.component';
import {
  SecondEvaluatorDetailsProjetCommercialONonCommercialComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/subvention/second-evaluator-details-projet-commercial-o-non-commercial/second-evaluator-details-projet-commercial-o-non-commercial.component';
import {
  ViewsProjetRepportBaseComponent,
} from 'src/app/pages/evaluator-pages/second-evaluator/views-projet-repport-base/views-projet-repport-base.component';

export const EvaluatorLayoutRoutes: Routes = [

//***🥲🫥*******************************
  // START ROUTE FOR EVALUATOR 1
    //**********************************🥲🫥//
    // 🫥 ALL
        // [welcome] page route
        {
            path: 'web.first-evaluateur.welcome',
            component: HomeComponent
        },
        // [profil] page route
        {
            path: 'web.first-evaluateur.profil',
            component: EvaluateurProfilComponent
        },
        // [message] page route
        {
            path: 'web.first-evaluateur.my-message-list',
            component: ListMessageComponent
        },
        // [profil] page route
        {
            path: 'web.first-evaluateur.my-message-details/:message_slug',
            component: DetailsMessageComponent
        },


    // 🫥 PROJECT SUBVENTION COMMERCIAL
        // [list] page route
        {
            path: 'web.first-evaluateur.commercial.liste-projet',
            component: ListeProjetCommercialComponent
        },
        // [list-resolved] page route
        {
            path: 'web.first-evaluateur.commercial.liste-projet-resolved',
            component: ListProjetResolvedCommercialComponent
        },
        // [details] page route
        {
            path: 'web.first-evaluateur.commercial.details-projet/:project_code',
            component: FirstEvaluatorDetailsProjetCommercialONonCommercialComponent
        },
        // [details-resolved] page route
        {
            path: 'web.first-evaluateur.commercial.details-projet-resolved/:project_code',
            component: FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent
        },


    // 🫥 PROJECT SUBVENTION NON COMMERCIAL
        // [list] page route
        {
            path: 'web.first-evaluateur.non-commercial.liste-projet',
            component: ListeProjetNonCommercialComponent
        },
        // [list-resolved] page route
        {
            path: 'web.first-evaluateur.non-commercial.liste-projet-resolved',
            component: ListProjetResolvedNonCommercialComponent
        },
        // [details] page route
        {
            path: 'web.first-evaluateur.non-commercial.details-projet/:project_code',
            component: FirstEvaluatorDetailsProjetCommercialONonCommercialComponent
        },
        // [details-resolved] page route
        {
            path: 'web.first-evaluateur.non-commercial.details-projet-resolved/:project_code',
            component: FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent
        },


    // 🫥 PROJECT HELP
        // [list] page route
        {
            path: 'web.first-evaluateur.help.liste-projet',
            component: ListProjetHelpComponent
        },
        // [list-resolved] page route
        {
            path: 'web.first-evaluateur.help.liste-projet-resolved',
            component: ListProjetResolvedHelpComponent
        },
        // [details-non-resolved] page route
        {
            path: 'web.first-evaluateur.help.details-projet/:project_code',
            component: FirstEvaluatorDetailsProjetHelpComponent
        },
        // [details-resolved] page route
        {
            path: 'web.first-evaluateur.help.details-projet-resolved/:project_code',
            component: FirstEvaluatorDetailsProjetHelpResolvedComponent
        },

    //***🥲🫥*******************************
  // END ROUTE FOR EVALUATOR 1
//**********************************🥲🫥//


//***🥲🫥*******************************
  // START ROUTE FOR EVALUATOR 2
    //**********************************🥲🫥//
    // 🫥 ALL
        // [welcome] page route
        {
            path: 'web.second-evaluateur.welcome',
            component: SecondEvaluatorHomeComponent
        },
        // [profil] page route
        {
            path: 'web.second-evaluateur.profil',
            component: EvaluateurProfilComponent
        },
        // [repport] page route
        {
            path: 'web.second-evaluateur.view-project-repport',
            component: ViewsProjetRepportBaseComponent
        },
        // [document convention] page route
        {
            path: 'web.second-evaluateur.document-convention',
            component: DocumentsConventionsBaseComponent
        },
        // [message] page route
        {
            path: 'web.second-evaluateur.my-message-list',
            component: ListMessageComponent
        },
        // [profil] page route
        {
            path: 'web.second-evaluateur.my-message-details/:message_slug',
            component: DetailsMessageComponent
        },


    // 🫥 PROJECT SUBVENTION COMMERCIAL
        // [list] page route
        {
            path: 'web.second-evaluateur.commercial.liste-projet',
            component: SecondEvaluaorListProjetCommercialComponent
        },
        // [list-resolved] page route
        {
            path: 'web.second-evaluateur.commercial.liste-projet-resolved',
            component: SecondEvaluaorListProjetResolvedCommercialComponent
        },
        // [details] page route
        {
            path: 'web.second-evaluateur.commercial.details-projet/:project_code',
            component: SecondEvaluatorDetailsProjetCommercialONonCommercialComponent
        },
        // [details-resolved] page route
        {
            path: 'web.second-evaluateur.commercial.details-projet-resolved/:project_code',
            component: SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent
        },


    // 🫥 PROJECT SUBVENTION NON COMMERCIAL
        // [list] page route
        {
            path: 'web.second-evaluateur.non-commercial.liste-projet',
            component: SecondEvaluaorListProjetNonCommercialComponent
        },
        // [list-resolved] page route
        {
            path: 'web.second-evaluateur.non-commercial.liste-projet-resolved',
            component: SecondEvaluaorListProjetResolvedNonCommercialComponent
        },
        // [details] page route
        {
            path: 'web.second-evaluateur.non-commercial.details-projet/:project_code',
            component: SecondEvaluatorDetailsProjetCommercialONonCommercialComponent
        },
        // [details-resolved] page route
        {
            path: 'web.second-evaluateur.non-commercial.details-projet-resolved/:project_code',
            component: SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent
        },


    // 🫥 PROJECT HELP
        // [list] page route
        {
            path: 'web.second-evaluateur.help.liste-projet',
            component: SecondListProjetHelpComponent
        },
        // [list-resolved] page route
        {
            path: 'web.second-evaluateur.help.liste-projet-resolved',
            component: SecondListProjetResolvedHelpComponent
        },
        // [details-non-resolved] page route
        {
            path: 'web.second-evaluateur.help.details-projet/:project_code',
            component: SecondEvaluatorDetailsProjetHelpComponent
        },
        // [details-resolved] page route
        {
            path: 'web.second-evaluateur.help.details-projet-resolved/:project_code',
            component: SecondEvaluatorDetailsProjetHelpResolvedComponent
        },

    //***🥲🫥*******************************
  // END ROUTE FOR EVALUATOR 2
//**********************************🥲🫥//
]
