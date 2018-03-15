import {Module} from "core/classes";
import {SharedModule} from "../shared/shared.module";
import {ForumModule, MainModule} from "..";
import {RendererService} from "core/services";

export class AppModule extends Module {
    static modules = [SharedModule];
    static routes = [
        ['#forum', ForumModule],
        ['', MainModule]
    ];
}
