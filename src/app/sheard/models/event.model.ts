export class MyMEvent {
    constructor(

        public type: string,
        public amount: number,
        public category: number,
        public date: Date | string,
        public description: string,
        public id?: number,
        public catName?: string

    ) {

    }
}