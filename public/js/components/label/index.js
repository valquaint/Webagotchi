class Label extends Component {
    text;
    isfor;
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
    }
}