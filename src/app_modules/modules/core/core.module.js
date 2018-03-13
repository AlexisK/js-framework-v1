import {Module} from "core/classes";
import {SharedModule} from "../../shared/shared.module";
import {ForumModule, MainModule} from "../";

export class CoreModule extends Module {
    static modules = [SharedModule];
    static routes = [
        ['#forum', ForumModule],
        ['#', MainModule],
        ['', MainModule]
    ];
}
