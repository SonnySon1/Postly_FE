const api_url = "http://localhost:8000/api";

// check server
function checkServer(url, timeout = 5000) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('timeout')), timeout);
    });

    const fetchPromise = fetch(url, { method: 'GET', mode: 'no-cors' });

    Promise.race([fetchPromise, timeoutPromise])
    .then(() => {
        console.log(('Server OK'));
    })
    .catch(() => {
        alert('Server Not Respond | Check Your Connection');
    });
}
checkServer('http://localhost:8000/');


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
            "Accept": "application/json",
            "Content-Type": "application/json"
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
            "Accept": "application/json",
            "Content-Type": "application/json"
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