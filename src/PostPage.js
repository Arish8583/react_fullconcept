import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const PostPage = () => {
    const {posts, handledelete} = useContext(DataContext);
  const {id} = useParams() // Assuming you will use useParams to get the post ID
  const post = posts.find(post => (post.id).toString() === id);

  return (
 <main className="PostPage">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/edit/${post.id}`}><button className="editButton" >Edit Post</button></Link>
                        <button className="deleteButton" onClick={() => handledelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's disappointing.</p>
                        <p>
                            <Link to='/'>Visit Our Homepage</Link>
                        </p>
                    </>
                }

    </main>
    )
}

export default PostPage