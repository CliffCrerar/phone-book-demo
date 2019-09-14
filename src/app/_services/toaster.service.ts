
/**
 * @description all toaster messages created and served from a central location
 */
import { NbToastrConfig, NbToastrService, NbToastRef } from "@nebular/theme";
import { Inject } from "@angular/core";

@Inject({
    providedIn: 'root'
})
export class HaveSomeToastService {
     configTemplate: NbToastrConfig;
     defaultConfig: NbToastrConfig;
     constructor(private sendToast: NbToastrService){
        defaultConfig = new configTemplate();
     }

     /**
      * @description Send a toast configured on the fly
      */
     getSomeToast = (msg:any="testing", title:any="",config={},toastType:string='info'):NbToastRef => 
     this.sendToast[toastType](msg,title,config);
 }