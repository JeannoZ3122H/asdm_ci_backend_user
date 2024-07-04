import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class CustomerStorageService {

    key: string = '1000scripts';
    constructor(
    ) { }

    setDataToStorage(data: string) {
        let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString()
        localStorage.setItem('Ramzan_Kadyrov', data_crypted);
    }


    getDataToStorage = () => {
        const data_crypted: any = localStorage.getItem('Ramzan_Kadyrov');
        const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(data_decrypted);
    }

    setFolderRejectedDataToStorage = (data: any) =>{
        let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString()
        localStorage.setItem('liste_folder_rejected', data_crypted);
        return 'good';
    }

    getFolderRejectedDataToStorage = () => {
        const data_crypted: any = localStorage.getItem('liste_folder_rejected');
        if(data_crypted != null){
            const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);
            return JSON.parse(data_decrypted);
        }else{
            return null;
        }
    }

    // set data for repport
    setResultProjetInfoRepportToLs = (data: any) => {
        let data_crypted = CryptoJS.AES.encrypt(JSON.stringify(data), this.key).toString()
        localStorage.setItem('chazam_repport', data_crypted);
    }
    // get data for repport
    getResultProjetInfoRepportToLs = () => {
        const data_crypted: any = localStorage.getItem('chazam_repport');
        const data_decrypted = CryptoJS.AES.decrypt(data_crypted, this.key).toString(CryptoJS.enc.Utf8);
        return JSON.parse(data_decrypted);
    }


}
