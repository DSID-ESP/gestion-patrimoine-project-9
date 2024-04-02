
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class SecuriteService {

    private tokenFromUI = environment.tokenFromUI;


    constructor() {
    }

    encryptUsingAES256(request: string): string {
        let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        let _iv = CryptoJS.lib.WordArray.random(16);
        let encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(request), _key, {
            // keySize: 16,
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }

    decryptUsingAES256(encrypted: string): string {
        let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
        let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

        let decrypted = CryptoJS.AES.decrypt(
            encrypted, _key, {
            keySize: 16,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }
        ).toString(CryptoJS.enc.Utf8);

        return decrypted.substring(1, decrypted.length - 1);
    }


}
