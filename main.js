import './style.css'
import { commands, editors } from './commands.js'

let commandsHistory = ["<br>",]

window.onload = () => setTimeout(function() {
    loopLines(commands.banner, "", 80);
}, 100);

document.querySelector('#app').innerHTML = `
  <div>
    <div id="terminal">
        <div id="history">
            <div id="terminal-output">
                <a id="before"></a> 
            </div>
        </div>
        <div id="command-line">
            <textarea type="text" id="texter" autofocus=""></textarea>
            <div class="path">visitor@brekkegreen-portfolio:~$ </div>
            <span id="typer"></span><div id="cursor">█</div>
        </div>
    </div>
  </div>
`

document.getElementById("texter").focus()

document.getElementById("cursor").addEventListener("click", () => 
    document.getElementById("texter").focus())

document.getElementById("texter").addEventListener("keypress", enterPress)
document.getElementById("texter").addEventListener("keyup", checkText)

function enterPress(e) {
    if (e.key === "Enter") {
        e.preventDefault()
        commandsHistory.push(document.getElementById("typer").innerHTML)
        // Print the line to terminal
        addLine("visitor@brekkegreen-portfolio:~$ " + document.getElementById("typer").innerHTML, "path", 0);
        // run the command
        runCommand(document.getElementById("typer").innerHTML.toLowerCase());
        // reset parameters
        document.getElementById("typer").innerHTML = "";
        document.getElementById("texter").value = "";
    }
}

function checkText() {
    if (document.getElementById("texter").value.length !== document.getElementById("typer").innerHTML.length) {
        document.getElementById("typer").innerHTML = document.getElementById("texter").value
    }
}

function runCommand(cmd) {
    switch (cmd) {
        case "about":
            loopLines(commands.about, "", 80);
            break;
        case "help":
            loopLines(commands.help, "", 80);
            break;
        case "banner":
            loopLines(commands.banner, "", 80);
            break;
        case "contact":
            loopLines(commands.contact, "", 80);
            break;
        case "socials":
            loopLines(commands.socials, "", 80);
            break;
        case "projects":
            loopLines(commands.projects, "", 80);
            break;
        case "resume":
            loopLines(commands.resume, "", 80);
            break;
        case "skills":
            loopLines(commands.skills, "", 80);
            break;
        case "editors":
            loopLines(editors, "", 80);
            break;
        case "vi .":
            addLine('<iframe src="https://giphy.com/embed/N1b2aqEIPAFnnRLJvX" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', "", 80);
            break;
        case "vim .":
            addLine('<iframe src="https://giphy.com/embed/TJPQBOfPGpgmQ" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', "", 80);
            break;
        case "nvim .":
            addLine('<iframe src="https://giphy.com/embed/OXIi87VLaIzGE" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', "", 80);
            break;
        case "emacs":
            addLine('<iframe src="https://giphy.com/embed/HteV6g0QTNxp6" width="480" height="267" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', "", 80);
            break;
        case "code .":
            addLine('<iframe src="https://giphy.com/embed/VpVtXxTR5Ub2E" width="480" height="247" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>', "", 80);
            break;
        case "hint":
            loopLines(commands.hint, "", 80);
            break;
        case "clear":
            setTimeout(function() {
                document.getElementById("terminal-output").innerHTML = '<a id="before"></a>';
            }, 1);
            break;
        case "history":
            commandsHistory.push("<br>")
            loopLines(commandsHistory, "history", 80);
            commandsHistory.pop()
            break;
        default:
            addLine("<span class=\"info\">zsh: command not found: \"" + cmd + "\" ... Type <span class=\"command\">'help'</span> to list available commands.</span>", "error", 100)
    }
}

function addLine(text, style, time) {
    let t = "";
    let tagFlag = false;
    let ignoreFlag = false;
    for (let i = 0; i < text.length; i++) {
        // if (text.charAt(i) == " " && text.charAt(i+1) == " ") {
        if (text.charAt(i) == "Ø") {
            ignoreFlag = true 
        }
        if (!ignoreFlag) {
            if (text.charAt(i) == "<") {
                tagFlag = true
            }
            if (text.charAt(i) == ">") {
                tagFlag = false 
            }
        }
        if (text.charAt(i) == " " && !tagFlag) {
            t += "&nbsp;"
            // i++
        } else if (text.charAt(i) == "Ø") {
            continue
        } else {
            t += text.charAt(i)
        }
    }
    ignoreFlag = false
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
