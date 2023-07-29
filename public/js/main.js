let root;
document.addEventListener("DOMContentLoaded", initialize);

async function initialize(){
    root = document.querySelector("#root");
    root.replaceWith(new viewport({id: "root", style:"viewport"}));
    root = document.querySelector("#root");
    const testMenu1 = document.createElement("h4");
    const testMenu2 = document.createElement("h4");
    const testMenu3 = document.createElement("h4");
    const testMenu4 = document.createElement("h4");
    testMenu1.innerHTML = "Test Menu Item";
    testMenu2.innerHTML = "Test Menu Item";
    testMenu3.innerHTML = "Test Menu Item";
    testMenu4.innerHTML = "Test Menu Item";
    const MenuItems = [
        testMenu1,
        testMenu2,
        testMenu3,
        testMenu4
    ]
    root.appendChild(new Menu({menuItems: MenuItems, style:"menu"}))
    const Geolocation = await new Geolocate();
    console.log(Geolocation)
    const location = Geolocation.getLocation();
    console.log(location);
    const Forecast = await new Weather(location);
    // console.log(await Forecast.getForecast())
    await Forecast.update();
    const disp_weather = new WeatherDisplay({id: "weather", text: `Pending...`, style: "weather", bindFunction: () => {
        return Forecast.current;
    }});
    root.appendChild(disp_weather);
    const Hunger = [
        new Label({id: "lbl_hunger", text: `Hunger`, style: "hunger", isfor:"bar_hunger"}),
        new Meter({bindFunction: testTheMeter, id: "bar_hunger", style: ["meter","hunger"]})
    ] 

    const Happiness = [
        new Label({id: "lbl_happiness", text: `Happiness`, style: "happiness", isfor:"bar_happiness"}),
        new Meter({bindFunction: testTheMeter, id: "bar_happiness", style: ["meter","happiness"]})
    ] 

    root.appendChild(new StatPanel({panelItems: [Hunger, Happiness], style:"statpanel"}))
    setInterval( async () =>  await Forecast.update(), 6000);
}

function testTheMeter(){
    return Math.floor(Math.random() * 100);
}