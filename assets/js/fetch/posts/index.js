// load data posts
async function load_posts(status) {
    // get articles
    const data = await getArticles(500, 0);
    
    // filter data
    const data_filtered = data.articles.filter(post => post.status.toLowerCase() == status);
    
    // get element container list article
    const posts_list = document.getElementById('posts-list');
    posts_list.innerHTML = "";

    // render artikel ke dalam container list article
    data_filtered.forEach(post => {
        const post_html = `
            <tr>
                <td>${post.title}</td>
                <td>${post.category}</td>
                <td>
                    <a href="${editPost(post.id)}" class="btn btn-warning btn-sm">Edit</a>
                    <button onclick="trashPost(${post.id})" class="btn btn-danger btn-sm">Trash</button>
                </td>
            </tr>
        `;
        posts_list.innerHTML += post_html;
    })     
}

// edit post
function editPost(id) {
    return `edit.html?id=${id}`
}


// trash post
async function trashPost(id) {
    // confirm trash
    if (!confirm("Are you sure to trash this article?")) {
        return;
    }

    //  get article id
    const response = await getArticle(id);

    // siapkan data store
    const data = {
        title: response.article.title,
        content: response.article.content,
        category: response.article.category,
        status: "thrash"
    }
    
    // error handling
    if (!data.title || !data.content || !data.category || !data.status) {
        alert("Terjadi kesalahan");
        return;
    }

    // update article
    const result = await updateArticle(id, data);
    
    // show alert
    alert("Article has been trashed");
    window.location.href = "index.html";
}






