import { timer } from './src/utils/getTime'
import './style.css'


document.body.innerHTML = `
<div id="notebook"></div>
<h1 id="greeting" ></h1>
<h3 id="date"></h3>
<h3>Name: Juanma</h3>
<p><b>I love to...</b></p>
`;

import "./src/utils/notebook";

timer();
