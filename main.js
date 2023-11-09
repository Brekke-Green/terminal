import './style.css'
import { setupCounter } from './counter.js'

let cursor = document.getElementById("cursor");
let output = document.getElementById("terminal-output");
let command = document.getElementById("typer");
let textarea = document.getElementById("texter");


let commands = {"help": "", "about": "", "skills": "", "projects": "", "interests": "", "banner": ""}
let commandsHistory = []


document.querySelector('#app').innerHTML = `
  <div>
    <div id="terminal">
        <div id="history">
            <div id="terminal-output"></div>
        </div>
        <div id="command-line">
            <div id="path">visitor@brekkegreen-portfolio:~$</div>
<textarea type="text" id="texter" autofocus=""></textarea><div id="cursor">█</div>
        </div>
        <button id="counter" type="button"></button>
    </div>
  </div>
`

document.getElementById("cursor").addEventListener("click", () => 
    document.getElementById("texter").focus())

document.getElementById("texter").addEventListener("keypress", (e) => {if (e.key === "Enter") { document.getElementById("terminal-output").innerHTML = document.getElementById("texter").value} })

document.getElementById("texter").addEventListener("click", () => {})

setupCounter(document.querySelector('#counter'))
