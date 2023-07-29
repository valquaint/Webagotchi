class StatPanel {
    panelItems = [];
    constructor(props){
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        const cont = new Container({name: "Stats", id: "Stats", style : props.style});
        for(const item of this.panelItems){
            cont.appendChild(item[0]);
            cont.appendChild(item[1]);
        }
        return cont;
    }
}