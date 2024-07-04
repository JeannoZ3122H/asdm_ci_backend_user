import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  selector: 'app-global-projets',
  templateUrl: './global-projets.component.html',
  styleUrls: ['./global-projets.component.css']
})
export class GlobalProjetsComponent implements OnInit{

    public _liste_global_projet: any;
    public is_global_projet: boolean = true;
    public is_assigned_projet: boolean = false;
    public p: number =1;


    _visitor: boolean = false;
    constructor(
        private _dialog: MatDialog,
        private _request: ProjetsService,
        private _router: Router,
        private _message: MessageService,
        private _authorized: AuthorizedService
    ){
        let data: any = this._authorized.authorizedUser();
        if(data == true){
            this._visitor = true;
        }else{
            this._visitor = false;
        }
    }

    ngOnInit(){
        this.getGlobalProjetHelp();
    }

    getGlobalProjetHelp(){

        this._request.getGlobalProjetHelp().subscribe(
            {
                next: (response: any) =>{
                    this._liste_global_projet = response;
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

    goToListeGlobalProjet(){
        this.is_global_projet = true;
        this.is_assigned_projet = false;
    }

    goToListeAssignedProjet(){
        this.is_global_projet = false;
        this.is_assigned_projet = true;
    }

    asignedAsEvaluator(data: any){
        Object.assign(data, {type_asigned:'asigned'});
        const dialogRef = this._dialog.open(AssignedProjetHelpEvaluateurComponent,
        {
            panelClass: 'fullscreen-dialog',
            data
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == 'close') {
                    this.getGlobalProjetHelp();
                }
            },
        });
    }
}
