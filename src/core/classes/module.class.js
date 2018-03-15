import {DomEl} from "./dom-el.class";
import {Component} from "./component.class";

function clearPathString(path) {
    return path
        .replace(/^\/+/,'')
        .replace(/\/+$/,'');
}

function resolvePath(path, pattern) {
    let variables = [];
    let newPattern = '^'+pattern.replace('/', '\\/').replace(/:([\w\d-]+)/g, (match, varName) => {
        variables.push(varName);
        return '([\\w\\d-]+)'
    });
    let match = new RegExp(newPattern).exec(path);
    if ( match ) {
        let pathArgs = {};
        match = match.slice(1);
        variables.forEach((vName, ind) => {
            pathArgs[vName] = match[ind];
        });
        return pathArgs;
    }
    return null;
}

export const modulesBuffer = {};
export function getModule(moduleClass) {
    return modulesBuffer[moduleClass.name] || (modulesBuffer[moduleClass.name] = new moduleClass());
}

export class Module {
    static _class = Module;

    constructor() {
        // console.log('construct module', this.constructor.name);
        this.__childModules = [];
        this.__providerStorage = {};
        this.__root = new DomEl('div');
        this.__renderedComponent = null;
        let classRef = this.constructor;

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
        // console.log('construct module end', this.constructor.name);
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

    renderByPath() {
        let rules = this._renderByPath();
        if ( !rules ) { return null; }
        let [component, args] = rules;
        if (
            component.template
            && this.__renderedComponent
            && (component.template === this.__renderedComponent.constructor.template)
        ) {
            this.__renderedComponent = new component(this.__renderedComponent.destroyAndGetTemplate(), args);
        } else {
            if ( this.__renderedComponent ) {
                this.__renderedComponent.destroy();
            }
            this.__renderedComponent = new component(this.__root, args);
        }
    }

    _renderByPath(prefix = '', parentArgs = {}) {
        prefix = clearPathString(prefix);
        let path = clearPathString(window.location.href.slice(window.location.origin.length));

        let classRef = this.constructor;
        if ( !classRef.routes ) { return null; }
        for (let i = 0; i < classRef.routes.length; i++ ) {
            let pathPart = clearPathString([prefix, clearPathString(classRef.routes[i][0])].join('/'));
            let pathArgs = resolvePath(path, pathPart);
            if ( pathArgs ) {
                let result = classRef.routes[i][1];

                if ( result._class ===  Module ) {
                    return getModule(result)._renderByPath(
                        pathPart,
                        Object.assign(parentArgs, pathArgs)
                    );

                }
                if ( result._class ===  Component ) {
                    result._provider = this;
                    return [result, pathArgs]

                }
                if ( result.redirectTo ) {
                    window.location.replace([
                        window.location.origin,
                        prefix,
                        clearPathString(result.redirectTo)
                    ].join('/'));
                    return null;
                }

                return null;
            }
        }
        return null;

    }
}
