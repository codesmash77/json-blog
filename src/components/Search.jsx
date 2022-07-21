import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

const Search = ({ handleSearch, search , onInputChange }) => {
  return (
    <>
        <form className='d-flex p-2 w-50' onSubmit={handleSearch} style={{margin:"auto", alignContent: "center"}}>
            <input
                type="search"
                className="form-control"
                placeholder='Search Blogs...'
                value={search}
                onChange={onInputChange}
            />
            <MDBBtn type='submit'> Search </MDBBtn>
        </form>
    </>
  )
}

export default Search