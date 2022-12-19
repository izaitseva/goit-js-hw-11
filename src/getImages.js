import axios from "axios";
const API_KEY = '12755760-d2e38158efcb067b906f81c79';
const URL = 'https://pixabay.com/api';

export async function getImages(search) {
    try {
        let response = await axios.get(URL, {
            params: {
                key: API_KEY,
                q: search,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            }
        });

        let hits = response.data.hits.map(el => {
            return {
                webformatURL: el.webformatURL,
                largeImageURL: el.largeImageURL,
                tags: el.tags,
                likes: el.likes,
                views: el.views,
                comments:el.comments,
                downloads:el.downloads,
            }
        });
        return hits;

    } catch (error) {
        console.log(error)
    }
}