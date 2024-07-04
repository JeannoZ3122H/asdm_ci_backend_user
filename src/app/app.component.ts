import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
} from '@angular/router';

import { CookieService } from 'ngx-cookie-service';

import { MessageService } from './services/_actions/message/message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'asdm-backend-ci';


    constructor(
        private _message: MessageService,
        private _coockie: CookieService,
        private _router: Router
    ){
        _router.events.forEach((event: any) => {
            if (event instanceof NavigationEnd) {
                switch (true) {
                    case (event.url != "/web.forgot-password"):
                    {
                        localStorage.removeItem('sve');
                        localStorage.removeItem('srpe');
                        localStorage.removeItem('iup');
                        break;
                    }
                }
            }
        });
    }

    ngOnInit() {
        let online_user = this._coockie.get('dragonFly');
        let status_verify_email = localStorage.getItem('sve');
        if (!online_user && this._router.url != '/web.forgot-password' && status_verify_email == null) {
            this._message.tokenExpired();
            this._router.navigate(['/']);
        }
    }
}
