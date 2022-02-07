
import { useState, useEffect } from 'react';
import fetchImages from './services/api';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import {Spinner} from './components/Loader/Loader';
import Modal from './components/Modal/Modal'
import toast, { Toaster } from 'react-hot-toast';



function App() {
  const [request, setRequest] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showBtn, setShowBtn] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  

  const handleFormSubmit = request => {
    setRequest(request);
  };

  useEffect(() => {
    if(!request) {
      return;
    }
    setStatus('pendind');
    fetchImages(request, 1)
      .then(data => {
        if (data.total === 0) {
          toast.error(`No images for ${request}`);
          return setStatus('idle');
        } else {
          setImages(data.hits);
          setShowBtn(true);
          setStatus('resolved');
        }
      })
      .catch(error => toast.error('Something wrong'));
  }, [request]);

  const toggleModal = () => {
    setShowModal(modal => !modal);
  };

  const onOpenModal = (event) => {
    setSelectedImage(event.target.dataset.source);
    toggleModal();
    
    
  };

  const onLoadMoreClick = e => {
    fetchImages(request, page).then(data => {
      setPage(page => page + 1);
      setImages(images => [...images, ...data.hits]);
      setStatus('resolved');
    })
    

  };
    return (
      <>
        <Toaster />
        <Searchbar onSubmit={handleFormSubmit} />
        {status === 'idle' && <p>'Please, enter request'</p>}
        {status === 'pending' && <Spinner />}
        {status === 'resolved' && <ImageGallery images={images} onOpenModal={onOpenModal} /> }
        {showBtn && <Button onClick={onLoadMoreClick}/>}
        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={selectedImage} alt={request} width="800" />
          </Modal>)}
        


      </>  
    )
  


}
export default  App;