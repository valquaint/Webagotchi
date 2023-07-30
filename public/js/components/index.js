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
        if(this.children){
            for(const child of this.children){
                this.htmlElement.appendChild(child);
            }
        }
        return this.htmlElement;
    }

    createHTMLElement(name){
        const ele = document.createElement(name);
        ele.id = this.id;
        const style = typeof this.style === "string" ? [this.style] : this.style
        if(this.style) ele.classList.add(...style);
        return ele;
    }
}