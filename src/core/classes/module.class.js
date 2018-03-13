export class Module {
    constructor(parent) {
        this.__parentModule = parent;
        this.__childModules = [];
        this.__providerStorage = {};
        let classRef = this.constructor;

        if ( classRef.provide ) {
            classRef.provide.forEach(cls => {
                cls._providerPass = this;
                let newClsInstance = new cls();
                newClsInstance._provider = this;
                this.__providerStorage[cls.name] = newClsInstance;
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
        if ( this.__parentModule ) {
            this.__parentModule.removeModuleInstance(this);
            delete this.__parentModule;
        }
    }

    addChildModule(moduleClass) {
        this.__childModules.push(new moduleClass(this));
    }

    removeModuleInstance(moduleInst) {
        let ind = this.__childModules.indexOf(moduleInst);
        if ( ind >= 0 ) {
            this.__childModules.splice(ind, 1);
        }
    }

    getInjection(key) {
        return this.__providerStorage[key] || (this.__parentModule && this.__parentModule.getInjection(key));
    }
}
