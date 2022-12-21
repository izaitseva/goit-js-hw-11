import axios from "axios";
const KEY = '12755760-d2e38158efcb067b906f81c79';
const PER_PAGE = 40;
const SEARCH_PARAMS = 'image_type=photo&orientation=horizontal&safesearch=true';

export async function getImages(search, page) {
    const URL = `https://pixabay.com/api/?key=${KEY}&${SEARCH_PARAMS}&q=${search}&page=${page}&per_page=${PER_PAGE}/`;
    const response = await axios.get(URL);
    const images = response.data.hits.map(el => {
        return {
            webformatURL: el.webformatURL,
            largeImageURL: el.largeImageURL,
            tags: el.tags,
            likes: el.likes,
            views: el.views,
            comments: el.comments,
            downloads: el.downloads,
            totalHits: el.totalHits
        }
    });
    return images;
}