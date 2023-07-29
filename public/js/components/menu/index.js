class Menu {
    menuItems = [];
    constructor(props){
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        const cont = new Container({name: "Menu", id: "Menu", style : props.style});
        for(const item of this.menuItems){
            cont.appendChild(item);
        }
        return cont;
    }
}