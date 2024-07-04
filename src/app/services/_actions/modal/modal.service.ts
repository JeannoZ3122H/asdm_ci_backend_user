import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }


  closeModal(data: any){
    let open_modal:any = data;
    let body:any = document.querySelector('body');
    body.classList.remove('modal-open');
    body.style = "";
    open_modal.classList.remove("show");
    open_modal.style.display = "none";


    document.querySelector('.modal-backdrop')?.remove();
  }

  openModal(data: any){
    let open_modal:any = data;
    let body:any = document.querySelector('body');

    body.classList.add('modal-open');
    body.style.overflow = "hidden";
    body.style.paddingRight = "19px";

    open_modal.classList.add("show");

    open_modal.style.display = "block";
  }
}
