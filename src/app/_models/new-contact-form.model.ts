/**
 * Enumerated class represented by the new contact input boxes
 */

export class NewContact {
    constructor(
        public name: string,
        public placeholder: string,
        public value?: string
    ) { }
}
