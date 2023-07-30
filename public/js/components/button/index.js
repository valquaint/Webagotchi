class Button extends Component {
    onClick;
    text;
    affects;
    constructor(props){
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        this.innerHTML = this.text;
        this.addEventListener("click", () => {
            this.onClick(this.affects, this)
        })
    }
}