
import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosFetch from '../Hook/useAxiosFetch';
import useWindowSize from '../Hook/useWindow';
import api from '../api/Post';
import { format } from 'date-fns';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([
  ]);
  const [ search, setSearch ] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const {width} = useWindowSize();
  // const {data: posts, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');
  const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data]);


      useEffect(() => {
        const filteredResults = posts.filter((post) =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [posts, search]);


const handleSubmit = async(e) => {
  e.preventDefault();
const id = posts.length ? String(Number(posts[posts.length - 1].id) + 1) : "1";
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const newPost = { id, title: postTitle, datetime, body: postBody };
  // const allPosts = [...posts, newPost];
  try{
  const response = await api.post('/posts', newPost);
  const allPosts = [...posts, response.data];
  setPosts(allPosts);
  setPostTitle('');
  setPostBody('');
    navigate('/');
  }catch (err) {
        if (err.response) {
          console.error('Error: ', err.response.data);
          console.error('Status: ', err.response.status);
          console.error('Headers: ', err.response.headers);
        }else {
          console.error('Error: ', err.message);
        }
      }finally {
        console.log('Fetch completed');
      }
};
const handledelete = async(id) => {
  try{
  await api.delete(`/posts/${id}`);
  const postsList = posts.filter(post => post.id !== id);
  setPosts(postsList);
  navigate('/');
  }catch (err) {
    if (err.response) {
      console.error('Error: ', err.response.data);
      console.error('Status: ', err.response.status);
      console.error('Headers: ', err.response.headers);
    } else {
      console.error('Error: ', err.message);
    }  

  }finally {
    console.log('Delete completed');
  }
}

const handleEdit = async(id) => {
  // const post = posts.find(post => post.id === id);
  const datetime = format(new Date(), 'MMMM dd, yyyy pp');
  const updatedPost = { id, title: editTitle, datetime, body: editBody };
  try {
    await api.put(`/posts/${id}`, updatedPost);
    const postsList = posts.map(post => post.id === id ? updatedPost : post);
    setPosts(postsList);
    setEditTitle('');
    setEditBody('');
    navigate('/');
  } catch (err) {
    if (err.response) {
      console.error('Error: ', err.response.data);
      console.error('Status: ', err.response.status);
      console.error('Headers: ', err.response.headers);
    } else {
      console.error('Error: ', err.message);
    }
  } finally {
    console.log('Update completed');
  }  
}

    return (
        <DataContext.Provider value={{
            width,
            search,
            setSearch,
            searchResults,
            fetchError,
            isLoading,
            postTitle,
            setPostTitle,
            postBody,
            setPostBody,
            handleSubmit,
            posts,
            handleEdit,
            handledelete,
            editTitle,
            setEditTitle,
            editBody,
            setEditBody,


        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;




            // posts,
            // setPosts,
            // search,
            // setSearch,
            // searchResults,
            // postTitle,
            // setPostTitle,
            // postBody,
            // setPostBody,
            // handleSubmit,
            // handledelete,
            // handleEdit,
            // editTitle,
            // setEditTitle,
            // editBody,
            // setEditBody,
            // fetchError,
            // isLoading,
            // width

