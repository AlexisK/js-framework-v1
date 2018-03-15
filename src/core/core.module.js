import {Module} from "./classes";
import {RoutingService} from "./services";

export class CoreModule extends Module {
    static provide = [RoutingService];
}
