import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  AssignedProjetHelpEvaluateurComponent,
} from 'src/app/components/admin-components/assigned-projet-help-evaluateur/assigned-projet-help-evaluateur.component';
import {
  AddCategoryDocsComponent,
} from 'src/app/components/admin-components/forms/add-category-docs/add-category-docs.component';
import {
  AddDocsFournirComponent,
} from 'src/app/components/admin-components/forms/add-docs-fournir/add-docs-fournir.component';
import {
  AddFormeJuridiqueComponent,
} from 'src/app/components/admin-components/forms/add-forme-juridique/add-forme-juridique.component';
import {
  AddTauxInteretsComponent,
} from 'src/app/components/admin-components/forms/add-taux-interets/add-taux-interets.component';
import {
  PreviewsFinalProjetRepportAdminComponent,
} from 'src/app/components/admin-components/repports-components-admin/previews-final-projet-repport-admin/previews-final-projet-repport-admin.component';
import {
  PreviewsFirstProjetRepportAdminComponent,
} from 'src/app/components/admin-components/repports-components-admin/previews-first-projet-repport-admin/previews-first-projet-repport-admin.component';
import { MaterialModule } from 'src/app/material-module';
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
  AssignedProjetsCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-commercials/assigned-projets-commercials/assigned-projets-commercials.component';
import {
  GlobalProjetsCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-commercials/global-projets-commercials/global-projets-commercials.component';
import {
  ProjectCompletedCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-commercials/project-completed-commercials/project-completed-commercials.component';
import {
  AssignedProjetsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-help/assigned-projets/assigned-projets.component';
import {
  GlobalProjetsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-help/global-projets/global-projets.component';
import {
  ProjectCompletedComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-help/project-completed/project-completed.component';
import {
  AssignedProjetsNonCommercialsComponent,
} from 'src/app/pages/admin-pages/projects-pages/list-projets-non-commercials/assigned-projets-non-commercials/assigned-projets-non-commercials.component';
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

import { AdminLayoutRoutes } from './admin-layout-routing.module';

@NgModule({
    declarations: [
        // pages
        DashboardComponent,
        ListeCompteAdminComponent,
        ListeCompteEvaluateursComponent,
        ListeCompteUtilisateurComponent,
        ListeTypesCategoriesComponent,
        ListeCategoriesComponent,
        ListeNiveauComponent,
        ViewsProjetRepportBaseAdminComponent,

        GlobalProjetsNonCommercialsComponent,
        GlobalProjetsCommercialsComponent,
        AssignedProjetsNonCommercialsComponent,
        AssignedProjetsCommercialsComponent,
        AssignedProjetHelpEvaluateurComponent,
        AddFormeJuridiqueComponent,
        AddTauxInteretsComponent,
        AddCategoryDocsComponent,
        AddDocsFournirComponent,
        StatistiquesComponent,
        ProfileComponent,
        SessionComponent,
        ListeRoleComponent,
        TypeMediaComponent,
        BudgetAnnuelComponent,
        DetailsCommercialONonCommercialProjectAdminSubvComponent,
        DetailsCommercialONonCommercialProjectAdminHelpComponent,
        GlobalProjetsComponent,
        AssignedProjetsComponent,

        DetailsCommercialONonCommercialProjectAdminResolvedHelpComponent,
        DetailsCommercialONonCommercialProjectAdminResolvedSubvComponent,
        ProjectCompletedCommercialsComponent,
        ProjectCompletedNonCommercialsComponent,
        ProjectCompletedComponent,

        FormeJuridiqueComponent,
        TauxInteretsComponent,
        DocsFournirComponent,
        CategoryDocsComponent,

        PreviewsFirstProjetRepportAdminComponent,
        PreviewsFinalProjetRepportAdminComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        MaterialModule,
        NgxEditorModule,
        NgxPaginationModule,
    ]
})
export class AdminLayoutModule { }
