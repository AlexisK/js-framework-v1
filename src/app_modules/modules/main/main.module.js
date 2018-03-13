import {Module} from "core/classes";
import {DashboardService} from "./services/dashboard.service";
import {StateService} from "../../shared/services";

export class MainModule extends Module {
    static provide = [DashboardService];
    static inject = [DashboardService, StateService];
}
