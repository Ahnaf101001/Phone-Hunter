const loadPhone = async(searchText) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displayPhones(phones);
}

//display the phones in the link

const displayPhones = phones => {
    //console.log(phones);

    //1. get the element by id
    const phoneContainer = document.getElementById("phone-container");

    //clear phone container cards before adding new cards
    phoneContainer.textContent = "";

    phones.forEach(phone =>{
        console.log(phone);
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
                    <button class="btn bg-[#0D6EFD] text-xl w-[160px] h-[64px] text-white hover:text-[#0D6EFD] hover:bg-white">Show Details</button>
                </div>
            </div>
        `

        //4. append a child
        phoneContainer.appendChild(phoneCard);
    })
}

//search handler button
const handleSearch = () =>{
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}


//loadPhone();