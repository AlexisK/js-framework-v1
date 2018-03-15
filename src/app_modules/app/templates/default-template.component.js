import {Component, BehaviourStream} from "core/classes";

export class DefaultTemplateComponent extends Component {
    constructor(parent) {
        super(parent, 'div');
        this.isOpen$ = new BehaviourStream(false);

        this.root.cls('app-default-template');
        this.header = this.root.cr('div').cls('header');
        this.body = this.root.cr('div').cls('body');
        this.footer = this.root.cr('div').cls('footer');

        this.menuRoot = this.root.cr('div').cls('menuRoot');
        this.menuRoot.cr('div').cls('background')
            .addEventListener('click', ev => this.isOpen$.next(false));
        this.menu = this.menuRoot.cr('div').cls('menu');
        this.menu.cr('button').cls('menu-toggle-button').value('M')
            .addEventListener('click', () => this.isOpen$.next(!this.isOpen$.data[0]));

        this.subscriptions.push(
            this.isOpen$.subscribe(state => {
                if ( state ) {
                    this.menuRoot.node.classList.add('opened');
                } else {
                    this.menuRoot.node.classList.remove('opened');
                }
            })
        );


        this.menu.cr('a').attr({href: '#'}).value('home');

    }
}
