const navbar = document.querySelector(".navbar"); //Get all "navbar" classes on the page.
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll("section"); //Get all "section" tags on the page.
const navbarLinks = document.querySelectorAll(".navbar-link");  //Get all "navbar-link" classes on the page.

//Functions
const mainFn = () => {
    if (window.pageYOffset >= navbarOffsetTop) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }

    sections.forEach((section, i) => { //Find auto-semicolon extension.
        if(window.pageYOffset > section.offsetTop - 10){
            navbarLinks.forEach((navbarLink) => {
                navbarLink.classList.remove("change");
            });
            navbarLinks[i].classList.add("change");
        }
    });
};

mainFn();

//Event Listeners
window.addEventListener("scroll", () => {
    mainFn();
});