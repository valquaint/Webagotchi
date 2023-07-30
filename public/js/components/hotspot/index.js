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
        this.style.left = location.x;
        this.style.top = location.y;
    }
}