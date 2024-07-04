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
  AsignedProjetEvaluateurComponent,
} from 'src/app/components/admin-components/asigned-projet-evaluateur/asigned-projet-evaluateur.component';
import {
  AsignedProjetNonCommercialEvaluateurComponent,
} from 'src/app/components/admin-components/asigned-projet-non-commercial-evaluateur/asigned-projet-non-commercial-evaluateur.component';
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
  selector: 'app-details-commercial-o-non-commercial-project-admin-subv',
  templateUrl: './details-commercial-o-non-commercial-project-admin-subv.component.html',
  styleUrls: ['./details-commercial-o-non-commercial-project-admin-subv.component.css']
})
export class DetailsCommercialONonCommercialProjectAdminSubvComponent implements OnInit{

    // var details
    public swot_opportunity: any = [];
    public swot_menace: any = [];
    public swot_force: any = [];
    public swot_faiblesse: any = [];
    public recap_besoin_exprime: any = [];
    public resultat_attendus: any = [];
    public planning: any = [];
    public piece_jointe: any = [];
    public objectif_specifique: any = [];
    public mise_en_oeuvre: any = {};
    public beneficiaire: any = {};
    public impact_project: any = {};
    public besoin_exprimer: any = [];
    public fonctionnement_data: any = [];
    public doc_list: any = [];
    public project_data: any = {};
    public user_data: any = {};
    public user_email: string = '';
    _visitor: boolean = false;

    constructor(
        private _message: MessageService,
        private _request: ProjetsService,
        private _router: Router,
        private _route_active: ActivatedRoute,
        private _coockie: CookieService,
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

    ngOnInit() {
        this.getProjetDetails();
    }


    getProjetDetails(){
        let get_projet_code_encrypt: any = this._route_active.snapshot.paramMap.get('project_code');
        // console.log(get_projet_code_encrypt)
        this._request.getGlobalProjetDetails(get_projet_code_encrypt).subscribe(
            {
                next: (response: any)=>{

                    this.project_data = response.project_data;
                    this.doc_list = response.doc_list;
                    this.planning = response.planning;
                    this.piece_jointe = response.piece_jointe;
                    this.objectif_specifique = response.objectif_specifique;
                    this.mise_en_oeuvre = response.mise_en_oeuvre;
                    this.fonctionnement_data = response.fonctionnement_data;
                    this.besoin_exprimer = response.besoin_exprimer;

                    this.impact_project = response.impact_project;
                    this.impact_project.impact_business = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_business);
                    this.impact_project.impact_secteur_medias = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_secteur_medias);
                    this.impact_project.impact_sous_secteur = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.impact_sous_secteur);
                    this.impact_project.indicateurs = this.sanitizer.bypassSecurityTrustHtml(this.impact_project.indicateurs);

                    this.beneficiaire = response.beneficiaire;
                    this.beneficiaire.beneficiaire_directs = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_directs);
                    this.beneficiaire.beneficiaire_indirects = this.sanitizer.bypassSecurityTrustHtml(this.beneficiaire.beneficiaire_indirects);


                    this.recap_besoin_exprime = response.recap_besoin_exprime;
                    this.resultat_attendus = response.resultat_attendus;
                    this.swot_faiblesse = response.swot_faiblesse;
                    this.swot_force = response.swot_force;
                    this.swot_menace = response.swot_menace;
                    this.swot_opportunity = response.swot_opportunity;

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

    asignedAsEvaluator(data: any){
        Object.assign(data, {type_asigned:'asigned'});

        if(this.project_data.type_category_code == "TC-001"){
            const dialogRef = this._dialog.open(AsignedProjetEvaluateurComponent,
            {
                panelClass: 'fullscreen-dialog',
                data
            });
            dialogRef.afterClosed().subscribe({
                next: (val: any) => {
                    if (val == 'close') {
                        this.getProjetDetails();
                    }
                },
            });
        }

        if(this.project_data.type_category_code == "TC-002"){
            const dialogRef = this._dialog.open(AsignedProjetNonCommercialEvaluateurComponent,
            {
                panelClass: 'fullscreen-dialog',
                data
            });
            dialogRef.afterClosed().subscribe({
                next: (val: any) => {
                    if (val == 'close') {
                        this.getProjetDetails();
                    }
                },
            });
        }
    }

    back(){
        this._location.back();
    }
}
