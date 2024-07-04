import {
  Component,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {
  MessageService,
} from 'src/app/services/_actions/message/message.service';
import { AuthService } from 'src/app/services/request/auth/auth.service';
import {
  CustomerStorageService,
} from 'src/app/services/secure/storages/customer-storage.service';

@Component({
    selector: 'app-evaluator-layout',
    templateUrl: './evaluator-layout.component.html',
    styleUrls: ['./evaluator-layout.component.css']
})
export class EvaluatorLayoutComponent implements OnInit {

    public is_first_evaluateur: boolean = false;
    public is_second_evaluateur: boolean = false;

    constructor(
        private _localeStorage: CustomerStorageService,
        private _route: ActivatedRoute,
        private _loading: NgxUiLoaderService,
        private _coockieService: CookieService,
        private _message: MessageService,
        private _router: Router,
        private _request: AuthService,

    ) {
        // this._route.paramMap.subscribe((params: any) => {
        //     this.ngOnInit();
        // })
        let data = this._localeStorage.getDataToStorage();
        let get_evalueur_niveau = data.niveau_name
        let evaluator_niveau = get_evalueur_niveau.toLocaleLowerCase();

        if(evaluator_niveau == 'instructeur 1'){
            this.is_first_evaluateur = true;
            this.is_second_evaluateur = false;
        }else if(evaluator_niveau == 'instructeur 2'){
            this.is_first_evaluateur = false;
            this.is_second_evaluateur = true;
        }

        let id: any = this._coockieService.get('us_id');
        if(data == null){
            this._request.logOut(id).subscribe(
                {
                    next: (response: any) => {
                        if (response.code == 200) {
                            sessionStorage.clear();
                            this._coockieService.delete('dragonFly');
                            localStorage.removeItem('Ramzan_Kadyrov');
                            this._router.navigateByUrl('/');
                        }
                    }, error: (error: any) => {
                        this._loading.stop();
                        let _error = error.error;
                        if (error.status == 401 || _error.message == "Token has expired") {
                            localStorage.removeItem('Ramzan_Kadyrov');
                            this._coockieService.delete('us_id');
                            this._coockieService.delete('dragonFly');
                            this._message.tokenExpired();
                            this._router.navigateByUrl('/');
                            window.location.reload();
                        }
                    }
                }
            )
        }
     }

    ngOnInit() {

    }
}
