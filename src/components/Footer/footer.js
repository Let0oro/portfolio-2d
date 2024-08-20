import "./style.css"
const templateFooter = `
    <h3>About me!</h3>
    <a href="https://github.com/Let0oro" target="_blank" >
        <img src="https://www.svgrepo.com/show/340601/logo-github.svg" alt="Github logo" />
        My Github
        </a>
    <a href="https://www.linkedin.com/in/juan-manuel-montero-benavides/" target="_blank" >
        <img src="https://www.svgrepo.com/show/521725/linkedin.svg" alt="Linkedin logo" />
        My Linkedin
    </a>
    <a href="mailto:juanma.mb007@gmail.com">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M176.26-187.27q-28.35 0-48.27-19.92-19.91-19.91-19.91-48.27v-449.08q0-28.36 19.91-48.27 19.92-19.92 48.27-19.92h607.48q28.35 0 48.27 19.92 19.91 19.91 19.91 48.27v449.08q0 28.36-19.91 48.27-19.92 19.92-48.27 19.92H176.26ZM480-460.62l315.96-202.5-6.15-53.65L480-519.19 170.19-716.77l-6.15 53.65L480-460.62Z"/></svg>
        My Mail
    </a>
    <a href="tel:+34679161656">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#666666"><path d="M770.34-148.08q-109.03 0-220.32-51.61-111.29-51.62-204.94-145.77-93.96-93.66-145.48-204.75-51.52-111.1-51.52-220.13 0-17.5 11.84-29.54 11.85-12.04 29.35-12.04h124.81q15.15 0 26.17 9.23 11.02 9.23 14.48 24.27l22.92 114.46q2.39 14.27-1.25 25.88-3.63 11.62-11.9 19.62l-90.27 88.31q22.62 40.84 50.71 76.96 28.1 36.11 60.68 68.57 32.11 32.31 68.84 60.45 36.73 28.13 79.93 52.94l90.57-90.54q8.89-9.27 19.81-12.48 10.92-3.21 24.19-1.52l108.65 21.81q15.16 3.5 24.73 15.21 9.58 11.71 9.58 26.25v123.23q0 17.5-12.04 29.35-12.04 11.84-29.54 11.84Z"/></svg>
        My Number
    </a>
`

export const footer = () => {
    document.querySelector("footer").innerHTML = templateFooter;

}