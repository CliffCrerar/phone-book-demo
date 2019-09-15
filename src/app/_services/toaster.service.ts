
/**
 * @description all toaster messages created and served from a central location
 */
import { NbToastrConfig, NbToastrService, NbToastRef, NbGlobalPhysicalPosition } from "@nebular/theme";
import { Inject } from "@angular/core";

//NbGlobalLogicalPosition,
    

@Inject({
    providedIn: 'root'
})
export class HaveSomeToastService {
    duplicatesBehaviour = new NbToastrConfig({
        destroyByClick: true,
        duplicatesBehaviour: 'all',
        duration: 3000,
        hasIcon: true,
        position: NbGlobalPhysicalPosition.BOTTOM_RIGHT
    });
    constructor(private sendToast: NbToastrService) { console.log('this: ', this); }
    //this.defaultConfig = new NbToastrConfig('TI');  }

    /**
     * @description Send a toast configured on the fly
     */
    getSomeToast = (msg: any = "testing", title: any = "", toastType: string = 'info'): NbToastRef =>
        this.sendToast[toastType](msg, title, this.duplicatesBehaviour);


}