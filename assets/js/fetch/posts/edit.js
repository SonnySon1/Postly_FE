const form = document.getElementById('form-edit-article');

// get article id
function getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}



// load article for edit
async function loadArticleForEdit() {
    const articleId = getArticleIdFromUrl();

    // check article id
    if (!articleId) {
        alert('Article ID not found in URL');
        return;
    }

    try {
        // get article
        const data_article = await getArticle(articleId);

        // set value
        document.getElementById('title').value = data_article.article.title;
        document.getElementById('content').value = data_article.article.content;
        document.getElementById('category').value = data_article.article.category;
        document.getElementById('status').value = data_article.article.status;
    } catch (error) {
        // is invalid id redirect to index page
        window.location.href = "index.html";
    }
}




document.querySelector(".btn-publish").addEventListener("click", () => {
    document.getElementById("status").value = "publish";
});

document.querySelector(".btn-draft").addEventListener("click", () => {
    document.getElementById("status").value = "draft";
});
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // siapkan data
    const data = {
        title: form.title.value,
        content: form.content.value,
        category: form.category.value,
        status: form.status.value
    }
    
    // error handling
    if (!data.title || !data.content || !data.category || !data.status) {
        alert("Please fill all fields");
        return;
    }

    // create article
    const response = await updateArticle(getArticleIdFromUrl(), data);
    
    // tampilkan pesan
    alert(response.message);
    window.location.href = "index.html";
});