import {Module} from "core/classes";
import {SharedModule} from "../../shared/shared.module";

export class CoreModule extends Module {
    static modules = [SharedModule];
}
