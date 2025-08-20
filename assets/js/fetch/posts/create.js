// get form add article
const form  = document.getElementById('form-add-article');

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
    
    // siapkan data store
    const data = {
        title: form.title.value,
        content: form.content.value,
        category: form.category.value,
        status: form.status.value
    }
    

    // create article
    const response = await createArticle(data);
    

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