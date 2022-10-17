const loadUrlData = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadUrlData(data.data.news_category))
}

const displayLoadUrlData = (datas) => {
    const linkContainer = document.getElementById('links');
    linkContainer.textContent = '';
    datas.forEach(data => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div onclick="loadCategoriesData('${data.category_id}')">${data.category_name}</div>
        
       `;
        linkContainer.appendChild(div);

    })
}

const loader = document.getElementById('spinner');
const processSearch = (isLoading) => {
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}
const loadCategoriesData = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoriesData(data.data));
    processSearch(true);

}

const displayCategoriesData = (categories) => {
    console.log(categories.length)
    processSearch(false);
    const newsField = document.getElementById('news-field');
    newsField.textContent = '';

    categories.sort(function (a, b) { return b.total_view - a.total_view });

    if (!categories.length) {
        const errorMassage = document.getElementById('error-massage');
        errorMassage.innerHTML = `<h1>Sorry...! No data found...Please click a another one..Thank you...</h1>`;
        return;
    }
    const inputField = document.getElementById('input-field');
    const inputStringValue = inputField.value;
    inputField.value = categories.length;
    categories.forEach(category => {
        const categorydiv = document.createElement('div');
        const { image_url, title, details, author, total_view, rating, _id, thumbnail_url } = category;
        const categoryDetails = details.slice(0, 300);
        const dots = details.length > 300 ? "..." : "";
        categorydiv.innerHTML = `
        <section onclick=loadDeatils('${_id}') class="container mt-5">
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12 ps-4 pb-0 pe-0  bg-light d-flex align-items-center">
                <img style="height: 550px; width:500px;" class="img-fluid p-5" src="${thumbnail_url}" alt="">
            </div>
            <div style="height: 580px;" class="ps-0 col-lg-9 col-md-6 bg-light d-flex align-items-center column">
                <div class="p-3">
                    <div class="mb-5">
                        <h2 class="fw-bold">${title}</h2>
                        <p>${categoryDetails ? categoryDetails : 'no details found'}${dots}</p>
                    </div>
                    <div class="d-flex justify-content-between">
                    <div class="d-flex">
                    <div>
                        <img style="height: 70px; width:70px;" class="my-1 rounded-circle" src="${author.img}" alt="">
                    </div>
                    <div class="pt-3">
                        <p class="fw-bold mb-0 px-3">${author.name ? author.name : ['Not found author name']}</p>
                        <p><small class="px-3">${author.published_date ? author.published_date : ['Not found published date']}</small></p>
                    </div>
                </div>
                        <div class="pt-4 d-flex">
                           <div>
                             <i class="fa-regular fa-eye"></i>
                           </div>
                           <div class="ms-2">
                             <p>${rating.number}M</p>
                           </div>
                        </div>
                        <div class="pt-3">
                             <i class="fa-regular fa-star-half-stroke"></i>
                             <i class="fa-regular fa-star"></i>
                             <i class="fa-regular fa-star"></i>
                             <i class="fa-regular fa-star"></i>
                             <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="pt-3">
                        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#categoryDetails">Details <i class="fa-solid fa-arrow-right"></i></button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
           `;
        newsField.appendChild(categorydiv);
    })


}

const loadDeatils = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayLoadDetails(data.data[0]))
}

const displayLoadDetails = (detail) => {
    const detailContainer = document.getElementById('details-field');
    detailContainer.innerHTML = `
    <h5>Title : ${detail.title}</h5>
    <p>Name : ${detail.author.name ? detail.author.name : ['Not found author name']}</p>
    <p>Total-View : ${detail.total_view ? detail.total_view : ['No Views']}</p>
    `;

}
// some question answers here
const someAnswers = document.getElementById('some-answers');
someAnswers.innerHTML = `
<h3 class="text-primary">What is difference between var, let and const in JavaScript?</h3>
<p class="text-secondary">  <span class="text-success fw-semibold">var</span> : function-scoped and can be updated and redeclared.  <span class="text-success fw-semibold">let</span> : block-scoped, can be updated,
    but cannot be redeclared.  <span class="text-success fw-semibold">const</span>: block-scoped, cannot be updated and redeclared.</p>
<br>
<h3 class="text-primary">What is difference between regular function and arrow function in JavaScript?</h3>
<p class="text-secondary">Since  <span class="text-success fw-semibold">regular function</span>  are constructible, they can be called using the new keyword. However,
    the  <span class="text-success fw-semibold">arrow function</span> are only callable and not constructible, i.e arrow functions can never be used as constructor
    functions. Hence, they can never be invoked with the new keyword.</p>
<h3 class="text-primary">what is the difference between map foreach filter and find in Javascript?</h3>
<p class="text-secondary">The main difference between this four methods is that <span
        class="text-success fw-semibold">forEach</span> allows you to change elements of original array and returns undefined and
    <span class="text-success fw-semibold">map</span> does not allow you to change original array and intended for making new array
    based on original one.The only
    difference is the <span class="text-success fw-semibold">filter()</span> method search through all the elements while <span
        class="text-success fw-semibold">find()</span> method search through all the child
    elements only.
</p>
<h3 class="text-primary">Why do we use template string in javascript?</h3>
<p class="text-secondary"><span class="text-success fw-semibold"> template string</span> are a powerful feature of modern JavaScript released in ES6. It lets us
    insert/interpolate variables and expressions into strings without needing to concatenate like in older versions of
    JavaScript. It allows us to create strings that are complex and contain dynamic elements.</p>
`;

loadUrlData();




