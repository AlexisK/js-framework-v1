import {Component} from "core/classes";
import {ForumDataService} from "../services";
import {DefaultTemplateComponent} from "app_modules/app/templates/default-template.component";
import {ForumMenuComponent} from "../components";

export class CategoriesPageComponent extends Component {
    static inject = [ForumDataService];
    static template = DefaultTemplateComponent;

    constructor(parent) {
        super(parent);

        this.dom.push(
            this.root.header.cr('h1').value('Forum'),
            this.root.body.cr('h3').value('Categories:'),
            this.root.menu.cr('strong').value('Forum'),
            this.crComponent(ForumMenuComponent, this.root.menu)
        );

        this.ForumDataService.categories.forEach(category => {
            this.dom.push(this.root.body.cr('a').attr({href: '#forum/category/'+category.id}).value(category.title))
        });
    }
}
