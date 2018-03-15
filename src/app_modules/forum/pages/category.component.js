import {Component} from "core/classes";
import {ForumDataService} from "../services";
import {ForumCategories} from "../classes/category.class";
import {DefaultTemplateComponent} from "../../app/templates/default-template.component";

export class CategoryPageComponent extends Component {
    static inject = [ForumDataService];
    static template = DefaultTemplateComponent;

    constructor(parent, routeArgs) {
        super(parent);
        this.category = ForumCategories[routeArgs.categoryId];

        this.root.header.cr('h1').value('Forum Category '+this.category.title);

        this.root.menu.cr('a').attr({href: '#forum/categories'}).value('To categories');

    }
}
