export const ForumCategories = {};

let idIterator = 1;

export class ForumCategory {
    constructor(title) {
        this.id = idIterator++;
        this.title = title;
        this.articles = [];
        ForumCategories[this.id] = this;
    }
}
