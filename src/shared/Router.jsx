import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProfilePage from '../pages/ProfilePage';
import Write from '../pages/Write';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import List from '../pages/List';
import Detail from '../pages/Detail';
import Home from '../pages/Home';
import Bookmark from '../pages/Bookmark';
import Edit from '../pages/Edit';
import Layout from '../components/common/Layout';
import ListCategory from '../pages/ListCategory';
import UsersCommutity from '../pages/UsersCommutity';
import SearchResults from '../pages/SearchResults';
import CafeInfo from '../pages/CafeInfo';
import { PrivateRouter, PublicRouter } from './PrivateRouter';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/profile/:profile_id" element={<PrivateRouter page={<ProfilePage />} />} />
            <Route path="/bookmark" element={<PrivateRouter page={<Bookmark />} />} />
            <Route path="/write" element={<PrivateRouter page={<Write />} />} />
            <Route path="/edit" element={<PrivateRouter page={<Edit />} />} />

            <Route path="/login" element={<PublicRouter page={<Login />} />} />
            <Route path="/signup" element={<PublicRouter page={<SignUp />} />} />

            <Route path="/list" element={<List />} />
            <Route path="/list-category" element={<ListCategory />} />
            <Route path="/users-commutity" element={<UsersCommutity />} />

            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/detail" element={<Detail />} />
            <Route path="/cafeinfo" element={<CafeInfo />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default Router;
