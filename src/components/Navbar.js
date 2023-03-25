import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { alterSearch } from '../features/filter/filterSlice';
import logoImg from "../images/logo.svg";

export default function Navbar() {
 
    const [searchText, setSearchText] = useState('');

    // integration of react-redux hooks here
    const dispatch = useDispatch();

    // altering search text to search tasks here
    useEffect(() => {
        dispatch(alterSearch(searchText));
    }, [dispatch, searchText]);

    // rendering the navbar component here
    return (
        <nav className='container relative py-3'>
            <div className='flex items-center justify-between'>
                <Link to={'/'}>
                    <img src={logoImg} alt='logo' />
                </Link>
                <div className='flex-1 max-w-xs search-field group'>
                    <i className='fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500'></i>
                    <input type='text' placeholder='Search Task' className='search-input' id='lws-searchTask' value={searchText} onChange={e => setSearchText(e.target.value)} />
                </div>
            </div>
        </nav>
    );
};

