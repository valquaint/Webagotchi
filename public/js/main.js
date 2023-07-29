let root;
document.addEventListener("DOMContentLoaded", initialize);

async function initialize(){
    root = document.querySelector("#root");
    root.replaceWith(new viewport({id: "root"}));
    const Geolocation = await new Geolocate();
    console.log(Geolocation)
    const location = Geolocation.getLocation();
    console.log(location);
    const Forecast = await new Weather(location);
    // console.log(await Forecast.getForecast())
    setInterval(async () => {
        await Forecast.update()
    }, 60000)
}