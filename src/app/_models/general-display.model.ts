/**
 * General app display model
 */

 export class GeneralAppDisplay {
     constructor(
         public AppName: string,
         public SupportLink: string,
         public enterBtnCaption: string,
         public subHeaderTitle: string,
         public settingsBtnTitle: string,
         public phoneNumberCaption: string,
         public emailAddressCaption: string,
         ) { }
 }