import {Base} from "./base.class";
import {Module} from "./module.class";
import {DomEl} from "./index";

export class Component extends Base {
    static _class = Component;

    constructor(parent, dom) {
        super();
        this.dom = [];
        let classRef = this.constructor;

        if ( classRef.template ) {
            if ( parent instanceof classRef.template ) {
                this.root = parent;
            } else {
                this.root = new classRef.template(parent);
            }
        } else {
            this.root = new DomEl(dom).attachTo(parent);
        }
    }

    _destroy() {
        super.destroy();
        this.dom.forEach(el => el.destroy());
        delete this.dom;
    }

    destroy() {
        this._destroy();
        this.root.destroy();
    }

    destroyAndGetTemplate() {
        this._destroy();
        return this.root;
    }
}
