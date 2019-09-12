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
    private _appName = 'Phonebook';
    private _supportLink = 'Need Support?';
    private _enterBtnCaption = 'ENTER';
    // Main page
    private _subHeaderTitle = 'Contacts';
    private _settingsBtnTitle = 'Logout';
    private _phoneNumberCaption = 'Phone Number';
    private _emailAddressCaption = 'Email';
    // Side nav controls
    private _collapse = 'Collapse';
    private _search = 'Search';
    private _new = 'Add new';
    private _delete = 'Delete';
    private _logout = 'Log out';
    /*CLASS CONSTRUCTOR */
    constructor() { }

    /* CLASS METHODS */
    getGeneralData(): GeneralAppDisplay {
        return new GeneralAppDisplay(
            this._appName,
            this._supportLink,
            this._enterBtnCaption,
            this._subHeaderTitle,
            this._settingsBtnTitle,
            this._phoneNumberCaption,
            this._emailAddressCaption,
            this._collapse,
            this._search,
            this._new,
            this._delete,
            this._logout
        );
    }
}
