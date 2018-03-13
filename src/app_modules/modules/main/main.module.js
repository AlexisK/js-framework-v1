import {Module} from "core/classes";
import {DashboardService} from "./services/dashboard.service";
import {StateService} from "../../shared/services";
import {SharedModule} from "../../shared/shared.module";

export class MainModule extends Module {
    static provide = [DashboardService];
    static modules = [SharedModule];
    static inject = [DashboardService, StateService];
}
