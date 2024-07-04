import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import  *  as CryptoJS from  'crypto-js';


@Injectable({
    providedIn: 'root'
})
export class CustomerCookieService {

    key: string = '1000scripts';
    constructor(
        private cookieService: CookieService,
    ) { }

// Connection To Dashboard //
    // set Info
    setTokenToCookie (token: string) {
        let token_crypted = CryptoJS.AES.encrypt(token, this.key).toString()
        this.cookieService.set('dragonFly', token_crypted);
    }

    setKeywordToCookie(keyword: string){
        let keyword_crypted = CryptoJS.AES.encrypt(keyword, this.key).toString()
        this.cookieService.set('keyword', keyword_crypted);
    }

    setEmailToCookie (email: string) {
        let email_crypted = CryptoJS.AES.encrypt(email, this.key).toString()
        this.cookieService.set('htag', email_crypted);
    }

    // get Info
    getTokenToCookie = () => {
        const token_crypted = this.cookieService.get('dragonFly');
        const token_decrypted = CryptoJS.AES.decrypt(token_crypted, this.key).toString(CryptoJS.enc.Utf8);
        return token_decrypted;
    }

    getEmailToCookie = () => {
        const token_crypted = this.cookieService.get('htag');
        const email_decrypted = CryptoJS.AES.decrypt(token_crypted, this.key).toString(CryptoJS.enc.Utf8);
        return email_decrypted;
    }

    getKeywordToCookie = () => {
        const token_crypted = this.cookieService.get('keyword');
        const keyword_decrypted = CryptoJS.AES.decrypt(token_crypted, this.key).toString(CryptoJS.enc.Utf8);
        return keyword_decrypted;
    }

}
