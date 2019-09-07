/**
 * @name AppDataService
 * @description Service to supply the interface with display and definition data
 * data received from HTTP service is injected and provided by this service.
 * @param {none}
 */

import { GeneralAppDisplay } from 'src/app/_models/general-display.model';

export class AppDataService {
    /* CLASS ATTRIBUTES */
    general;
    // Loging Page
    private _appName = "Phonebook";
    private _supportLink = "Need Support?"
    private _enterBtnCaption = "ENTER"
    /*CLASS CONSTRUCTOR */
    constructor(){}

    /* CLASS METHODS */
    getGeneralData(): GeneralAppDisplay {
        return new GeneralAppDisplay(
            this._appName,this._supportLink,this._enterBtnCaption
        )
    }
}