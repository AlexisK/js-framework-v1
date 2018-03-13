import {Component} from "core/classes";
import {ForumDataService} from "../services";

export class CategoriesPageComponent extends Component {
    static inject = [ForumDataService];

    constructor(parent) {
        super(parent, 'div');

        this.root.cr('h1').value('Forum');

        this.root.cr('a').attr({href: '#'}).value('Home');

        this.root.cr('h3').value('Categories:');

        this.ForumDataService.categories.forEach(category => {
            this.root.cr('a').attr({href: '#forum/category/'+category.id}).value(category.title)
        });
    }
}
