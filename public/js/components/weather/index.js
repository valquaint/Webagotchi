class WeatherDisplay extends Component {
    text;
    bindFunction;
    lastWind;
    constructor(props){
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        const img_weather = document.createElement("img");
        const lbl = new Label({id: "lbl_weather", text: `Pending...`, style: "weather"});
        const wind = new Label({id: "lbl_wind", text: `&uarr;`, style: "wind"});
        const speed = new Label({id: "lbl_windspeed", text: `0 mph`, style: "speed"})
        lbl.innerHTML = this.text;
        this.appendChild(img_weather);
        this.appendChild(lbl);
        this.appendChild(wind);
        this.appendChild(speed);
        if (this.bindFunction !== undefined) {
            setInterval(async () => {
                const current = this.bindFunction();
                lbl.innerHTML = `${current.temperature}&deg;F`;
                img_weather.src = `assets/${current.sky}.png`;
                if(this.lastWind) wind.classList.replace(this.lastWind, current.windDirection)
                else wind.classList.add(current.windDirection);
                this.lastWind = current.windDirection;
                speed.innerHTML = current.wind;
            }, 6000);
        }
    }
}