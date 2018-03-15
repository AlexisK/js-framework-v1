import {Base} from "core/classes";
import {ForumCategory} from "../classes/category.class";

export class ForumDataService extends Base {
    constructor() {
        super();

        this.categories = [
            new ForumCategory('Admin'),
            new ForumCategory('Tech'),
            new ForumCategory('Food'),
            new ForumCategory('Humor')
        ]
    }
}
