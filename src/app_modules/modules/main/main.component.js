import {Component} from "core/classes";

export class MainComponent extends Component {
    constructor(parent) {
        super(parent, 'div');
        this.root.cr('h1').value('Main Component');
        this.root.cr('a').attr({href: '#'}).value('home');
        this.root.cr('a').attr({href: '#forum'}).value('forum');
    }
}
