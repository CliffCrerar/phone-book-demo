/**
 * @description toast message model
 */

export class ToastMessageModel {
    constructor(
        public title: string,
        public msg: string,
        public type: string,
        public icon: string,
        public duration: number = 3000
    ) {}
}