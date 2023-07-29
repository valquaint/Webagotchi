class Weather {
    forecast;
    location;
    current;
    constructor(location){
        console.log(location);
        return new Promise(async (resolve) => {
            this.location = location;
            const wapi = await fetch(`https://api.weather.gov/points/${location.lat},${location.long}`)
            this.forecast = (await wapi.json()).properties.forecast;
            console.log(this.forecast);
            resolve(this);
        })
    }

    getForecast(){
        console.log(this.forecast);
        return new Promise(async (resolve) => {
            const wapi = await fetch(`${this.forecast}/hourly`)
            const weather = (await wapi.json());
            console.log(weather);
            resolve(weather);
        })
    }

    async update(){
        const weather = await this.getForecast();
        const current = weather.properties.periods[0];
        this.current = {
            temperature : current.temperature,
            sky: current.shortForecast,
            rain: current.probabilityOfPrecipitation.value,
            daytime : current.isDaytime,
            wind: current.windSpeed
        }
        console.log(this.current);
    }
}

class Geolocate {
    location;
    constructor() {
        return new Promise((resolve) => {
            if ("geolocation" in navigator) {
                console.log("Attempting to use Geolocation Services")
                try {
                    navigator.geolocation.getCurrentPosition((position) => {
                        this.location = {
                            lat: position.coords.latitude,
                            long: position.coords.longitude
                        };
                        console.log("location: ", this.location)
                        resolve( this);
                    });
                } catch (err) {
                    console.log("Geolocation Services Denied")
                }
            }
        })
    }

    getLocation(){
        return this.location;
    }
}