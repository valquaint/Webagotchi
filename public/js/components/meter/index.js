class Meter extends Component {
    max = 100;
    value = 0;
    bindFunction;

    constructor(props) {
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        if (this.bindFunction !== undefined) {
            setInterval(() => {
                this.value = this.bindFunction();
                this.setAttribute("value", this.value);
                this.setAttribute("max", this.max);
            }, 500);
        }
    }
}