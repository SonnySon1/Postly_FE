const api_url = "http://localhost:8000/api";

// get articles
async function getArticles(limit = 10, offset = 0) {
    const response = await fetch(`${api_url}/article/${limit}/${offset}`);
    return await response.json();
}


// get article
async function getArticle(id) {
    const response = await fetch(`${api_url}/article/${id}`);
    return await response.json();
}

// create article
async function createArticle(data) {
    const response = await fetch(`${api_url}/article`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    
    
    return response.json();
}


// update article
async function updateArticle(id, data) {
    const response = await fetch(`${api_url}/article/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response.json();
}


// delete article
async function deleteArticle(id) {
    const response = await fetch(`${api_url}/article/${id}`, {
        method: "DELETE",
    });
    return response.json();
}