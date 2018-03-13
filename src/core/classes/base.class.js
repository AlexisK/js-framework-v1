export class Base {
    constructor() {
        this._provider = this.constructor._providerPass;
        this._inject();
    }
    destroy() {};

    _inject() {
        let classRef = this.constructor;
        if ( classRef.inject ) {
            classRef.inject.forEach(cls => this[cls.name] = this._getInjection(cls.name));
        }
    }

    _getInjection(key) {
        if ( !this._provider ) { throw new Error('No local provider for '+this.constructor.name); }
        return this._provider.getInjection(key);
    }
}
