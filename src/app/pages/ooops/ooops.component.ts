import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ooops',
  templateUrl: './ooops.component.html',
  styleUrls: ['./ooops.component.css']
})
export class OoopsComponent implements OnInit{


    constructor(private _location: Location){}

    ngOnInit(): void {

    }

    goToBack(){this._location.back();}
}
