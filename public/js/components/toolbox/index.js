class Toolbox extends Component {
    tools = [];
    style;
    constructor(props){
        super(props);
        if (props) {
            Object.keys(props).forEach(prop => {
                this[prop] = props[prop];
                console.log(`Setting ${prop} to ${props[prop]}`);
            })
        }
        
        for(const item of this.tools){
            const tool = document.createElement("button");
            tool.classList.add("tool");
            tool.addEventListener("click", () => {
                item.action();
                tool.blur();
            })
            tool.style.background = `url(assets/tools/${item.image}.png)`;
            tool.style.backgroundSize= "contain";
            this.appendChild(tool);
        }
        return this
    }
}