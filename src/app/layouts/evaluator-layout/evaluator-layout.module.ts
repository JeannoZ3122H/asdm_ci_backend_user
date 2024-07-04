import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgxEditorModule } from 'ngx-editor';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  CompletedRejectDocsComercialONonCommercialComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/completed-reject-docs-comercial-o-non-commercial/completed-reject-docs-comercial-o-non-commercial.component';
import {
  CompletedRejectDocsHelpComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/completed-reject-docs-help/completed-reject-docs-help.component';
import {
  IsOldSetPerformanceComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/is-old-set-performance/is-old-set-performance.component';
import {
  SetPerformanceAnterieureComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-data/set-performance-anterieure/set-performance-anterieure.component';
import {
  SetPerformanceProjectComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-data/set-performance-project/set-performance-project.component';
import {
  SetOUpdateVariationPerformanceAnterieureComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-performance/set-o-update-variation-performance-anterieure/set-o-update-variation-performance-anterieure.component';
import {
  SetOUpdateVariationPerformanceProjectComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/set-o-update-performance/set-o-update-variation-performance-project/set-o-update-variation-performance-project.component';
import {
  SingleRejectedDocsComercialONonCommercialComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/single-rejected-docs-comercial-o-non-commercial/single-rejected-docs-comercial-o-non-commercial.component';
import {
  SingleRejectedDocsHelpComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/single-rejected-docs-help/single-rejected-docs-help.component';
import {
  ValidatedDocsComercialONonCommercialComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/validated-docs-comercial-o-non-commercial/validated-docs-comercial-o-non-commercial.component';
import {
  ValidatedDocsHelpComponent,
} from 'src/app/components/evaluateur-component/first-evaluator/validated-docs-help/validated-docs-help.component';
import {
  AddDocumentsConventionsBaseComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/add-documents-conventions-base/add-documents-conventions-base.component';
import {
  SetCommentsByElementComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/etudes-project/set-comments-by-element/set-comments-by-element.component';
import {
  SetCommentsHelpByElementComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/etudes-project/set-comments-help-by-element/set-comments-help-by-element.component';
import {
  UpdateCommentsByElementComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/etudes-project/update-comments-by-element/update-comments-by-element.component';
import {
  UpdateCommentsHelpByElementComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/etudes-project/update-comments-help-by-element/update-comments-help-by-element.component';
import {
  ListDocumentsConventionsBaseComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/list-documents-conventions-base/list-documents-conventions-base.component';
import {
  PreviewsFinalProjetRepportComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/repports-components/previews-final-projet-repport/previews-final-projet-repport.component';
import {
  PreviewsFirstProjetRepportComponent,
} from 'src/app/components/evaluateur-component/second-evaluator/repports-components/previews-first-projet-repport/previews-first-projet-repport.component';
import { MaterialModule } from 'src/app/material-module';
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

import { EvaluatorLayoutRoutes } from './evaluator-layout-routing.module';

@NgModule({
    declarations: [
    // 😏 GLOBAL EVALUATOR
        // pages
        HomeComponent,
        EvaluateurProfilComponent,
        ListMessageComponent,
        DetailsMessageComponent,

    // 😏 FIRST EVALUATOR
        // pages
        ListeProjetCommercialComponent,
        ListeProjetNonCommercialComponent,
        ListProjetHelpComponent,
        ListProjetResolvedHelpComponent,
        ListProjetResolvedCommercialComponent,
        ListProjetResolvedNonCommercialComponent,
        FirstEvaluatorDetailsProjetHelpComponent,
        FirstEvaluatorDetailsProjetHelpResolvedComponent,
        FirstEvaluatorDetailsProjetCommercialONonCommercialComponent,
        FirstEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent,

        // components
        SingleRejectedDocsComercialONonCommercialComponent,
        SingleRejectedDocsHelpComponent,
        ValidatedDocsComercialONonCommercialComponent,
        ValidatedDocsHelpComponent,
        CompletedRejectDocsComercialONonCommercialComponent,
        CompletedRejectDocsHelpComponent,
        SetPerformanceAnterieureComponent,
        SetPerformanceProjectComponent,
        IsOldSetPerformanceComponent,
        SetOUpdateVariationPerformanceAnterieureComponent,
        SetOUpdateVariationPerformanceProjectComponent,


    // 😏 SECOND EVALUATOR
        // pages
        SecondEvaluatorDetailsProjetHelpComponent,
        SecondEvaluatorDetailsProjetHelpResolvedComponent,
        SecondListProjetHelpComponent,
        SecondListProjetResolvedHelpComponent,
        SecondEvaluatorDetailsProjetCommercialONonCommercialComponent,
        SecondEvaluatorDetailsProjetCommercialONonCommercialResolvedComponent,
        SecondEvaluaorListProjetNonCommercialComponent,
        SecondEvaluaorListProjetResolvedNonCommercialComponent,
        SecondEvaluaorListProjetResolvedCommercialComponent,
        SecondEvaluaorListProjetCommercialComponent,
        ListDocumentsConventionsBaseComponent,
        ViewsProjetRepportBaseComponent,
        DocumentsConventionsBaseComponent,
        SecondEvaluatorHomeComponent,
        // components
        PreviewsFirstProjetRepportComponent,
        PreviewsFinalProjetRepportComponent,
        AddDocumentsConventionsBaseComponent,
        SetCommentsByElementComponent,
        UpdateCommentsByElementComponent,
        SetCommentsHelpByElementComponent,
        UpdateCommentsHelpByElementComponent,


    ],
    imports: [
        CommonModule,
        RouterModule.forChild(EvaluatorLayoutRoutes),
        FormsModule,
        MaterialModule,
        NgxEditorModule,
        NgxPaginationModule,
    ]
})
export class EvaluatorLayoutModule { }
