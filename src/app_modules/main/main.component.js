import {Component} from "core/classes";
import {DefaultTemplateComponent} from "../app/templates/default-template.component";

export class MainComponent extends Component {
    static template = DefaultTemplateComponent;

    constructor(parent) {
        super(parent);
        this.root.header.cr('h1').value('Main Component');
        this.root.body.cr('a').attr({href: '#'}).value('home');
        this.root.body.cr('a').attr({href: '#forum'}).value('forum');
        this.root.menu.cr('a').attr({href: '#forum'}).value('forum');
    }
}
