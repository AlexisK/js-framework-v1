import {Module} from "core/classes";
import {ForumDataService} from "./services";
import {CategoriesPageComponent} from "./pages";

export class ForumModule extends Module {
    static provide = [ForumDataService];
    static routes = [
        ['categories', CategoriesPageComponent],
        ['', {redirectTo: 'categories'}]
    ];
}
