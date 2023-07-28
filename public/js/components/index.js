class Component {
    htmlElement;
    children;
    style;
    id;
    name;
    constructor(props){
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        this.htmlElement = this.createHTMLElement(this.constructor.name);
        return this.htmlElement;
    }

    createHTMLElement(name){
        const ele = document.createElement(name);
        ele.id = this.id;
        ele.classList.add(this.style);
        return ele;
    }
}