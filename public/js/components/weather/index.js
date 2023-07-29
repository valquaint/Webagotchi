class WeatherDisplay extends Component {
    text;
    bindFunction;
    constructor(props){
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        const img_weather = document.createElement("img");
        const lbl = new Label({id: "lbl_weather", text: `Pending...`, style: "weather"})
        lbl.innerHTML = this.text;
        this.appendChild(img_weather);
        this.appendChild(lbl);
        if (this.bindFunction !== undefined) {
            setInterval(async () => {
                const current = this.bindFunction();
                lbl.innerHTML = `${current.temperature}&deg;F`;
                img_weather.src = current.sky;
            }, 6000);
        }
    }
}