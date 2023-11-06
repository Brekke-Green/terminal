import './style.css'
import { setupCounter } from './counter.js'

let commands = {"help": "", "about": "", "skills": "", "projects": "", "interests": ""}

document.querySelector('#app').innerHTML = `
  <div>
    <div id="terminal">
        <div id="history">
            <div> OUTPUT </div>
        </div>
        <div id="command-line">
            <div>visitor@brekkegreen-portfolio:~$</div> <div>█</div>
        </div>
        <button id="counter" type="button"></button>
    </div>
  </div>
`

setupCounter(document.querySelector('#counter'))
