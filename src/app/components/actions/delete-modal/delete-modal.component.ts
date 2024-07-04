import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from 'src/app/app.component';
import { ListeCompteAdminComponent } from 'src/app/pages/admin-pages/liste-compte-admin/liste-compte-admin.component';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {

    constructor(
        private _dialogRef: MatDialogRef<DeleteModalComponent>,
    ) { }

    ngOnInit(): void {

    }

    confirm() {
        this._dialogRef.close('confirm');
    }

    cancel() {
        this._dialogRef.close('cancel');
    }

}
