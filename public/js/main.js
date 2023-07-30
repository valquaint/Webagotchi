let root;
document.addEventListener("DOMContentLoaded", initialize);

async function initialize() {
    root = document.querySelector("#root");
    root.replaceWith(new viewport({ id: "root", style: "viewport" }));
    root = document.querySelector("#root");
    const Geolocation = await new Geolocate();
    console.log(Geolocation)
    const location = Geolocation.getLocation();
    console.log(location);
    const Forecast = await new Weather(location);

    const bg = new Background({image: "assets/outside.png"})
    root.appendChild(bg);
    // console.log(await Forecast.getForecast())
    await Forecast.update();
    const disp_weather = new WeatherDisplay({
        id: "weather", text: `Pending...`, style: "weather", bindFunction: () => {
            return Forecast.current;
        }
    });
    root.appendChild(disp_weather);
    const Hunger = [
        new Label({ id: "lbl_hunger", text: `Hunger`, style: "hunger", isfor: "bar_hunger" }),
        new Meter({ bindFunction: testTheMeter, id: "bar_hunger", style: ["meter", "hunger"] })
    ]

    const Happiness = [
        new Label({ id: "lbl_happiness", text: `Happiness`, style: "happiness", isfor: "bar_happiness" }),
        new Meter({ bindFunction: testTheMeter, id: "bar_happiness", style: ["meter", "happiness"] })
    ]

    root.appendChild(new StatPanel({ id: "Stats", panelItems: [Hunger, Happiness], style: "statpanel" }))
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menucontainer");
    const testMenu1 = document.createElement("div");
    const testMenu2 = document.createElement("div");
    const testMenu3 = document.createElement("div");
    const testMenu4 = document.createElement("div");
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
    const mainMenu = new Menu({ menuItems: MenuItems, style: "menu" });
    const menuButton = new Button({ id: "btn_menu", onClick: toggleMenu, text: "circles_ext", style: ["button","material-symbols-outlined"], affects: menuContainer });
    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(mainMenu);
    root.appendChild(menuContainer);
    const Pet = new Webagotchi({happiness: 100,
        hunger: 0,
        state: "EGG",
        image: "body/slime/brown",
        name:"Tony"});
    const hotspots_1 = [
        [23,28, 1],
        [21,64, 2.8],
        [64,44, 1.6]
    ]
    for(const hotspot of hotspots_1){
        const loc = {x: hotspot[0], y: hotspot[1]}
        console.log("===============", loc)
        root.appendChild(new Hotspot({location: loc}))
    }
    root.appendChild(Pet.getHTMLElement())
    const pick = Math.floor(Math.random() * hotspots_1.length);
    Pet.moveTo(hotspots_1[pick][0],hotspots_1[pick][1]+3, hotspots_1[pick][2]);
    setInterval(async () => await Forecast.update(), 6000);
}

function toggleMenu(menu) {
    console.log(menu)
    if (menu.classList.contains("open") === false) {
        menu.style.animation = "menu-open 1s";
        menu.classList.add("open");
        setTimeout(() => {
            menu.style.animation = null;
        }, 1000);
    } else {
        menu.style.animation = "menu-close 1s";
        menu.classList.remove("open");
        setTimeout(() => {
            menu.style.animation = null;
        }, 1000);
    }
}

function testTheMeter() {
    return Math.floor(Math.random() * 100);
}