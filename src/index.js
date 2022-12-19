import './css/styles.css';
import Notiflix from 'notiflix';
import { getImages } from './getImages';

let formRef = document.querySelector('.search-form');
let inputRef = document.querySelector('[name=searchQuery]');
let gallery = document.querySelector('.gallery');

formRef.addEventListener('submit', searchData);

function searchData(event) {
    event.preventDefault();
    let value = inputRef.value;

    getImages(value).then(data => {
        if (data.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            gallery.innerHTML = '';
        } else {
            renderImages(data);
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
    gallery.innerHTML = markup
}
