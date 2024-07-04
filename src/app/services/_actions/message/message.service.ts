import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

    constructor(private toastr: ToastrService) { }

    errorField = () => {
        return this.toastr.error(
            'Les champs sont obligatoire','Problème',
            //position: 'bottom'
        );
    }

    error = (data: any) => {
        return this.toastr.error(
            data.message,
            data.status
        );
    }

    tokenExpired() {
        return this.toastr.error('Connexion expiré');
    }

    successOperation = (data: any) => {
        return this.toastr.success(
            data.message,
            data.status
        );
    }
}
