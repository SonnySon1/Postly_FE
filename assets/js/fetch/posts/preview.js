async function loadPreview(page = 1, limit = 6) {
    // ambil semua artikel
    const data = await getArticles(limit, (page - 1) * limit);

    // filter hanya yang statusnya hanya publish
    const data_filtered = data.articles.filter(post => post.status.toLowerCase() == "publish");

    // get element container list article
    const list = document.getElementById("preview-article");
    list.innerHTML = "";

    // render artikel ke dalam container list article
    data_filtered.forEach(post => { 
        const html = `
            <div class="col-md-4 d-flex">
               <div class="card card-post card-round align-items-stretch">
                    <div class="card-body">
                          <div class="separator-solid"></div>
                            <p class="card-category text-info mb-1">
                                <div class="badge badge-info">${post.category}</div>
                            </p>
                            <h3 class="card-title">
                                <div>${post.title}</div>
                            </h3>
                            <p class="card-text text-truncate-3">
                                ${post.content}
                            </p>
                            <div class="card-footer px-0">
                                <a href="${detailPost(post.id)}" class="btn btn-primary">Read More</a>
                            </div>
                    </div>
                </div>
            </div>
        `;
        list.innerHTML += html;
    });

    // render pagination
    renderPagination(data.count, page, limit);
}


// render pagination
function renderPagination(total, currentPage, limit) {    
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(total / limit);

    for (let i = 1; i <= totalPages; i++) {
        const html = `
            <li class="page-item ${i === currentPage ? "active" : ""}">
                <a class="page-link" href="javascript:void(0)" onclick="loadPreview(${i})">${i}</a>
            </li>
        `;
        pagination.innerHTML += html;
    }
}



// detail post
function detailPost(id) {
    return `detail.html?id=${id}`;
}