import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-is-old-set-performance',
  templateUrl: './is-old-set-performance.component.html',
  styleUrls: ['./is-old-set-performance.component.css']
})
export class IsOldSetPerformanceComponent implements OnInit{

    public is_commercial_project: boolean = false;
    public is_no_commercial_project: boolean = false;
    public is_help_project: boolean = false;
    public content: string = '';

    constructor(
        private _router: Router,
        @Inject(MAT_DIALOG_DATA)public data: any,
        private _dialogRef: MatDialogRef<IsOldSetPerformanceComponent>,
    ) { }

    ngOnInit() {
        if(this.data != null){
            this.content = this.data.content;
            if(this.data.type == 'no-commercial'){
                this.is_commercial_project = false;
                this.is_no_commercial_project = true;
                this.is_help_project = false;
            }
            if(this.data == 'commercial'){
                this.is_commercial_project = true;
                this.is_no_commercial_project = false;
                this.is_help_project = false;
            }
            if(this.data == 'help'){
                this.is_commercial_project = false;
                this.is_no_commercial_project = false;
                this.is_help_project = true;
            }
        }
    }

    goTo() {
        this.cancel();
        this._router.navigate(['/web.first-evaluateur.help.details-projet', this.content]);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    removeOldData() {
        localStorage.removeItem('is_old_code');
        localStorage.removeItem('is_old_performance_ant');
        this.cancel();
    }

    cancel() {
        this._dialogRef.close('cancel');
    }
}
