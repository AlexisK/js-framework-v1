import {MainModule} from "./app_modules/modules";

export class AppLogic {
    init() {
        console.log('Init App logic');
        console.log(new MainModule());
    }
}
