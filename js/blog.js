export function addBlog() {
    
}

export function init() {
    let blogs = getBlogsFromStorage();
    if (blogs == null) {
        return;
    }
    displayBlogsFromStorage(blogs);
}

function getBlogsFromStorage() {
    return JSON.parse(window.localStorage.getItem("postedBlogs"));
}

function displayBlogsFromStorage(blogs) {
    let unorderedList = document.getElementById("blogList");
    if (blogs == null) {
        let emptyLi = document.createElement("li");
        emptyLi.innerHTML = "No blogs currently listed.";
        unorderedList.appendChild(emptyLi);
        return;
    }
    // let unorderedList = document.getElementById("blogList");
    for (let i = 0; i < blogs.length; i++) {

    }

}