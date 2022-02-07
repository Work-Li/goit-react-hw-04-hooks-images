const API_KEY = '24192544-a81042c0a59826e332cc4d72c';
const BASE_URL = 'https://pixabay.com/api';

const  fetchImages = async (query, page) => {

    const response = await fetch( `${BASE_URL}/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`, 
    ) 
    
    return response.json();

       
}

export default fetchImages;

