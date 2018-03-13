import {Base} from "./base.class";
import {Module} from "./module.class";
import {DomEl} from "./index";

export class Component extends Base {
    static _instanceof = Component;

    constructor(parent, tag) {
        super();
        this.root = new DomEl(tag).attachTo(parent);
    }

    destroy() {
        this.root.destroy();
        super.destroy();
    }
}
