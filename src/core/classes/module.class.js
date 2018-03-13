import {DomEl} from "./dom-el.class";
import {Component} from "./component.class";


function clearPathString(path) {
    return path
        .replace(/^\/+/,'')
        .replace(/\/+$/,'');
}

const modulesBuffer = {};
function getModule(moduleClass) {
    return modulesBuffer[moduleClass.name] || (modulesBuffer[moduleClass.name] = new moduleClass());
}


export class Module {
    static _instanceof = Module;

    constructor() {
        this.__childModules = [];
        this.__providerStorage = {};
        this.__root = new DomEl('div');
        this.__renderedInstance = null;
        let classRef = this.constructor;

        if ( classRef.modules ) {
            classRef.modules.forEach(moduleClass => this.addChildModule(moduleClass));
        }


        if ( classRef.provide ) {
            classRef.provide.forEach(cls => {
                cls._provider = this;
                this.__providerStorage[cls.name] = new cls();
            });
        }
        if ( classRef.inject ) {
            classRef.inject.forEach(cls => this[cls.name] = this.getInjection(cls.name));
        }
        if ( classRef.modules ) {
            classRef.modules.forEach(moduleClass => this.addChildModule(moduleClass));
        }
    }

    destroy() {
        this.__childModules.forEach(module => module.destroy());
    }

    addChildModule(moduleClass) {
        let module = getModule(moduleClass);
        this.__childModules.push(module);
        this.__providerStorage = Object.assign({}, module.__providerStorage, this.__providerStorage);
    }

    removeModuleInstance(moduleInst) {
        let ind = this.__childModules.indexOf(moduleInst);
        if ( ind >= 0 ) {
            this.__childModules.splice(ind, 1);
        }
    }

    getInjection(key) {
        return this.__providerStorage[key];
    }

    attachTo(target) {
        this.__root.attachTo(target);
    }

    renderByPath(prefix = '') {
        this.clearView();
        prefix = clearPathString(prefix);
        let path = clearPathString(window.location.href.slice(window.location.origin.length));

        let classRef = this.constructor;
        if ( !classRef.routes ) { return this.__root; }
        for (let i = 0; i < classRef.routes.length; i++ ) {
            let pathPart = clearPathString([prefix, clearPathString(classRef.routes[i][0])].join('/'));

            if ( path.indexOf(pathPart) === 0 ) {
                let result = classRef.routes[i][1];
                if ( result._instanceof ===  Module ) {
                    this.__renderedInstance = [Module, getModule(result).renderByPath(pathPart).attachTo(this.__root)];
                } else if ( result._instanceof ===  Component ) {
                    result._provider = this;
                    this.__renderedInstance = [Component, new result(this.__root)];
                } else {
                    if ( result.redirectTo ) {
                        window.location.replace([
                            window.location.origin,
                            prefix,
                            clearPathString(result.redirectTo)
                        ].join('/'))
                    }
                }
                return this.__root;
            }
        }
        return this.__root;
    }

    clearView() {
        if ( this.__renderedInstance ) {
            if ( this.__renderedInstance[0] === Component ) {
                this.__renderedInstance[1].destroy();
            } else {
                this.__renderedInstance[1].detach();
            }
            this.__renderedInstance = null;
        }
    }
}
