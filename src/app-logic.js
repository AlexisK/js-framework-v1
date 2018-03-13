import {CoreModule} from "./app_modules/modules";

export class AppLogic {
    init() {
        console.log('Init App logic');
        let coreModule = new CoreModule();
        console.log(coreModule);
        coreModule.attachTo(document.getElementById('root-node'));

        window.addEventListener('hashchange', () => coreModule.renderByPath());
        coreModule.renderByPath();
    }
}
