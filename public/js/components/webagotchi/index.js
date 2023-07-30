class Webagotchi {
    happiness;
    hunger;
    state;
    image;
    name;

    htmlElement;
    children;

    constructor(props) {
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        this.htmlElement = this.createHTMLElement("webagotchi");
    }

    createHTMLElement(name) {
        const ele = document.createElement(name);
        ele.id = "Webagotchi";
        ele.classList.add("webagotchi", this.state.toLowerCase());
        ele.style.backgroundImage = `url(assets/${this.image}.gif)`;
        //ele.style.transform= `translate(-32px)`;
        return ele;
    }

    getHTMLElement(){
        return this.htmlElement;
    }

    moveTo(x, y, scale){
        this.htmlElement.style.top = `${y.toString()}%`;
        this.htmlElement.style.left = `${x.toString()}%`;
        if(scale) this.scale(scale);
    }

    scale(v){
        this.htmlElement.style.width = `${v * 64}px`;
        const half = (v * 64);
        //this.htmlElement.style.transform= `translate(-${half}px)`;
    }
}