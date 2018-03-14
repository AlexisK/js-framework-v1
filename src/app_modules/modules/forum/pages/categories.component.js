import {Component} from "core/classes";
import {ForumDataService} from "../services";
import {DefaultTemplateComponent} from "../../core/templates/default-template.component";

export class CategoriesPageComponent extends Component {
    static inject = [ForumDataService];

    constructor(parent) {
        super(new DefaultTemplateComponent(parent));

        this.root.header.cr('h1').value('Forum');

        this.root.body.cr('h3').value('Categories:');

        this.ForumDataService.categories.forEach(category => {
            this.root.body.cr('a').attr({href: '#forum/category/'+category.id}).value(category.title)
        });
    }
}
