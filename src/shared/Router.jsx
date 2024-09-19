import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyPage from '../pages/MyPage';
import Write from '../pages/Write';
import Login from '../pages/login';
import SignUp from '../pages/SignUp';
import Search from '../pages/SearchResults';
import List from '../pages/List';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Bookmark from '../pages/Bookmark';
import Edit from '../pages/Edit';
import Layout from '../components/common/Layout';
import ListCategory from '../pages/ListCategory';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route path="/mypage" element={<PrivateRouter page={<MyPage />} />} />
            <Route path="/bookmark" element={<PrivateRouter page={<Bookmark />} />} />
            <Route path="/write" element={<PrivateRouter page={<Write />} />} />
            <Route path="/edit" element={<PrivateRouter page={<Edit />} />} />

            <Route path="/login" element={<PublicRouter page={<Login />} />} />
            <Route path="/signup" element={<PublicRouter page={<SignUp />} />} /> */}

            <Route path="/mypage" element={<MyPage />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/write" element={<Write />} />
            <Route path="/edit" element={<Edit />} />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/list" element={<List />} />
            <Route path="/list-category" element={<ListCategory />} />
            <Route path="/search-results" element={<Search />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
