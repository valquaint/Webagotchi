let root;

let Pet;
document.addEventListener("DOMContentLoaded", initialize);

const PET_TYPES = [
    {
        TYPE: "slime",
        COLORS: ["brown", "green", "purple"]
    },
    {
        TYPE: "anima",
        COLORS: ["blue", "brown", "purple"]
    }
]


async function initialize() {
    root = document.querySelector("#root");
    root.replaceWith(new viewport({ id: "root", style: "viewport" }));
    root = document.querySelector("#root");
    const Geolocation = await new Geolocate();
    console.log(Geolocation)
    const location = Geolocation.getLocation();
    console.log(location);
    const Forecast = await new Weather(location);

    const bg = new Background({ image: "assets/outside.png" })
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
    const menuButton = new Button({ id: "btn_menu", onClick: toggleMenu, text: "circles_ext", style: ["button", "material-symbols-outlined"], affects: menuContainer });
    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(mainMenu);
    root.appendChild(menuContainer);

    const hotspots_1 = [
        [23, 28, 1],
        [21, 64, 2.8],
        [64, 44, 1.6]
    ]
    for (const hotspot of hotspots_1) {
        const loc = { x: hotspot[0], y: hotspot[1] }
        console.log("===============", loc)
        root.appendChild(new Hotspot({ location: loc }))
    }
    //root.appendChild(Pet.getHTMLElement())
    const pick = Math.floor(Math.random() * hotspots_1.length);
    // Pet.moveTo(hotspots_1[pick][0], hotspots_1[pick][1] + 3, hotspots_1[pick][2]);
    setInterval(async () => await Forecast.update(), 6000);

    tutorial_1();
}

function toggleMenu(menu, button) {
    console.log(menu)
    if (menu.classList.contains("open") === false) {

        menu.style.animation = "menu-open 1s";
        menu.classList.add("open");
        button.style.animation = "menubutton-open 1s";
        button.classList.add("open");
        setTimeout(() => {
            menu.style.animation = null;
            button.style.animation = null;
        }, 1000);
    } else {
        menu.style.animation = "menu-close 1s";
        menu.classList.remove("open");
        button.style.animation = "menubutton-close 1s";
        button.classList.remove("open");
        setTimeout(() => {
            menu.style.animation = null;
            button.style.animation = null;
        }, 1000);
    }
}

function tutorial_1() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = " It looks like you are trying to raise a Webagotchi...";
    const chld = [message];
    const mod = new Modal({
        id: "tutorial", children: chld,
        title: "Welcome to Webagotchi!",
        style: ["modal"],
        options: [{
            name: "Ok", action: tutorial_2
        }]
    })
    root.appendChild(mod.show());
}

function tutorial_2() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = " Let's start off by naming our new Webagotchi friend: ";
    const petName = document.createElement("input");
    message.appendChild(petName);
    const chld = [message];
    const mod = new Modal({
        id: "tutorial", children: chld,
        title: "Welcome to Webagotchi!",
        style: ["modal"],
        options: [{
            name: "Ok", action: () => {
                if (petName.value.length > 0) {
                    tutorial_4(petName.value);
                } else {
                    tutorial_3();
                }
            }
        }]
    })
    root.appendChild(mod.show());
    petName.focus();
}

function tutorial_3() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = " A name is the most important part of creating a bond with our new friend! You really should give it a name... ";
    const petName = document.createElement("input");
    message.appendChild(petName);
    const chld = [message];
    const mod = new Modal({
        id: "tutorial", children: chld,
        title: "Welcome to Webagotchi!",
        style: ["modal"],
        options: [{
            name: "Ok", action: () => {
                if (petName.value.length > 0) {
                    tutorial_4(petName.value);
                } else {
                    tutorial_3();
                }
            }
        }]
    })
    root.appendChild(mod.show());
}

function tutorial_4(name) {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = ` ${name} sounds like a wonderful name for our friend to be! Let's see what our new friend looks like so far...`;

    const chld = [message];
    const mod = new Modal({
        id: "tutorial", children: chld,
        title: "Welcome to Webagotchi!",
        style: ["modal"],
        options: [{
            name: "Ok", action: function() {
                tutorial_5(name)
            }
        }]
    })
    root.appendChild(mod.show());
}

function tutorial_5(name) {
    const petType = Math.floor(Math.random() * PET_TYPES.length)
    const petColor = Math.floor(Math.random() * PET_TYPES[petType].COLORS.length)
    const newPet = {
        TYPE: PET_TYPES[petType].TYPE,
        COLOR: PET_TYPES[petType].COLORS[petColor]
    };
    console.log(`======== PET TYPE: ${newPet.TYPE} ========`)
    Pet = new Webagotchi({
        happiness: 100,
        hunger: 0,
        state: "egg",
        image: `${newPet.TYPE}/${newPet.COLOR}`,
        name: name,
        petType: newPet.TYPE,
        color: newPet.COLOR
    });
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = ` `;

    const chld = [message];
    message.appendChild(Pet.getHTMLElement());
    const nextMessage = document.createElement("p");
    nextMessage.innerHTML = `Fantastic! ${name} looks like a very healthy friend-to-be! A Webagotchi egg!`;

    message.appendChild(nextMessage);
    const mod = new Modal({
        id: "tutorial", children: chld,
        title: "Welcome to Webagotchi!",
        style: ["modal"],
        options: [{ name: "Ok", action: tutorial_6 }]
    })
    root.appendChild(mod.show());
}

function tutorial_6() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = ` `;
    const nextMessage = document.createElement("p");
    nextMessage.innerHTML = `${Pet.name} appears to be the ${Pet.petType} type Webagotchi, and will grow to have a ${Pet.color} look to them. How interesting!`;
    message.appendChild(Pet.getHTMLElement())
    message.appendChild(nextMessage);
    const chld = [message];
    const mod = new Modal({
        id: "tutorial", children: chld,
        title: "Welcome to Webagotchi!",
        style: ["modal"],
        options: [{
            name: "Ok", action: function() {
                tutorial_5(name)
            }
        }]
    })
    root.appendChild(mod.show());
}


function testTheMeter() {
    return Math.floor(Math.random() * 100);
}