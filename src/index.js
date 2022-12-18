import './css/styles.css';
 
let formRef = document.querySelector('.search-form');
let inputRef = document.querySelector('#text');
let searchButton = document.querySelector('#submit');
const API_URL = "https://pixabay.com/api/";
 
formRef.addEventListener('submit', searchData);
 
 
function searchData(event) {
    event.preventDefault()
}
 
function fetchImages(name) {
    return fetch ('https://pixabay.com/api/')    
    .then(response => response.json())
    .then(data => console.log(data))
}
 
fetchImages()
console.log('test')

