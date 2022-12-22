// import './css/styles.css';
import './css/styles.css'
import Notiflix from 'notiflix';
import { getImages } from './getImages';

let formRef = document.querySelector('.search-form');
let inputRef = document.querySelector('[name=searchQuery]');
let gallery = document.querySelector('.gallery');
let btnEl = document.querySelector('.load-more');
let page = 1;
let searchString;

formRef.addEventListener('submit', searchData);

function searchData(event) {
    event.preventDefault();
    searchString = inputRef.value.trim();
    gallery.innerHTML = '';

    page = 1;
    getImages(searchString, page).then(data => {

        if (data.images.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            btnEl.style.display = 'none'
        } else if (!searchString) {
            Notiflix.Notify.info('Please fill the field.');
            btnEl.style.display = 'none'
        } else {
            btnEl.style.display = "";
            renderImages(data.images);
        }
        console.log(data);
    });
}

function renderImages(images) {
    const markup = images.map(item => `
    <div class="photo-card">
        <img src="${item.webformatURL}" alt="" loading="lazy" />
        <div class="info">
            <p class="info-item">
                <b>Likes</b>
                    <span>${item.likes}</span>
            </p>
            <p class="info-item">
                <b>Views</b>
                    <span>${item.views}</span>
            </p>
            <p class="info-item">
                <b>Comments</b>
                    <span>${item.comments}</span>
            </p>
            <p class="info-item">
                <b>Downloads</b>
                    <span>${item.downloads}</span>
            </p>
        </div>
    </div>
    `).join('')
    gallery.insertAdjacentHTML("beforeend", markup);
}
btnEl.addEventListener('click', loadMore)

function loadMore() {
    page++
    getImages(searchString, page)
        .then(data => {
            if (data.length === 0) {
                btnEl.style.display = 'none'
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            } else {
                renderImages(data)
            }
        })
}

window.addEventListener('scroll', () => {
    const {scrollHeight, scrollTop, clientHeight} = document.documentElement

    btnEl.style.display = 'none'
    if(scrollTop === scrollHeight - clientHeight) {
        loadMore()
    }
})