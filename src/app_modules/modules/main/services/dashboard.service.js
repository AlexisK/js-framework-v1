import {Base} from "core/classes";
import {StateService} from "app_modules/shared/services";

export class DashboardService extends Base {
    static inject = [StateService];

    constructor() {
        super();
        console.log('DashboardService constructed!', this);
    }
}
