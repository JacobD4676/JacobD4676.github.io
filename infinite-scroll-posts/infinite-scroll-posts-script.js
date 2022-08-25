//JS for Infinite Scroll Posts Blog App
const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");
const baseUrl = "https://jsonplaceholder.typicode.com/posts?"

let limit = 7;
let page = 1;

//Fetch posts from API
async function getPosts() {
    const response = await fetch(`${baseUrl}_limit=${limit}&_page=${page}`);

    const data = await response.json();

    return data;
}

//Shows posts in Document Object Model (DOM)
async function showPosts(){
    const posts = await getPosts();

    posts.forEach(post => {
        const postElement = document.createElement("div"); //Create an empty div tag in the HTML.
        postElement.classList.add("post"); //Add the post class to the postElement div.
        postElement.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-title">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>
        `;

        postsContainer.appendChild(postElement);

    });
}

//Show CSS loader & fetch more posts.
function showLoading(){
    loading.classList.add("show");

    setTimeout(() => {
        loading.classList.remove("show"); 

        setTimeout(() => {
            page++;
            showPosts();
        }, 300);

    }, 1000); //After a period of 1000ms (1 second), remove the show class from the class list, causing the CSS loader class to become hidden.
}

//Filter posts by input
function filterPosts(e){ //e represents the event parameter.
   const term = e.target.value.toUpperCase(); //allows us to get the value of e, which represents what the user typed into filter search box. Use .toUpperCase function since search is case-sensitive and it is easiest just to make everything uppercase.
    const posts = document.querySelectorAll(".post"); //Stores in a node list all posts via the post class.

    posts.forEach(post => {
        const title = post.querySelector(".post-title").innerText.toUpperCase();
        const body = post.querySelector(".post-body").innerText.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1 ){ //If title contains the term, or if body contains the term, do the function and a positive index value will be returned. Otherwise, the indexOf function will return a value of -1.
            post.style.display = "flex"; //If the post matches the search term, just leave its display as flex (meaning it will show).
        } else {
            post.style.display = "none"; //If the post dosen't match the search term, set flex equal to none (meaning the post will NOT show).
        }
    });
}

//show initial posts
showPosts();


//Event listerners
window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    }
});

filter.addEventListener("input", filterPosts);