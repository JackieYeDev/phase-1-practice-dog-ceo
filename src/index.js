console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

const init = () => {
    const dogBreeds = document.querySelector('ul#dog-breeds')
    const dogImageContainer = document.querySelector('div#dog-image-container')
    let breedList = {}
    fetch(imgUrl)
        .then((res) => res.json())
        .then((data) => {
            const images = [...data.message];
            images.map((image) => {
               const img = document.createElement('img');
               img.setAttribute('src', image);
               dogImageContainer.append(img);
            })
        })
    
    fetch(breedUrl)
        .then((res) => res.json())
        .then((data) => {
            const breeds = {...data.message};
            for (let key in breeds) {
                const li = document.createElement('li');
                li.textContent = key;
                li.addEventListener('click', () => {
                    li.style.setProperty('color', "#" + Math.floor(Math.random()*16777215).toString(16))
                })
                dogBreeds.append(li)
            }
            const li = document.querySelectorAll('li')
            breedList = {...li}
        })
    
    const selector = document.getElementById('breed-dropdown')
    selector.addEventListener('change', () => {
        const newList = Object.values(breedList).filter((breed) => breed.textContent.startsWith(selector.value))
        removeAllChildNodes(dogBreeds)
        newList.map((item) => {
            dogBreeds.append(item)
        })
    })
}

document.addEventListener("DOMContentLoaded", init)

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}