import { timer } from './src/utils/getTime'
import {templateWL} from "./src/components/WindowLoved/WindowLoved";
import "./src/utils/notebook";
import './style.css'
import { templateCode } from './src/components/Code/codeTemplate';


document.body.innerHTML = `
<div id="notebook"></div>
<h1 id="greeting" ></h1>
<h3 id="date"></h3>
<h3>Name: Juanma</h3>
<h3>Country: Spain 🇪🇸</h3>
<h3>Birth year: 2001</h3>
<div class="me">
<section class="loved" ></section>
<section class="code__book"></section>
</div>
`;

timer();
templateWL();
templateCode();

window.addEventListener("load", () => {
    document.querySelector(".code").addEventListener("click", () => {
        window.scrollTo({
            top: document.body.clientHeight,
            behavior: "smooth"
        })
    });
    document.querySelector(".totop").addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
});
