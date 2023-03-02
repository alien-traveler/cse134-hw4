export function addBlog() {
    getUserInput(0);
}
/**
 * 
 * @param {*} createOrEdit 0 for create, 1 for edit
 */
function getUserInput(createOrEdit, index) {
    // clone temp tag
    let temp = document.getElementsByTagName("template")[0];
    const cloneTemp = temp.content.cloneNode(true);
    // dialog
    let cloneDialog = cloneTemp.getElementById("myDialog");

    // label1 for title
    let cloneLabel1 = document.createElement("label");
    cloneLabel1.for = "title";
    cloneLabel1.textContent = "Title: ";
    cloneDialog.appendChild(cloneLabel1);
    // user input for title
    let cloneInput = document.createElement("input");
    cloneInput.name = "title";
    cloneInput.id = "title";
    cloneInput.type = "text";
    cloneDialog.appendChild(cloneInput);
    // create new line
    cloneDialog.appendChild(document.createElement("br"));

    // label2 for date
    let cloneLabel2 = document.createElement("label");
    cloneLabel2.for = "date";
    cloneLabel2.textContent = "Date: ";
    cloneDialog.appendChild(cloneLabel2);
    // user input for date
    let cloneInput2 = document.createElement("input");
    cloneInput2.name = "date";
    cloneInput2.id = "date";
    cloneInput2.type = "date";
    cloneDialog.appendChild(cloneInput2);
    // create new line
    cloneDialog.appendChild(document.createElement("br"));

    // label3 for summary
    let cloneLabel3 = document.createElement("label");
    cloneLabel3.for = "summary";
    cloneLabel3.textContent = "Summary (1-2 sentences): ";
    cloneDialog.appendChild(cloneLabel3);
    // create new line
    cloneDialog.appendChild(document.createElement("br"));
    // user input for summary
    let cloneInput3 = document.createElement("input");
    cloneInput3.name = "summary";
    cloneInput3.id = "summary";
    cloneInput3.type = "textarea";
    cloneDialog.appendChild(cloneInput3);
    // create new line
    cloneDialog.appendChild(document.createElement("br"));

    // cancel button
    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = "Cancel";
    cloneDialog.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
        cloneDialog.remove();
    });
    // save button
    let okBtn = document.createElement('button');
    okBtn.textContent = "Save";
    cloneDialog.appendChild(okBtn);
    okBtn.addEventListener("click", () => {
        cloneDialog.remove();
        let cleanInput1 = DOMPurify.sanitize(cloneInput.value);
        // if (cleanInput1 == undefined) {cleanInput1 = "";}
        let cleanInput2 = DOMPurify.sanitize(cloneInput2.value);
        // if (cleanInput2 == undefined) {cleanInput2 = "";}
        let cleanInput3 = DOMPurify.sanitize(cloneInput3.value);
        // if (cleanInput3 == undefined) {cleanInput3 = "";}
        // store input into localStorage
        // create mode
        let post;
        if (createOrEdit == 0) {
            post = setUserInput(cleanInput1, cleanInput2, cleanInput3);
            // display new post
            displayBlogsFromStorage([post]);
        } else {
            // edit mode
            post = editUserInput(cleanInput1, cleanInput2, cleanInput3, index);
            // display changed post
            displayChangedPost(post, index);
        }
    });
    // add to body
    document.getElementById("blogList").appendChild(cloneTemp);
}

function displayChangedPost(post, index) {
    let currPostTag = document.getElementsByTagName("li")[index];
    currPostTag.textContent = "Post Title: " + post["PostTitle"] 
        + "; Date: " + post["Date"] + "; Summary: " + post["Summary"];
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        getUserInput(1, index);
    });
    currPostTag.appendChild(editBtn);
}

function editUserInput(cleanInput1, cleanInput2, cleanInput3, index) {
    let postsArray = getBlogsFromStorage();
    console.log(postsArray);
    let currPost = postsArray[index];
    currPost["PostTitle"] = cleanInput1;
    currPost["Date"] = cleanInput2;
    currPost["Summary"] = cleanInput3;
    postsArray[index] = currPost;
    let stringArray = JSON.stringify(postsArray);
    setBlogsToStorage(stringArray);
    return currPost;
    // let postsArray = getBlogsFromStorage();
    // let index = countIndex(parentPost);
    // console.log(parentPost);
    // console.log(index);
    // parentPost["PostTitle"] = cleanInput1;
    // parentPost["Date"] = cleanInput2;
    // parentPost["Summary"] = cleanInput3;
    // postsArray[index] = parentPost;
    // let stringArray = JSON.stringify(postsArray);
    // setBlogsToStorage(stringArray);
    // return parentPost;
}

function deleteNoBlogString() {
    let initialBlog = document.getElementsByTagName("li")[0];
    initialBlog.remove();
}

function setUserInput(input1, input2, input3) {
    let newPost = {
        "PostTitle": input1,
        "Date": input2,
        "Summary": input3
    };
    let postsArray = getBlogsFromStorage();
    // if there is no post before
    if (postsArray === null || postsArray.length === 0) {
        let newPostArray = [newPost];
        let stringNewArray = JSON.stringify(newPostArray);
        // window.localStorage.setItem("postedBlogs", stringNewArray);
        setBlogsToStorage(stringNewArray);
        // delete "no blog" string
        deleteNoBlogString();
    } else {
        // add new post to existing post array
        postsArray.push(newPost);
        let stringNewArray = JSON.stringify(postsArray);
        // window.localStorage.setItem("postedBlogs", JSON.stringify(postsArray));
        setBlogsToStorage(stringNewArray);
    }
    return newPost;
}

function setBlogsToStorage(stringArray) {
    window.localStorage.setItem("postedBlogs", stringArray);
}

export function init() {
    // alert("ready");
    let blogs = getBlogsFromStorage();
    displayBlogsFromStorage(blogs);
}

function getBlogsFromStorage() {
    return JSON.parse(window.localStorage.getItem("postedBlogs"));
}

function displayBlogsFromStorage(blogs) {
    let unorderedList = document.getElementById("blogList");
    // if there is no blog
    if (blogs === null || blogs.length === 0) {
        let emptyLi = document.createElement("li");
        emptyLi.textContent = "No blogs currently listed.";
        unorderedList.appendChild(emptyLi);
        return;
    }
    // console.log(unorderedList);
    
    for (let i = 0; i < blogs.length; i++) {
        let post = blogs[i];
        createPostLi(post, i);
    }
}

function createPostLi(post, index) {
    let unorderedList = document.getElementById("blogList");
    // create li
    let emptyLi = document.createElement("li");
    // add content to li
    emptyLi.textContent = "Post Title: " + post["PostTitle"] 
        + "; Date: " + post["Date"] + "; Summary: " + post["Summary"];
    // add Edit button
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
        // if create first, then cannot edit, because index is 0
        // need to locate the li
        // let parentPost = editBtn.parentElement;
        // console.log(parentPost);
        getUserInput(1, index);
    });
    emptyLi.appendChild(editBtn);
    // add Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
        let parentPost = deleteBtn.parentElement;
        deleteLi(parentPost, index);
    });
    emptyLi.appendChild(deleteBtn);
    unorderedList.appendChild(emptyLi);
}

function deleteLi(parentPost, index) {
    // clone temp tag
    let temp = document.getElementsByTagName("template")[0];
    const cloneTemp = temp.content.cloneNode(true);
    // dialog
    let cloneDialog = cloneTemp.getElementById("myDialog");
    cloneDialog.textContent = "Delete post?";
    // create new line
    cloneDialog.appendChild(document.createElement("br"));
    // cancel button
    let cancelBtn = document.createElement('button');
    cancelBtn.textContent = "Cancel";
    cloneDialog.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
        cloneDialog.remove();
        return;
    });
    // ok button
    let okBtn = document.createElement('button');
    okBtn.textContent = "Ok";
    cloneDialog.appendChild(okBtn);
    okBtn.addEventListener("click", () => {
        cloneDialog.remove();
        parentPost.remove();
        let blogs = getBlogsFromStorage();
        blogs.splice(index, 1);
        setBlogsToStorage(JSON.stringify(blogs));
        // if delete the last one
        if (blogs.length === 0 || blogs === null) {
            let unorderedList = document.getElementById("blogList");
            let emptyLi = document.createElement("li");
            emptyLi.textContent = "No blogs currently listed.";
            unorderedList.appendChild(emptyLi);
        }
    });
    document.getElementById("blogList").appendChild(cloneTemp);
}

// function countIndex(parentPost) {
//     let blogs = getBlogsFromStorage();
//     for (let i = 0; i < blogs.length; i++) {
//         let post = blogs[i];
//         let text = "Post Title: " + post["PostTitle"] 
//         + "; Date: " + post["Date"] + "; Summary: " + post["Summary"];
//         if (text == parentPost.textContent) {
//             return i;
//         }
//     }
//     return -1;
// }