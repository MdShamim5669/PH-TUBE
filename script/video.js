//TimeString 
function getTimeString(time){
    const hour = parseInt(time / 60);
    let remainingSecond = (time % 60);
    const min = (remainingSecond / 60).toFixed(2);

    return `${hour} hour  ${min} minute ago`;
}
//Categories Videos
const loadCategoriesVideo = (id) => {

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then((res) => res.json())
        .then((data) => DisplayVideos(data.category))
        .catch((error) => console.log(error));
};



// 1 - Fatch, Load and show Categories on html

//Create load categories
const loadCategories = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then((res) => res.json())
        .then((data) => DisplayCategpries(data.categories))
        .catch((error) => console.log(error));
};

//Create Load Videos
const loadVideos = () => {
    //fetch the data
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then((res) => res.json())
        .then((data) => DisplayVideos(data.videos))
        .catch((error) => console.log(error));
};

// {
//     "category_id": "1003",
//     "category": "Comedy"
// }

//Create DisplayCategpries
const DisplayCategpries = (categories) => {
    const categoriesContainer = document.getElementById("categories");

    //add data in html
    categories.forEach((item) => {
        
        //Crate a button
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = 
        `
         <button onclick="loadCategoriesVideo(${item.category_id})" class="btn">
         ${item.category}
         </button>
        `

        //add Button
        categoriesContainer.append(buttonContainer);
    });
};


const DisplayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = "";
    if(videos.length == 0){
        videoContainer.classList.remove("grid");
        videoContainer.innerHTML = 
        `   <div class="min-h-[450px] flex flex-col gap-5 justify-center items-center">
            <img src="asset/Icon.png "/>
            <p class="font-bold text-2xl">NO CONTENT HERE</p>
            </div>
        `
    }
    else{
        videoContainer.classList.add("grid");
    }
    
    videos.forEach((video) => {
        //Create card
        const card = document.createElement("div");
        card.classList = "card card-compact shadow-xl"
        card.innerHTML = `
        <figure class="h-[200px] relative">
            <img class="w-full h-full object-cover"
            src=${video.thumbnail}
            alt="Shoes" />
            ${
                video.others.posted_date.length == 0
                ? ""
                : `<span class="absolute right-2 text-xs bottom-2 bg-black rounded text-white">${getTimeString(video.others.posted_date)}</span>`
            }
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
            </div>
            <div>
            <h2 class="font-bold">${video.title}</h2>
            <div class="flex items-center gap-2">
                <p class="text-gray-400">${video.authors[0].profile_name}</p>
                
                ${video.authors[0].verified == true
                ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>`
                : ""
            }

            </div>
            </div>
            </div>
        </div>`;
        videoContainer.append(card);
    });
};

loadCategories();
loadVideos();