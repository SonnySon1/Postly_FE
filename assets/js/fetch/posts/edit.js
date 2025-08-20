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
        alert('Something went wrong');
        window.location.href = "index.html";
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




// if button publish clicked set status to publish
document.querySelector(".btn-publish").addEventListener("click", () => {
    document.getElementById("status").value = "publish";
});

// if button draft clicked set status to draft
document.querySelector(".btn-draft").addEventListener("click", () => {
    document.getElementById("status").value = "draft";
});

// if form submitted
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // kosongkan error
    document.getElementById("error-title").innerText = "";
    document.getElementById("error-content").innerText = "";
    document.getElementById("error-category").innerText = "";

    // siapkan data
    const data = {
        title: form.title.value,
        content: form.content.value,
        category: form.category.value,
        status: form.status.value
    }
    

    // create article
    const response = await updateArticle(getArticleIdFromUrl(), data);
    

    // error handling
    if (response.errors) {
        if (response.errors.title) {
            document.getElementById("error-title").innerText = response.errors.title[0];
        }
        if (response.errors.content) {
            document.getElementById("error-content").innerText = response.errors.content[0];
        }
        if (response.errors.category) {
            document.getElementById("error-category").innerText = response.errors.category[0];
        }
        return;
    }

    // tampilkan pesan
    alert(response.message);
    window.location.href = "index.html";
});