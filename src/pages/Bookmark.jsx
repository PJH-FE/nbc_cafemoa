import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';
import { Link } from 'react-router-dom';
import useUserStore from '../zustand/bearStore';
import { useEffect, useState } from 'react';

const Bookmark = () => {
  // const test = useUserStore();
  // // console.log('test', test);
  // const result = test.getUserInfo();
  // console.log('result', result);

  // const bookmarked = result.bookmarked;
  // console.log('bookmarked', bookmarked);

  const [articles, setArticles] = useState([]);
  const { getUserInfo } = useUserStore();
  const { bookmarked } = getUserInfo();

  const apiHost = async () => {
    const result = await DATA_API.get(`/articles`);
    setArticles(result.data);
    return result.data;
  };

  const {
    data: allArticles,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: apiHost,
  });
  console.log('allArticles', allArticles);

  const arr = articles.filter(article => {
    if (
      bookmarked.some(id => {
        // console.log(id);
        // console.log(article.id);
        // console.log('-------------');
        return id === article.id;
      })
    ) {
      return true;
    } else {
      return false;
    }
  });

  // const getBookmarks = async () => {
  //   const result = await DATA_API.get(`/users?user_id=asy13&_embed=articles`);
  //   return result.data;
  // };

  // const {
  //   data: bookmarks,
  //   isPending,
  //   isError,
  // } = useQuery({
  //   queryKey: ['bookmarkedArticles'],
  //   queryFn: getBookmarks,
  // });

  // console.log('bookmarks', bookmarks);

  if (isPending) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다...</div>;

  // const bookmarked = bookmarks[0].bookmarked;
  // const arr = bookmarks[0].articles.filter(article => {
  //   if (bookmarked.some(id => id === article.id)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // });

  return (
    <div className="px-10">
      <h1 className="mt-2 mb-3 text-xl font-bold">북마크한 게시물</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {arr.map(bookmark => (
          <Link to={`/detail?article_id=${bookmark.id}`} key={bookmark.id}>
            <div key={bookmark.id} className="overflow-hidden border rounded-lg shadow-lg w-72">
              <img src={bookmark.thumbnail} alt={bookmark.title} className="object-cover w-full h-64" />
              <div className="p-4">
                <p className="text-sm text-gray-500">{bookmark.region}</p>
                <h3 className="text-lg font-semibold">{bookmark.title}</h3>
                <p className="text-sm text-blue-500">#{bookmark.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Bookmark;
