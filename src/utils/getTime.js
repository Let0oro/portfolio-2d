const getStaticTime = () => {
    const date = String(new Date(Date.now()));
    const dateFormated = date.split(" ").slice(0, 5).join(" ");
    const time = date.split(" ").find((item) => item.includes(":"));
    return {date, time, dateFormated};
}

export const greet = () => {
    const { time } = getStaticTime();
    const greetings = time.split(":")[0] < 12 ? "Good morning" : "Good evening";
    return greetings;
}

export const timer = () => {
    setInterval(() => {
        const { dateFormated } = getStaticTime();
        const greetings = greet();
        document.querySelector("#greeting").innerHTML = greetings;
        document.querySelector("#date").innerHTML = "Date: " + dateFormated;
    }, 1000);
}