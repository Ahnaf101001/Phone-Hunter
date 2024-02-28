const loadPhone = async(searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones, isShowAll);
}

//display the phones in the link

const displayPhones = (phones, isShowAll) => {
    //console.log(phones);

    //1. get the element by id
    const phoneContainer = document.getElementById("phone-container");

    //clear phone container cards before adding new cards
    phoneContainer.textContent = "";

    //display show all btn condition
    const showAllBtn = document.getElementById("show-all-btn");
    if(phones.length > 12 && !isShowAll){
        showAllBtn.classList.remove('hidden');
    }
    else{
        showAllBtn.classList.add('hidden');
    }

    //displaying a limited number of contents or in this case of phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,9);
    }

    phones.forEach(phone =>{
        // console.log(phone);
        //2. create a div
        const phoneCard = document.createElement("div");
        phoneCard.classList = `w-[364px] h-[633px] bg-base-100 rounded-none border-2 border-[#CFCFCF]`;

        //3. set inner html
        phoneCard.innerHTML = `
            <figure class="px-10 pt-10">
                <img class="bg-[#0D6EFD0D] m-auto" src="${phone.image}" alt="Iphone 13 Pro Max" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h2 class="card-title font-bold">${phone.phone_name}</h2>
                <p class="text-[#706F6F]">Unveiling the Apple iPhone 13 Pro Max: a pinnacle of mobile technology, boasting unparalleled performance, cutting-edge camera capabilities, and exquisite design.</p>
                <h2 class="card-title font-bold">$999</h2>
                <div class="card-actions">
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn bg-[#0D6EFD] text-xl w-[160px] h-[64px] text-white hover:text-[#0D6EFD] hover:bg-white">Show Details</button>
                </div>
            </div>
        `

        //4. append a child
        phoneContainer.appendChild(phoneCard);

        //hide loading spinner
        toggleLoadingBars(false);
    })
}

//getting the details of the phone
const handleShowDetail = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    const phoneName =  document.getElementById("show-detail-phone-name");
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById("show-detail-container");

    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" />
        <p><span>Storage:</span> ${phone?.mainFeatures?.storage}</p>
        <p><span>Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
        <p><span>Chip Set:</span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span>Memory:</span> ${phone?.mainFeatures?.memory}</p>
        <p><span>Slug:</span> ${phone?.slug}</p>
        <p><span>Release Date:</span> ${phone?.releaseDate}</p>
        <p><span>Brand:</span> ${phone?.brand}</p>
    `

    show_details_modal.showModal();
}

//search handler button
const handleSearch = (isShowAll) =>{
    toggleLoadingBars(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingBars = (isLoading) =>{
    const loadingBars = document.getElementById("loading_bars");
    if(isLoading){
        loadingBars.classList.remove("hidden");
    }
    else{
        loadingBars.classList.add("hidden");
    }
}

//handle show all
const handleShowAll = () =>{
    handleSearch(true)
}


//loadPhone();