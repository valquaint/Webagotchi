class item {
    gives;
    cost;
    name;
    category;
    style;
    title;

    htmlElement;

    constructor(props) {
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        this.htmlElement = this.createHTMLElement(this.name, props.category === "book" ? this.name : null);
    }

    createHTMLElement(name, title) {
        const ele = document.createElement("button");
        ele.id = this.id;
        const style = typeof this.style === "string" ? [this.style] : this.style
        if (this.style) ele.classList.add(...style);
        if (!title) {
            ele.style.background = `url(assets/items/${name}.png)`;
            ele.style.backgroundSize = "contain";
        } else {
            ele.innerHTML = title
        }

        return ele;
    }
}