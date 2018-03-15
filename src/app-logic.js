import {AppModule} from "app_modules/app/app.module";
import {Base} from "core/classes";

export class AppLogic extends Base {
    init() {
        console.log('Init App logic');
        let appModule = new AppModule();
        appModule.attachTo(document.getElementById('root-node'));

        window.addEventListener('hashchange', () => appModule.renderByPath());
        appModule.renderByPath();
    }
}
