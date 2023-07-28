let root;
document.addEventListener("DOMContentLoaded", initialize);

async function initialize(){
    root = document.querySelector("#root");
    root.replaceWith(new viewport({id: "root"}));
}