import {Module} from "core/classes";
import {ForumDataService} from "./services";
import {CategoriesPageComponent, CategoryPageComponent} from "./pages";

export class ForumModule extends Module {
    static provide = [ForumDataService];
    static routes = [
        ['category/:categoryId', CategoryPageComponent],
        ['categories', CategoriesPageComponent],
        ['', {redirectTo: 'categories'}]
    ];
}
