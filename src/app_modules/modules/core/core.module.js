import {Module} from "core/classes";
import {StateService} from "../../shared/services";
import {MainModule} from "../";

export class CoreModule extends Module {
    static provide = [StateService];
    static modules = [MainModule];
}
