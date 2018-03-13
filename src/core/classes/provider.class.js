import {Injectable} from "./injectable.class";

export class Provider extends Injectable {
    constructor(params = {}) {
        super();
        this.provideList = params.provide || [];
        this.storage = {};


    }

    destroy() {
        delete this.storage;
        delete this.provideList;
        super.destroy();
    }
}
