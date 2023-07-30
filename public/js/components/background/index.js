class Background extends Component {

    hotspots;
    image;

    constructor(props) {
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        if (this.hotspots) {
            for (const hotspot of hotspots) {
                this.appendChild(new Hotspot({ location: hotspot }));
            }
        }
        this.style.background = `url(${this.image})`;
        this.style.backgroundSize= "cover";
        return this;
    }

}