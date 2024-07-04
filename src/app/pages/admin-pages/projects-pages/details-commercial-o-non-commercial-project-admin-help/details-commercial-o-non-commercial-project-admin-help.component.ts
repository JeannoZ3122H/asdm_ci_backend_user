import { Location } from '@angular/common';
import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  AssignedProjetHelpEvaluateurComponent,
} from 'src/app/components/admin-components/assigned-projet-help-evaluateur/assigned-projet-help-evaluateur.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-details-commercial-o-non-commercial-project-admin-help',
  templateUrl: './details-commercial-o-non-commercial-project-admin-help.component.html',
  styleUrls: ['./details-commercial-o-non-commercial-project-admin-help.component.css']
})
export class DetailsCommercialONonCommercialProjectAdminHelpComponent implements OnInit{

    public swot_opportunity: any = [];
    public swot_menace: any = [];
    public swot_force: any = [];
    public swot_faiblesse: any = [];
    public recap_besoin_exprime: any = [];
    public planning: any = [];
    public piece_jointe: any = [];
    public objectif_specifique: any = [];
    public mise_en_oeuvre: any = {};
    public beneficiaire: any = {};
    public impact_project: any = {};
    public besoin_exprimer: any = [];
    public fonctionnement_data: any = [];
    public detail_request_data: any = [];
    public doc_list: any = [];
    public plan_financement_data: any = [];
    public etude_financiere_docs_data: any = [];
    public project_data: any = {};
    public condition_financement_data: any = {};
    public user_data: any = {};
    public total_plan_financement: number = 0;
    public user_email: string = '';
    _visitor: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _router: Router,
        private _coockie: CookieService,
        private _route_active: ActivatedRoute,
        private ngxService: NgxUiLoaderService,
        private _location: Location,
        private sanitizer: DomSanitizer,
        private _dialog: MatDialog,
        private _authorized: AuthorizedService
    ){
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }}

    ngOnInit(){
        this.getDetailsProject();
    }

    getDetailsProject(){
        let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');
        // console.log(get_projet_code_encrypt)
        this._request.getGlobalProjetHelpDetails(get_projet_code_encrypt).subscribe(
            {
                next: (response: any)=>{
                    console.log(response)
                    this.project_data = response.project_data;
                    this.doc_list = response.doc_list;
                    this.etude_financiere_docs_data = response.etude_financiere_docs_data;
                    this.planning = response.planning_data;
                    this.piece_jointe = response.piece_jointe_data;
                    this.objectif_specifique = response.objectif_specifique_data;
                    this.mise_en_oeuvre = response.mise_en_oeuvre_data;
                    this.fonctionnement_data = response.fonctionnement_data;
                    this.besoin_exprimer = response.besoin_exprimer_data;

                    this.impact_project = response.impact_project_data;
                    this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                    this.impact_project.impact_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur);
                    this.impact_project.impact_secteur_medias = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur_medias);
                    this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);
                    this.impact_project.indicateurs = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.indicateurs);

                    this.plan_financement_data = response.plan_financement_data;

                    this.total_plan_financement = 0;
                    this.plan_financement_data.forEach((e:any) => {
                        this.total_plan_financement += Number(e.taux_plan_financement);
                    });


                    this.detail_request_data = response.detail_request_data;
                    this.condition_financement_data = response.condition_financement_data;
                    this.condition_financement_data.garantie_proposee = this.sanitizer.bypassSecurityTrustHtml(this.condition_financement_data.garantie_proposee);
                    // this.beneficiaire.beneficiaire_indirects = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_indirects);


                    this.recap_besoin_exprime = response.recap_besoin_exprime;
                    // this.resultat_attendus = response.resultat_attendus;
                    this.swot_faiblesse = response.swot_faiblesse_data;
                    this.swot_force = response.swot_force_data;
                    this.swot_menace = response.swot_menace_data;
                    this.swot_opportunity = response.swot_opportunity_data;
                    this.user_email = response.user_email;
                },
                error: (error: any) => {
                    this.ngxService.stop();
                    let _error = error.error;
                    if (error.status == 401 || _error.message == "Token has expired") {
                        localStorage.removeItem('Ramzan_Kadyrov');
                        this._coockie.delete('us_id');
                        this._coockie.delete('dragonFly');
                        this._message.tokenExpired();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        );
    }

    back(){
        this._location.back();
    }

    asignedAsEvaluator(data: any){
        Object.assign(data, {type_asigned:'asigned'});
        const dialogRef = this._dialog.open(AssignedProjetHelpEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val: any) => {
                if (val == 'close') {
                    this.getDetailsProject();
                }
            },
        });
    }

}
