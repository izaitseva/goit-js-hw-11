// import './css/styles.css';
import './css/styles.css'
import Notiflix from 'notiflix';
import { getImages } from './getImages';

let formRef = document.querySelector('.search-form');
let inputRef = document.querySelector('[name=searchQuery]');
let gallery = document.querySelector('.gallery');
let btnEl = document.querySelector('.load-more');
let searchBtn = document.querySelector('.search_btn');
let page = 1;
let searchString;
let reachedTheEnd = false;


formRef.addEventListener('submit', searchData);
inputRef.addEventListener('input', inputEvent);

function inputEvent(ev) {
    searchBtn.disabled = false;
}

function searchData(event) {
    event.preventDefault();
    searchBtn.disabled = true;
    reachedTheEnd = false;
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
            Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
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

    if (reachedTheEnd)
        return;

    page++
    getImages(searchString, page)
        .then(data => {
            if (data.images.length === 0 && !reachedTheEnd) {
                btnEl.style.display = 'none'
                Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                reachedTheEnd = true;
            } else {
                renderImages(data.images)
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