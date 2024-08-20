import { timer } from './src/utils/getTime'
import {templateWL} from "./src/components/WindowLoved/WindowLoved";
import "./src/utils/notebook";
import './style.css'
import { templateCode } from './src/components/Code/codeTemplate';
import { footer } from './src/components/Footer/footer';


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
<footer></footer>
`;

timer();
templateWL();
templateCode();
footer();