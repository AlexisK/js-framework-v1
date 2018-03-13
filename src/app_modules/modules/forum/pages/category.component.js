import {Component} from "core/classes";
import {ForumDataService} from "../services";
import {ForumCategories} from "../classes/category.class";

export class CategoryPageComponent extends Component {
    static inject = [ForumDataService];

    constructor(parent, routeArgs) {
        super(parent, 'div');
        this.category = ForumCategories[routeArgs.categoryId];

        this.root.cr('h1').value('Forum Category '+this.category.title);

        this.ForumDataService.categories.forEach(category => {
            this.root.cr('a').attr({href: '#forum/category/'+category.id}).value(category.title)
        });
    }
}
