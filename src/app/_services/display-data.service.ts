/**
 * @name AppDataService
 * @description Service to supply the interface with display and definition data
 * data received from HTTP service is injected and provided by this service.
 * @param {none}
 */

import { GeneralAppDisplay } from 'src/app/_models/general-display.model';

export class AppDataService {
    /* CLASS ATTRIBUTES */
    // Login Page
    private _appName = "Phonebook";
    private _supportLink = "Need Support?";
    private _enterBtnCaption = "ENTER";
    // Main page
    private _subHeaderTitle = "Contact";
    private _settingsBtnTitle = "Logout"
    private _phoneNumberCaption = "Phone Number"
    private _emailAddressCaption = "Email"
    /*CLASS CONSTRUCTOR */
    constructor(){}

    /* CLASS METHODS */
    getGeneralData(): GeneralAppDisplay {
        return new GeneralAppDisplay(
            this._appName,
            this._supportLink,
            this._enterBtnCaption,
            this._subHeaderTitle,
            this._settingsBtnTitle,
            this._phoneNumberCaption,
            this._emailAddressCaption
        )
    }
}