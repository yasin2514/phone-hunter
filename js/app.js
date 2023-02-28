// load data
const loadData = async (inputValue, item) => {
    try {
        const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data, item);
    }
    catch (error) {
        console.log(error);
        return;
    }
};
// input text
const searchText = (item) => {
    const input = document.getElementById('input_field');
    const inputValue = input.value;
    loadData(inputValue, item);
}
//search button
const searchButton = () => {
    searchText(9);
    loadingShow(true);
}
// enter button 
document.getElementById('input_field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchText(9);
        loadingShow(true);
    }
});

// display data
const displayData = (data, item) => {
    const cardContainer = document.getElementById('card_show');
    cardContainer.innerHTML = '';
    const showALLbtn = document.getElementById("show_all");
    const errorShow = document.getElementById('error_show');
    if (data.length > item && item) {
        data = data.slice(0, item);
        showALLbtn.classList.remove("hidden");
    }
    else {
        showALLbtn.classList.add("hidden");
    }
    // show error
    if (data.length === 0) {
        errorShow.classList.remove('hidden');
    }
    else {
        errorShow.classList.add('hidden');
    }
    // display all data
    data.forEach(phone => {
        const { image, brand, phone_name, slug } = phone;
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card  lg:card-side bg-base-100 h-full border rounded-md bg-gray-900 shadow-xl max-w-xs lg:max-w-full">
            <figure class="p-4"><img src="${image}" class="rounded-lg" alt="Album" /></figure>
            <div class="card-body ">
                <h2 class="card-title">${phone_name}</h2>
                <p>Brand: ${brand}</p>
                <div class="card-actions">
                    <label onclick="loadId('${slug}')" for="my-modal-5" class="btn btn-sm btn-outline  border-orange-600 rounded-md text-orange-600 hover:bg-orange-600 hover:border-orange-600
                    hover:text-white">details</label>
                </div>
            </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
    loadingShow(false);
};

document.getElementById('loading_show').classList.add("hidden");
// button show all data
const showAll = () => {
    searchText();
}
//loading show
const loadingShow = (ifNone) => {
    if (ifNone) {
        document.getElementById('loading_show').classList.remove("hidden");
    }
    else {
        document.getElementById('loading_show').classList.add("hidden");
    }
};
// load details
const loadId = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.data);
}
const displayDetails = phone => {
    const modal = document.getElementById('modal_section');
    const { image, brand, name, releaseDate, mainFeatures, others } = phone;
    const { storage, displaySize, chipSet, memory, sensors } = mainFeatures;
    const [...sensor] = sensors;
    let allValues = '';
    for (const key in others) {
        allValues = `${allValues} ${key} : ${others[key]},`;
    }
    modal.innerHTML = `
    <div class="card  md:card-side bg-base-100">
        <figure class="p-4 w-full md:w-56"><img src="${image}" class="rounded-lg w-full" alt="Album" /></figure>
        <div class="card-body w-full md:w-52 px-2">
            <h2 class="card-title">${name}</h2>
            <p><span class="font-semibold">Brand:</span> ${brand}</p>
            <p><span class="font-semibold">Storage:</span> ${storage}</p>
            <p><span class="font-semibold">Display Size:</span> ${displaySize}</p>
            <p><span class="font-semibold">Chipset:</span> ${chipSet}</p>
            <p><span class="font-semibold">Memory:</span> ${memory}</p>
            <p><span class="font-semibold">Sensors:</span> ${sensor}</p>
            <p><span class="font-semibold">Others:</span> ${allValues ? allValues : 'none'}</p>
            <p>${releaseDate}</p>
        </div>
    </div>
    <div class="modal-action">
        <label for="my-modal-5" class="btn btn-sm btn-outline  border-orange-600 rounded-md text-orange-600 hover:bg-orange-600 hover:border-orange-600
        hover:text-white ">close</label>
    </div>
   `;
}