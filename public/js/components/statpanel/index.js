class StatPanel extends Component{
    panelItems = [];
    constructor(props){
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        
        for(const item of this.panelItems){
            const cont = new Container({name: "Stats", id: `Stats_${item[0].innerHTML}`, style : props.style});
            cont.appendChild(item[0]);
            cont.appendChild(item[1]);
            console.log(this);
            this.appendChild(cont);
        }
        return this
    }
}