import indexLoved from "../../data";

const windowsLoved = Array.from({ length: indexLoved.length }, (_, i) => indexLoved[i]);
const templateLC = (tagObj) => `
<article class="loved__component" >
<h4>${tagObj.name}</h4>
${{
        "video": `<video src="${tagObj.src}" loop autoplay muted></video>`,
        "img": `<img src="${tagObj.src}" alt="${tagObj.name}">`,
        "button": `<button class="code">${tagObj.text}</button>`
    }[tagObj.type]}
</article>`

export const templateWL = () => {
    const loved = [];
    const lengthLoved = windowsLoved.length;
    for (let i = 0; i < lengthLoved; i++) {
        const tag = windowsLoved[i];
        const returnedLC = templateLC(tag);
        loved.push(returnedLC);
    }

    const finalTemplate = loved.join("");
    const section = document.createElement("section");
    section.innerHTML = finalTemplate

    document.body.append(section);

}
