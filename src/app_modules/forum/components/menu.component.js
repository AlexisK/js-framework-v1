import {Component} from "core/classes";
import {ForumDataService} from "../services";

export class ForumMenuComponent extends Component {
    static inject = [ForumDataService];

    constructor(parent) {
        super(parent, 'div');
        this.root.cls('group');

        this['ForumDataService'].categories.forEach(category => {
            this.dom.push(this.root.cr('a').attr({href: '#forum/category/'+category.id}).value(category.title))
        });
    }
}
