class Hotspot extends Component {
    location;

    constructor(props){
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        this.classList.add("hotspot")
        this.style.left = `${this.location.x}%`;
        this.style.top = `${this.location.y}%`;
        return this;
    }
}