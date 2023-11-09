import './style.css'
import { setupCounter } from './counter.js'
import { commands } from './commands.js'

let cursor = document.getElementById("cursor");
let output = document.getElementById("terminal-output");
let command = document.getElementById("typer");
let textarea = document.getElementById("texter");

let commandsHistory = []

document.querySelector('#app').innerHTML = `
  <div>
    <div id="terminal">
        <div id="history">
            <div id="terminal-output">
                <a id="before"></a> 
            </div>
        </div>
        <div id="command-line">
            <div id="path">visitor@brekkegreen-portfolio:~$ </div>
<textarea type="text" id="texter" autofocus=""></textarea><span id="typer"></span><div id="cursor">█</div>
        </div>
        <button id="counter" type="button"></button>
    </div>
  </div>
`

document.getElementById("cursor").addEventListener("click", () => 
    document.getElementById("texter").focus())

document.getElementById("texter").addEventListener("keypress", enterPress)

document.getElementById("texter").addEventListener("click", () => {})

function enterPress(e) {
    if (e.key === "Enter") {
        commandsHistory.push(document.getElementById("typer").innerHTML)
        // Print the line to terminal
        addLine("visitor@brekkegreen-portfolio:~$" + document.getElementById("typer").innerHTML, "no-animation", 0);
        // run the command
        runCommand(document.getElementById("typer").innerHTML.toLowerCase());
        // reset parameters
        document.getElementById("typer").innerHTML = ""
        document.getElementById("texter").value = ""
    } else {
        document.getElementById("typer").innerHTML = document.getElementById("texter").value
    }
}

function runCommand(cmd) {
    switch (cmd) {
        case "help":
            loopLines(commands.help, "", 80);
            break;
        default:
            addLine("<span class=\"inherit\">zsh: command not found: " + cmd + " Type <span class=\"command\">'help'</span> to list available commands.</span>", "error", 100)
    }
}

function addLine(text, style, time) {
    let t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i+1) == " ") {
            t += "&nbsp;&nbsp;"
            i++
        } else {
            t += text.charAt(i)

        }
    }
    setTimeout(function () {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;
        document.getElementById("before").parentNode.insertBefore(next, document.getElementById("before"))
        window.scrollTo(0, document.body.offsetHeight);
    }, time)
}

function loopLines(name, style, time) {
    name.forEach(function (item, index) {
        addLine(item, style, index * time);
    })
}

setupCounter(document.querySelector('#counter'))
