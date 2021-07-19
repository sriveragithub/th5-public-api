
// ========================================================= //
// Search container creation using dom manipulation: //
// ========================================================= //

// Initializing variables
const searchDiv = document.getElementsByClassName('search-container')
const searchForm = document.createElement('form')
const searchInput = document.createElement('input')
const searchSubmit = document.createElement('input')

// Setting attributes for variables
searchForm.action = '#'
searchForm.method = 'get'
searchInput.type = 'search'
searchInput.id = 'search-input'
searchInput.className = 'search-input'
searchInput.placeholder = 'Search...'
searchSubmit.type = 'submit'
searchSubmit.value = 'Search'
searchSubmit.id = 'search-submit'
searchSubmit.className = 'search-submit'

// Appending created elements onto proper pre-existing container element
searchForm.append(searchInput)
searchForm.append(searchSubmit)
searchDiv[0].append(searchForm)

// ========================================================= //
// Gallery container creation using 12 fetched random users: // 
// ========================================================= //

// Fetch function to gather data
const fetchGalleryData = () => {
    fetch('https://randomuser.me/api/?results=12')
    .then(res => res.json())
    .then(data => {
        console.log(data.results)
        galleryCardCreation(data.results)
    })
}

// Function to handle creation, attribution, and appending of dom elements
function galleryCardCreation (arr) {

    // Loop through the array provided to the function
    for (let i = 0; i < arr.length; i++) {
        // Initializing variables
        const galleryDiv = document.getElementById('gallery')
        const galleryCardDiv = document.createElement('div')
        const cardImgContainer = document.createElement('div')
        const cardImg = document.createElement('img')
        const cardInfoContainer = document.createElement('div')
        const cardName = document.createElement('h3')
        const cardEmail = document.createElement('p')
        const cardCityState = document.createElement('p')

        // Setting attributes/data
        galleryCardDiv.className = 'card'
        cardImgContainer.className = 'card-img-container'
        cardImg.className = 'card-img'
        cardImg.src = arr[i].picture.large
        cardImg.alt = 'profile picture'
        cardInfoContainer.className = 'card-info-container'
        cardName.id = 'name'
        cardName.className = 'card-name cap'
        cardName.innerHTML = `${arr[i].name.first} ${arr[i].name.last}`
        cardEmail.className = 'card-text'
        cardEmail.innerHTML = arr[i].email
        cardCityState.className = 'card-text cap'
        cardCityState.innerHTML = `${arr[i].location.city}, ${arr[i].location.state}`

        // Appending created elements onto proper pre-existing container element
        cardImgContainer.append(cardImg)
        cardInfoContainer.append(cardName)
        cardInfoContainer.append(cardEmail)
        cardInfoContainer.append(cardCityState)
        galleryCardDiv.append(cardImgContainer)
        galleryCardDiv.append(cardInfoContainer)
        galleryDiv.append(galleryCardDiv)

        // Setting up data to be passed into the modal pop-up
        const dataForPopUp = arr[i]

        // Creating click listener for each card
        galleryCardDiv.addEventListener('click', function() {
            popUpModal(dataForPopUp)
        })
    }
}

// ========================================================= //
// Modal container creation
// ========================================================= //

// Function to handle pop-up of modal
function popUpModal (obj) {

    // Initializing variables
    const modalContainer = document.createElement('div')
    const modalDiv = document.createElement('div')
    const modalCloseBtn = document.createElement('button')
    const modalInfoContainer = document.createElement('div')
    const modalImg = document.createElement('img')
    const modalName = document.createElement('h3')
    const modalEmail = document.createElement('p')
    const modalCity = document.createElement('p')
    const modalHR = document.createElement('hr')
    const modalPhone = document.createElement('p')
    const modalAddress = document.createElement('p')
    const modalBirthday = document.createElement('p')

    // Setting attributes/data
    modalContainer.className = 'modal-container'
    modalDiv.className = 'modal'
    modalCloseBtn.type = 'button'
    modalCloseBtn.id = 'modal-close-btn'
    modalCloseBtn.className = 'modal-close-btn'
    modalCloseBtn.innerHTML = '<strong>X</strong>'
    modalInfoContainer.className = 'modal-info-container'
    modalImg.className = 'modal-img'
    modalImg.src = obj.picture.large
    modalImg.alt = 'profile picture'
    modalName.id = 'name'
    modalName.className = 'modal-name cap'
    modalName.innerHTML = `${obj.name.first} ${obj.name.last}`
    modalEmail.className = 'modal-text'
    modalEmail.innerHTML = obj.email
    modalCity.className = 'modal-text cap'
    modalCity.innerHTML = obj.location.city
    modalPhone.className = 'modal-text'
    modalPhone.innerHTML = convertPhone(obj.cell)
    modalAddress.className = 'modal-text'
    modalAddress.innerHTML = `${obj.location.street.number} ${obj.location.street.name}, ${obj.location.city}, ${obj.location.state}
    ${obj.location.postcode}`
    modalBirthday.className = 'modal-text'
    modalBirthday.innerHTML = `Birthday: ${convertBirthday(obj.dob.date)}`

    // Convert phone function (not sure how to format numbers that are less or greater than 10)
    function convertPhone(phone) {
        const numbers = phone.match(/\d/g);
        console.log(numbers)
        let fixedPhone
        if (numbers.length === 8) {
            fixedPhone = `${numbers[0]}${numbers[1]}${numbers[2]}${numbers[3]}-${numbers[4]}${numbers[5]}${numbers[6]}${numbers[7]}`
        } else if (numbers.length === 9) {
            fixedPhone = `${numbers[0]}${numbers[1]}${numbers[2]}-${numbers[3]}${numbers[4]}${numbers[5]}-${numbers[6]}${numbers[7]}${numbers[8]}`
        } else if (numbers.length === 10) {
            fixedPhone = `(${numbers[0]}${numbers[1]}${numbers[2]}) ${numbers[3]}${numbers[4]}${numbers[5]}-${numbers[6]}${numbers[7]}${numbers[8]}${numbers[9]}`
        } else if (numbers.length === 11) {
            fixedPhone = `+${numbers[0]} (${numbers[1]}${numbers[2]}${numbers[3]}) ${numbers[4]}${numbers[5]}${numbers[6]}-${numbers[7]}${numbers[8]}${numbers[9]}${numbers[10]}`
        }
        return fixedPhone
    }

    // Convert birthday function
    function convertBirthday(date) {
        const newString = date.substring(0, 10)
        const arr = newString.split('-')
        const newDate = `${arr[1]}/${arr[2]}/${arr[0]}`
        return newDate
    }

    // Appending created elements onto proper pre-existing container element
    modalInfoContainer.append(modalImg)
    modalInfoContainer.append(modalName)
    modalInfoContainer.append(modalEmail)
    modalInfoContainer.append(modalCity)
    modalInfoContainer.append(modalHR)
    modalInfoContainer.append(modalPhone)
    modalInfoContainer.append(modalAddress)
    modalInfoContainer.append(modalBirthday)
    modalDiv.append(modalCloseBtn)
    modalDiv.append(modalInfoContainer)
    modalContainer.append(modalDiv)
    document.body.append(modalContainer)

    modalCloseBtn.addEventListener('click', function() {
        modalContainer.remove()
    })

}

// ========================================================= //
// Initiate functions
// ========================================================= //

fetchGalleryData()

