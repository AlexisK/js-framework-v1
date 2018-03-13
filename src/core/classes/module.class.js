const modulesBuffer = {};

export class Module {
    constructor() {
        this.__childModules = [];
        this.__providerStorage = {};
        let classRef = this.constructor;

        if ( classRef.modules ) {
            classRef.modules.forEach(moduleClass => this.addChildModule(moduleClass));
        }


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
        this.__childModules.forEach(module => module.destroy());
    }

    addChildModule(moduleClass) {
        let module = modulesBuffer[moduleClass.name] || (modulesBuffer[moduleClass.name] = new moduleClass());
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
}
