import {Module} from "core/classes/index";
import * as services from "./services/index";
import {CoreModule} from "core";

export class SharedModule extends Module {
    static provide = Object.keys(services).map(k => services[k]);
    static modules = [CoreModule];
}
