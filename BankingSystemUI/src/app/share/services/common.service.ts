import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppConstants } from '../constant/constant';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(private authService: AuthService) { }

    getCreateObj() {
        return {
            "createdBy": +this.authService.getlocalStorageValue(AppConstants.UserID) || 0,
            "createdOn": new Date(),
            "createdByIP": this.authService.getlocalStorageValue(AppConstants.IPAddress) || '',
        }
    }

    getUpdateObj() {
        return {
            "modifiedBy": +this.authService.getlocalStorageValue(AppConstants.UserID) || 0,
            "modifiedOn": new Date(),
            "modifiedByIP": this.authService.getlocalStorageValue(AppConstants.IPAddress) || '',
        }
    }

    removeDefaultProperty(obj: any) {
        const retObj = { ...obj };

        delete retObj.createdBy;
        delete retObj.createdOn;
        delete retObj.createdByIP;

        delete retObj.modifiedBy;
        delete retObj.modifiedOn;
        delete retObj.modifiedByIP;

        return retObj;
    }

    getAccountType() {
        return [
            { name: 'Savings Account', value: 1 },
            { name: 'Current Account', value: 2 }
        ]
    }

    CheckInputIsNumber(evt: any) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
