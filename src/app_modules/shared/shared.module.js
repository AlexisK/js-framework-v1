import {Module} from "core/classes";
import * as services from "./services";

export class SharedModule extends Module {
    static provide = Object.keys(services).map(k => services[k]);
}
