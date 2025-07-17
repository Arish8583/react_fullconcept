import React, { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext';

const Home = () => {
    const {searchResults , fetchError, isLoading} = useContext(DataContext);

  return (
    <>
        {!isLoading &&fetchError && (    
            <p className="errorMsg">{`Error: ${fetchError}`}</p>
        )}
        {isLoading && (
            <p className="statusMsg">Loading posts...</p>
        )}
        {!isLoading && !fetchError && (
        <main className="Home">
            {searchResults.length ? (
            <Feed posts = {searchResults} />
            ) : (
                <p className="statusMsg">No posts to display.</p>
            )}
        </main>
        )}
        </>
  )
}

export default Home