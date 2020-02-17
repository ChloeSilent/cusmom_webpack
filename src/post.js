export default class Post {
    constructor(title, logo) {
        this.title = title;
        this.date = new Date();
        this.img = logo;

    }

    toString() {
       return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            img: this.img
        })
    }
    getUppercaseTitle () {
        return this.title.toUpperCase()
    }
}