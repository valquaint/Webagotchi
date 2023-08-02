class Label extends Component {
    text;
    isfor;
    updater;
    constructor(props){
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        if(this.isfor) this.setAttribute("for", this.isfor);
        
        this.innerHTML = this.text;
        if(props.updater){
            setInterval(() => {
                this.innerHTML = props.updater()
            }, 1000);
        }
    }
}