import { Route, Routes } from 'react-router-dom';
import About from './About';
import './App.css';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Missing from './Missing';
import Nav from './Nav';
import NewPost from './NewPost';
import PostPage from './PostPage';
import Edit from './Edit';
import { DataProvider } from './context/DataContext';

function App() {


  return (
    <div className="App">
      <DataProvider>
          <Header title='Arish Social media'/>
          <Nav/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/post"> 
                  <Route index element={<NewPost  />} />
                  <Route path=":id" element={<PostPage />} />
                </Route>
                {/* <Route path="/post/:id" element={<PostPage posts={posts} />} /> */}
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Missing />} />  
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
          <Footer />
      </DataProvider>
    </div>
  );
}

export default App;
