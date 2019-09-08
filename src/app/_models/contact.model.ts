/**
 * Contacts list model
 */

export class ContactModel {
    constructor(
        public _id: string,
        public Updated: Date,
        public FirstName: string,
        public LastName: string,
        public Email:string,
        public Phone: string,
        public CreatedDate: Date,
        public intId: number
    ){}
}


export class ContactsDisplayModel {
    constructor(
        public FirstName?: string,
        public LastName?: string,
        public Phone?: string,
        public Email?:string,
        public intId?: number,
        public _id?: string,
    ) {}
}