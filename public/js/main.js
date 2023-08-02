let root;
let hotspots_1 = [];
let Pet;
let Money;
let Items;
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
        new Meter({ bindFunction: getHunger, id: "bar_hunger", style: ["meter", "hunger"] })
    ]

    const Happiness = [
        new Label({ id: "lbl_happiness", text: `Happiness`, style: "happiness", isfor: "bar_happiness" }),
        new Meter({ bindFunction: getHappiness, id: "bar_happiness", style: ["meter", "happiness"] })
    ]
    const moneyMeter = [
        new Label({ id: "lbl_Money", text: `Money`, style: "money", isfor: "count_money" }),
        new Label({ id: "ctn_money", style: ["counter"], updater: updateMoney })
    ]
    root.appendChild(new StatPanel({ id: "Stats", panelItems: [Hunger, Happiness, moneyMeter], style: "statpanel" }))
    const menuContainer = document.createElement("div");
    menuContainer.classList.add("menucontainer");
    const mnuInfo = document.createElement("button");
    mnuInfo.classList.add("menu", "info")
    mnuInfo.addEventListener("click", showInfo);
    const mnuShop = document.createElement("div");
    mnuShop.addEventListener("click", showShop);
    const testMenu3 = document.createElement("div");
    const testMenu4 = document.createElement("div");
    mnuInfo.innerHTML = "Info";
    mnuShop.innerHTML = "Shop";
    testMenu3.innerHTML = "Test Menu Item";
    testMenu4.innerHTML = "Test Menu Item";
    const MenuItems = [
        mnuInfo,
        mnuShop,
        testMenu3,
        testMenu4
    ]
    const mainMenu = new Menu({ menuItems: MenuItems, style: "menu" });
    const menuButton = new Button({ id: "btn_menu", onClick: toggleMenu, text: "circles_ext", style: ["button", "material-symbols-outlined"], affects: menuContainer });
    menuContainer.appendChild(menuButton);
    menuContainer.appendChild(mainMenu);
    root.appendChild(menuContainer);

    hotspots_1 = [
        [23, 28, 1],
        [21, 64, 2.8],
        [64, 44, 1.6]
    ]
    for (const hotspot of hotspots_1) {
        const loc = { x: hotspot[0], y: hotspot[1] }
        console.log("===============", loc)
        root.appendChild(new Hotspot({ location: loc }))
    }

    const pick = Math.floor(Math.random() * hotspots_1.length);
    setInterval(async () => await Forecast.update(), 6000);
    const loadData = await Load();
    if (loadData) Pet = new Webagotchi(loadData);
    console.log(`======`)
    console.log(Pet);
    if (!Pet) begin();
    else {
        root.appendChild(Pet.getHTMLElement())
        Pet.moveTo(hotspots_1[pick][0], hotspots_1[pick][1] + 3, hotspots_1[pick][2]);
    }
    const tools = [
        {
            action: Wash,
            image: "wash"
        },
        {
            action: Feed,
            image: "feed"
        },
        {
            action: Play,
            image: "play"
        },
        {
            action: Read,
            image: "read"
        },
        {
            action: Adventure,
            image: "explore"
        },
    ]
    const toolbox = new Toolbox({ id: "Toolbox", tools: tools, style: "toolbox" });
    root.appendChild(toolbox);
}

function updateMoney() {
    return Money;
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

function begin() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = "Welcome to Webagotchi! Your online buddy! Take care of your new friend, and raise it from a small egg with limitless potential, to a grown, happy creature you can share!<br /> <br />This game requires some minimal cookies in order to run. None of your personal data is stored, nor shared.";
    const chld = [message];
    const mod = new Modal({
        id: "Begin", children: chld,
        title: "Cookies and Privacy Notice",
        style: ["modal"],
        options: [{
            name: "Ok", action: tutorial_1
        }]
    })
    root.appendChild(mod.show());
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
            name: "Ok", action: function () {
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
    Pet.hunger = 89;
    Pet.happiness = 30;
    Save();
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
            name: "Ok", action: function () {
                for (const hotspot of hotspots_1) {
                    const loc = { x: hotspot[0], y: hotspot[1] }
                    console.log("===============", loc)
                    root.appendChild(new Hotspot({ location: loc }))
                }

                const pick = Math.floor(Math.random() * hotspots_1.length);
                root.appendChild(Pet.getHTMLElement())
                Pet.moveTo(hotspots_1[pick][0], hotspots_1[pick][1] + 3, hotspots_1[pick][2]);
            }
        }]
    })
    root.appendChild(mod.show());
}

function Save() {
    localStorage.setItem("Webagotchi", JSON.stringify(Pet));
    localStorage.setItem("Money", Money.toString());
    //console.log(Items);
    localStorage.setItem("Items", JSON.stringify(Items));
    // TODO: save time value for offline-to-next processing
}

function Load() {
    return new Promise((resolve) => {
        const loaded = JSON.parse(localStorage.getItem("Webagotchi")) || null
        Money = parseInt(localStorage.getItem("Money") || "0") || 0
        Items = JSON.parse(localStorage.getItem("Items")) || [];
        // TODO: Load value for time offline-to-next
        // TODO: Process various Webagotchi stats based on offline time
        resolve(loaded)
    })
}

function getHappiness() {
    return Pet?.happiness || 0;
}

function getHunger() {
    return Pet?.hunger || 0;
}

function showInfo() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = `All About ${Pet.name}`;
    const stats = {
        Happiness: Pet.happiness,
        Hunger: Pet.hunger,
        "Life Stage": Pet.state,
        Type: Pet.petType,
        Color: Pet.color,
        Age: "Work in Progress"
    }
    for (const val of Object.keys(stats)) {
        const stat = document.createElement("div");
        stat.innerHTML = `${val} : ${stats[val]}`;
        message.appendChild(stat);
    }
    message.style.display = "flex";
    message.style.flexDirection = "column";
    message.style.alignItems = "center";
    const chld = [message];
    const mod = new Modal({
        id: "infoDialog", children: chld,
        title: "Info",
        style: ["modal"],
        options: [{
            name: "Ok", action: () => {
                return
            }
        }]
    })
    root.appendChild(mod.show());
}

function showShop() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = `Shop`;
    const shop = [
        new item({
            category: "food",
            cost: 10,
            name: "Celery",
            gives: {
                hunger: -10,
                happiness: 15
            },
            style: "shopItem"
        }),
        new item({
            category: "food",
            cost: 20,
            name: "Peach",
            gives: {
                hunger: -20,
                happiness: 30
            },
            style: "shopItem"
        }),
        new item({
            category: "food",
            cost: 40,
            name: "Sandwich",
            gives: {
                hunger: -40,
                happiness: 60
            },
            style: "shopItem"
        }),
        new item({
            category: "food",
            cost: 10,
            name: "Goldfruit",
            gives: {
                hunger: -80,
                happiness: 80
            },
            style: "shopItem"
        }),
        new item({
            category: "toy",
            cost: 20,
            name: "Blocks",
            gives: {
                hunger: 15,
                happiness: 30
            },
            style: "shopItem"
        }),
        new item({
            category: "toy",
            cost: 50,
            name: "Sandbox",
            gives: {
                hunger: 25,
                happiness: 50
            },
            style: "shopItem"
        }),
        new item({
            category: "toy",
            cost: 80,
            name: "Horseshoes",
            gives: {
                hunger: 40,
                happiness: 80
            },
            style: "shopItem"
        }),
        new item({
            category: "adventure",
            cost: 120,
            name: "LaserTag",
            gives: {
                hunger: 10,
                happiness: 20
            },
            style: "shopItem"
        }),
        new item({
            category: "book",
            cost: 60,
            name: "The Count() of Coffee Python",
            gives: {
                hunger: 10,
                happiness: 10
            },
            style: "shopBook"
        }),
        new item({
            category: "book",
            cost: 70,
            name: "The DaVinci Program",
            gives: {
                hunger: 10,
                happiness: 10
            },
            style: "shopBook"
        }),
        new item({
            category: "book",
            cost: 120,
            name: "How to Talk To Your Webagotchi about Nuclear Fission",
            gives: {
                hunger: 10,
                happiness: 10
            },
            style: "shopBook"
        })
    ]
    const prod = document.createElement("div");
    for (const itm of shop) {
        itm.htmlElement.addEventListener("click", buy.bind(this, itm));
        prod.appendChild(itm.htmlElement)
    }
    prod.classList.add("shopWindow")
    message.appendChild(prod);
    prod.style.display = "flex";
    prod.style.flexDirection = "row";
    const chld = [message];
    const mod = new Modal({
        id: "shopDialog", children: chld,
        title: "Shop",
        style: ["modal"],
        options: [{
            name: "Ok", action: () => {
                return
            }
        }]
    })
    root.appendChild(mod.show());
}

function buy(itm) {
    console.log(itm)
    if (Money >= itm.cost) {
        Money -= itm.cost;
        Items.push(new item(itm));
        Save();
    }
}

function Wash() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = `You wash ${Pet.name}:`;
    const happinessGain = Math.floor(Math.random() * 8);
    const moneyGain = Math.floor(Math.random() * 13);
    Pet.happiness += happinessGain;
    Money += moneyGain;
    if (Pet.happiness > 100) Pet.happiness = 100;
    const gainP = document.createElement("p");
    gainP.innerHTML = `${Pet.name} gained ${happinessGain} happiness.`
    const gainM = document.createElement("p");
    gainM.innerHTML = `You gained ${moneyGain} money.`
    const result = document.createElement("p");
    result.innerHTML = `${Pet.name}'s happiness is now ${Pet.happiness}!`
    message.appendChild(gainP);
    message.appendChild(gainM);
    message.appendChild(result);
    const chld = [message];
    const mod = new Modal({
        id: "careDialog", children: chld,
        title: "Wash Webagotchi",
        style: ["modal"],
        options: [{
            name: "Ok", action: Save
        }]
    })
    root.appendChild(mod.show());
}

function Feed() {
    const message = document.createElement("div");
    message.classList.add("main");
    const options = [];
    for (const itm of Items) {
        if (itm.category === "food") {
            options.push(itm)
        }
    }
    console.log(options)
    const pick = Math.floor(Math.random() * options.length)
    console.log(pick)
    const food = options[pick] || null;
    console.log(food)
    if (food) {
        message.innerHTML = `You feed ${Pet.name} the ${food.name}:`;
        const happinessGain = Math.floor(Math.random() * food.gives.happiness);
        // TODO: Make based on quality of food selected
        const hungerLoss = Math.floor(Math.random() * food.gives.hunger);
        Pet.happiness += happinessGain;
        Pet.hunger += hungerLoss
        if (Pet.happiness > 100) Pet.happiness = 100;
        if (Pet.hunger < 0) Pet.hunger = 0;
        const gainP = document.createElement("p");
        gainP.innerHTML = `${Pet.name} gained ${happinessGain} happiness.`
        const lossP = document.createElement("p");
        lossP.innerHTML = `${Pet.name} changed by ${hungerLoss} hunger.`
        const result = document.createElement("p");
        result.innerHTML = `${Pet.name}'s happiness is now ${Pet.happiness}, and their hunger is now ${Pet.hunger}!`
        message.appendChild(gainP);
        message.appendChild(lossP);
        message.appendChild(result);
        const rem = Items.indexOf(food);
        Items.splice(rem, 1);
        Save();
    } else {
        message.innerHTML = `You don't have any food to feed ${Pet.name}!`;
    }
    const chld = [message];
    const mod = new Modal({
        id: "careDialog", children: chld,
        title: "Feed Webagotchi",
        style: ["modal"],
        options: [{
            name: "Ok", action: Save
        }]
    })
    root.appendChild(mod.show());
}

function Play() {
    const message = document.createElement("div");
    message.classList.add("main");
    const options = [];
    for (const itm of Items) {
        if (itm.category === "toy") {
            options.push(itm)
        }
    }
    console.log(options)
    const pick = Math.floor(Math.random() * options.length)
    console.log(pick)
    const toy = options[pick] || null;
    console.log(toy)
    if (toy) {
        message.innerHTML = `You and ${Pet.name} play with the ${toy.name}:`;
        const happinessGain = Math.floor(Math.random() * toy.gives.happiness);
        const hungerGain = Math.floor(Math.random() * toy.gives.hunger);
        Pet.happiness += happinessGain;
        Pet.hunger += hungerGain
        if (Pet.happiness > 100) Pet.happiness = 100;
        if (Pet.hunger > 100) Pet.hunger = 100;
        const gainP = document.createElement("p");
        gainP.innerHTML = `${Pet.name} gained ${happinessGain} happiness.`
        const hungerP = document.createElement("p");
        hungerP.innerHTML = `${Pet.name} changed by  ${hungerGain} hunger.`
        const result = document.createElement("p");
        result.innerHTML = `${Pet.name}'s happiness is now ${Pet.happiness}, and their hunger is now ${Pet.hunger}!`
        message.appendChild(gainP);
        message.appendChild(hungerP);
        message.appendChild(result);
        const rem = Items.indexOf(toy);
        Items.splice(rem, 1);
        Save();
    } else {
        message.innerHTML = `You don't have any to use to play with ${Pet.name}!`;
    }
    const chld = [message];
    const mod = new Modal({
        id: "careDialog", children: chld,
        title: "Play with Webagotchi",
        style: ["modal"],
        options: [{
            name: "Ok", action: Save
        }]
    })
    root.appendChild(mod.show());
}

function Read() {
    const message = document.createElement("div");
    message.classList.add("main");
    const options = [];
    for (const itm of Items) {
        if (itm.category === "book") {
            options.push(itm)
        }
    }
    console.log(options)
    const pick = Math.floor(Math.random() * options.length)
    console.log(pick)
    const book = options[pick] || null;
    console.log(book)
    if (book) {
        message.innerHTML = `You read ${book.name} to ${Pet.name}:`;
        const happinessGain = Math.floor(Math.random() * book.gains.happiness);
        const hungerGain = Math.floor(Math.random() * book.gains.hunger);
        Pet.happiness += happinessGain;
        Pet.hunger += hungerGain
        if (Pet.happiness > 100) Pet.happiness = 100;
        if (Pet.hunger > 100) Pet.hunger = 100;
        const gainP = document.createElement("p");
        gainP.innerHTML = `${Pet.name} gained ${happinessGain} happiness.`
        const hungerP = document.createElement("p");
        hungerP.innerHTML = `${Pet.name} hunger changed by ${hungerGain} hunger.`
        const result = document.createElement("p");
        result.innerHTML = `${Pet.name}'s happiness is now ${Pet.happiness}, and their hunger is now ${Pet.hunger}!`
        message.appendChild(gainP);
        message.appendChild(hungerP);
        message.appendChild(result);
        const rem = Items.indexOf(book);
        Items.splice(rem, 1);
        Save();
    }else{
        message.innerHTML = `You don't have any books to read ${Pet.name}!`
    }
    const chld = [message];
    const mod = new Modal({
        id: "careDialog", children: chld,
        title: "Read to Webagotchi",
        style: ["modal"],
        options: [{
            name: "Ok", action: Save
        }]
    })
    root.appendChild(mod.show());
}

function Adventure() {
    const message = document.createElement("div");
    message.classList.add("main");
    message.innerHTML = `You go on an adventure with ${Pet.name}:`;
    // TODO: Make based on weather, have random encounters, and make into small choose path type progressive loop
    const happinessGain = Math.floor(Math.random() * 40);
    const hungerGain = Math.floor(Math.random() * 40);
    Pet.happiness += happinessGain;
    Pet.hunger += hungerGain
    if (Pet.happiness > 100) Pet.happiness = 100;
    if (Pet.hunger > 100) Pet.hunger = 100;
    const gainP = document.createElement("p");
    gainP.innerHTML = `${Pet.name} gained ${happinessGain} happiness.`
    const hungerP = document.createElement("p");
    hungerP.innerHTML = `${Pet.name} gained ${hungerGain} hunger.`
    const result = document.createElement("p");
    result.innerHTML = `${Pet.name}'s happiness is now ${Pet.happiness}, and their hunger is now ${Pet.hunger}!`
    message.appendChild(gainP);
    message.appendChild(hungerP);
    message.appendChild(result);
    const chld = [message];
    const mod = new Modal({
        id: "careDialog", children: chld,
        title: "Adventure with Webagotchi",
        style: ["modal"],
        options: [{
            name: "Ok", action: Save
        }]
    })
    root.appendChild(mod.show());
}