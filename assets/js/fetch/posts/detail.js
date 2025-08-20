// get article id from url
function getArticleIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}


// load article for detail
async function loadArticleForDetail() {
    const articleId = getArticleIdFromUrl();

    // check article id
    if (!articleId) {
        alert('Something went wrong');
        window.location.href = "preview.html";
        return;
    }

    try {
        // get article
        const data_article = await getArticle(articleId);

        // cerate html
        const post_html =`
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <h1>${data_article.article.title}</h1>
                        <div class="badge badge-info mb-3">
                            ${data_article.article.category}
                        </div>
                        <div>
                           ${data_article.article.content}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // set value
        document.getElementById('preview-article').innerHTML = post_html;
    } catch (error) {
        // is invalid id redirect to index page
        window.location.href = "index.html";
    }
}