import {Module} from "core/classes";
import {DashboardService} from "./services/dashboard.service";
import {SharedModule} from "../shared/shared.module";
import {MainComponent} from "./main.component";

export class MainModule extends Module {
    static provide = [DashboardService];
    static modules = [SharedModule];
    static routes = [
        ['', MainComponent]
    ];
}
