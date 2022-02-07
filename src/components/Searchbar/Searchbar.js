import { useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import s from './Searchbar.module.css';

function Searchbar({onSubmit}) {
  const [request, setRequest] = useState('');
  

  const handleRequestChange = e => {
    setRequest(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if(request.trim() === '') {
      toast.error('Please, enter request')
      return;
    }
    onSubmit(request);
    setRequest('');
  };

   
    return (
      <>
        <header className={s.searchbar}>
          <form className={s.searchForm} onSubmit={handleSubmit}>
            <button type="submit" className={s.searchBtn}>
              <span className={s.searchLabel}>Search</span>
            </button>

            <input
              className={s.searchInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={request}
              onChange={handleRequestChange}
            />
          </form>
        </header>
      </>
    );
  
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
};

export default Searchbar;