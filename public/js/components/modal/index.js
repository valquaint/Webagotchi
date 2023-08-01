class Modal {
    htmlElement;
    children;
    style;
    options;
    title;

    constructor(props) {
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        this.htmlElement = this.createHTMLElement(props.id);
    }

    createHTMLElement(name) {
        const modal_window = document.createElement("modal");
        const title = document.createElement("div");
        title.innerHTML = this.title;
        title.classList.add("title");
        const close = document.createElement("button");
        close.classList.add("modal","close","material-symbols-outlined")
        close.innerHTML = "close";
        const content = document.createElement("div1");
        const ele = document.createElement("div2");
        content.classList.add("content");
        for(const child of this.children){
            content.appendChild(child);
        }
        const options = document.createElement("div");
        options.classList.add("options");
        for(const opt of this.options){
            const btn = document.createElement("button");
            btn.addEventListener("click", () => {
                this.close();
                opt.action();
            });
            btn.innerHTML = opt.name;
            options.appendChild(btn);
        }
        ele.id = `modal_${name}`;
        ele.classList.add("modal", ...this.style);
        ele.classList.add("modal-cover");
        ele.appendChild(modal_window);
        modal_window.appendChild(title);
        title.appendChild(close);
        modal_window.appendChild(content);
        modal_window.appendChild(options);
        return ele;
    }

    close(){
        this.htmlElement.remove();
    }

    show(){
        return this.htmlElement;
    }


}