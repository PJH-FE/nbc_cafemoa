import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { Suspense } from 'react';
import WritingFixBtn from '../../components/WritingFixBtn';

const Layout = () => {
  return (
    <Suspense fallback={<>Loading</>}>
      <Header />
      <main>
        <Outlet />
      </main>
      <WritingFixBtn />
      <Footer />
    </Suspense>
  );
};
export default Layout;
