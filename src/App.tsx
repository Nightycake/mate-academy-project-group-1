import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/Header/Navbar/Header';
import { Home } from './pages/Home/Home';
import User from './pages/User/User';
import NotFound from './pages/NotFound/NotFound';
import Settings from './pages/Settings/Settings';
import { PostPage } from './pages/post';
import { Footer } from './components/Footer/Footer';
import SingleCategory from './pages/SingleCategory/SingleCategory';
import { HashRouter } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Header />
      <HashRouter>
        <Routes>
          {/* <Route path="/add" element={<AddUser />} /> */}
          <Route path="/users/:id" element={<User />} />
          <Route path="/users/settings" element={<Settings />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/category/:categoryTitle" element={<SingleCategory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
      <Footer />
    </Router>
  );
};

export default App;
