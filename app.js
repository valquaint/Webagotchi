const express = require('express');
const bodyParser = require('body-parser');
const path = require("node:path");
const livereload = require("livereload");
const connectLivereload = require("connect-livereload");
const winston = require('winston');
let config;
try{
    config = require("./config.json") || null;
}catch(err){
    console.warn("Config file is not properly formatted. Unable to load config. Please check that it is valid JSON.");
}

const mainTransport = new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize({
            level: true,
            colors: {
                info: "blue",
                debug: "orange",
                error: "red"
            }
        }),
        winston.format.splat(),
        winston.format.simple()
    )
})
winston.add(mainTransport);

const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, './public'));

const app = express();

const findPort = process.argv.find((arg) => {
    if(arg.match(/-p:\d/gi)){
        return true
    }
})?.replace(/-p:/gi,"") || config?.port || 4242



app.use(connectLivereload());
app.use(bodyParser.json());

app.use("/", express.static(path.resolve(path.join(__dirname, "./public"))))

app.listen(findPort, console.log(`Webagotchi is live at http://localhost:${findPort}`));



app.post("/console", (req, res) => {
    if (process.argv.indexOf("debug") > -1) {
        for (const r of req.body) {
            if (typeof (r) === "object") {
                winston.info("From frontend, Object:")
                console.log(r);
            } else {
                winston.info(r);
            }
        }
    }

    res.sendStatus(200);
})

liveReloadServer.server.once("connection", () => {
    console.log("Reconnected to frontend...")
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});