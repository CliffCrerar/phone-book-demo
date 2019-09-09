/**
 * Enumerated class represented by the new contact input boxes
 */

export class NewContact {
    constructor(
        public name: string,
        public placeholder: string,
        public value?: string,
        public inputState = 'info',
        public inputValid = null
    ) { }

    /**
     * @description Regular expression to validate email address input
     * TODO:
     */
    validEmailPattern(): string {
        return '/^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
    }

    /**
     * @description Regular expression to validate phone number input
     * TODO:
     */
    validPhoneNumberPattern(): string {
        return '(?:(?:(\s*\(?([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\)?\s*(?:[.-]\s*)?)([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})'
    }
}
