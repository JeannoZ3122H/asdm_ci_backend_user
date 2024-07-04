import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import {
  AsignedProjetEvaluateurComponent,
} from 'src/app/components/admin-components/asigned-projet-evaluateur/asigned-projet-evaluateur.component';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import { NiveauService } from 'src/app/services/request/niveau/niveau.service';
import {
  ProjetsService,
} from 'src/app/services/request/projets/projets.service';
import {
  AuthorizedService,
} from 'src/app/services/secure/authorized/authorized.service';

@Component({
  selector: 'app-assigned-projets-commercials',
  templateUrl: './assigned-projets-commercials.component.html',
  styleUrls: ['./assigned-projets-commercials.component.css']
})
export class AssignedProjetsCommercialsComponent implements OnInit{

    public _liste_assigned_projet: any;
    public _liste_niveau: any;
    public niveau_name: string = '';
    public current_niv: any = '';
    public p: number =1;
    public is_niveau_1: boolean = true;
    public is_niveau_2: boolean = false;

    _visitor: boolean = false;
    constructor(
        private _dialog: MatDialog,
        private _request: ProjetsService,
        private _router: Router,
        private _message: MessageService,
        private _request_niveau: NiveauService,
        private _authorized: AuthorizedService
    ) {
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }
    }

    ngOnInit(){
        this.getNiveau();
        setTimeout(() => {
            this.ListeProjectAssigned(this._liste_niveau[0].niveau_code, this._liste_niveau[0].niveau_name);
        }, 1000);
    }

    getNiveau(){
        this._request_niveau.getListeNiveau().subscribe(
            {
                next: (response: any) =>{
                    this._liste_niveau = response;
                    localStorage.setItem('niveau_code', this._liste_niveau[0].niveau_code);
                },
                error: (error: any)=>{
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        )
    }

    ListeProjectAssigned(niveau_code: any, niveau_name: string){
        localStorage.setItem('niveau_code', niveau_code);
        this.current_niv = niveau_name;
        this._request.getAsignedProjetCommercial(niveau_code).subscribe(
            {
                next: (response: any) =>{
                    this._liste_assigned_projet = response;
                },
                error: (error: any)=>{
                    if (error.status == 401) {
                        this._message.tokenExpired();
                        localStorage.clear();
                        this._router.navigateByUrl('/');
                        window.location.reload();
                    }
                }
            }
        )
    }


    reasignedAsEvaluator(data: any) {
        localStorage.setItem('niveau_code', data.niveau_code);
        Object.assign(data, {type_asigned:'reasigned'});
        const dialogRef = this._dialog.open(AsignedProjetEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    let niveau_name;
                    niveau_name = data.niveau_code == 'NIV-01'?this._liste_niveau[0].niveau_name:this._liste_niveau[1].niveau_name
                    this.ListeProjectAssigned(data.niveau_code, niveau_name);
                }
            },
        });
    }
}
