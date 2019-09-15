
/**
 * @description a class to use for creating toast messages on the fly
 */
import { NbToastrConfig, NbToastrService, NbToastRef, NbGlobalPhysicalPosition } from '@nebular/theme';
import { Inject } from '@angular/core';
import { ToastMessageModel } from '../_models/toastMessage.modal';
// NbGlobalLogicalPosition,

@Inject({
    providedIn: 'root'
})
export class HaveSomeToastService {
    private toastOptions = new NbToastrConfig({
        destroyByClick: true,
        duplicatesBehaviour: 'all',
        duration: 3000,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
        icon: ''
    });
    constructor(private sendToast: NbToastrService) { console.log('this: ', this); }
    // this.defaultConfig = new NbToastrConfig('TI');  }

    /**
     * @description Send a toast configured on the fly
     */
    getSomeToast(param: ToastMessageModel): NbToastRef {
        // const { msg, title, type, icon } = param;
        this.toastOptions.icon = param.icon;
        this.toastOptions.duration = param.duration;
        return this.sendToast[param.type](param.msg, param.title, this.toastOptions);
    }
}
