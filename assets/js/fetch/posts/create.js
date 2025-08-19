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
    
    // siapkan data store
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
    const response = await createArticle(data);
    
    // tampilkan pesan
    alert(response.message);
    window.location.href = "index.html";
});