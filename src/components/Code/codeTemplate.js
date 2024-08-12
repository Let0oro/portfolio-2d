import data from "./data";
import "./main.scss";
import "../../utils/flipPaper";
import { flipPaper } from "../../utils/flipPaper";

const pageContent = (title, subtitle, description, logo, time, extra) => `
<div class="page text-page">
    <h4><div><img src="${logo}" alt="${title} logo" /></div>${title}</h4>
    <h5>${subtitle}</h5> - <span>${time}</span>
    <p>Description: ${description}</p>
    <p>${extra.join(" | ")}</p>
</div>
`;

const genBook = (tag) => {

    const content = data[tag];
    const titleBook = {"xp": "Experience", "pj": "Studies"}[tag];

    let arrContent = [];
    for (let i = 0; i < content.length; i++) {
        const ctn = content[i];
        const parseObj = {
            title: ctn.company || ctn.school,
            subtitle: ctn.position || ctn.course,
            description: ctn.description,
            logo: ctn.logo,
            time : ctn.time,
            extra: ctn.experience || ctn.extra_knowledge,
        };
        const { title, subtitle, description, logo, time, extra } = parseObj;
        arrContent.push(pageContent(title, subtitle, description, logo, time, extra));
    }
    if (content.length % 2) arrContent.push("<div class='page text-page'></div>");

    return `
    <article class="book_container ${tag}">
        <div class="book">
            <div class="page" ><img alt="" src="../../public/assets/images/${tag}_img.jpg" /></div>
            <div class="page text-page"></div>
            ${arrContent.join("")}
        </div>
        <span class="title" >${titleBook}</span>
    </article>
    `;
}


const codeTemplate = () => {
    const xpBook = genBook("xp");
    const pjBook = genBook("pj");
    return `
    <article class="bookset" >
    ${pjBook}
    ${xpBook}
    </article>
    `
};

export const templateCode = () => {
    const template = codeTemplate();
    document.querySelector(".code__book").innerHTML = template;
}

window.addEventListener("load", () => {
    const books = document.querySelector(".bookset");
    
    books.children.forEach(book => {
        const pages = book.querySelectorAll(`.page`);
        const movePage = flipPaper();
        
        pages.forEach((page, i) => {
            const otherBook = [...books.children].find(bk => bk !== book);
            page.addEventListener("click", ({target}) => {
                if (!book.classList.contains("selected")) book.classList.add("selected");
                otherBook.classList.remove("selected");
                [...otherBook.querySelectorAll(".page")].forEach(page => page.classList.remove("left-side"));
                const parent = target.parentElement;
                const isPageCls = (elem) => elem.className.includes("page");
                [parent, target].forEach(elem => { if (isPageCls(elem)) movePage(elem, i + 1) });
            })
        });
    })
})