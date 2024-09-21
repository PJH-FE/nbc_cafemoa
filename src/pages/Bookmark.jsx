import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';
import { Link } from 'react-router-dom';
import useUserStore from '../zustand/bearStore';
import { useState } from 'react';
import defaultUrl from '../assets/noimage.png';

const Bookmark = () => {
  const [articles, setArticles] = useState([]);
  const { getUserInfo } = useUserStore();
  const { bookmarked } = getUserInfo();
  // console.log('bookmarked', bookmarked);

  const apiHost = async () => {
    // articles, cafedb 내용 둘 다 호출
    const articleResult = await DATA_API.get(`/articles`);
    const adminResult = await DATA_API.get(`/cafedb`);
    // console.log(articleResult);
    // console.log(adminResult);

    // 두 호출 합침
    const result = [...articleResult.data, ...adminResult.data];
    // console.log('result', result);

    const arr = result.filter(article => {
      console.log('article', article);
      console.log('bookmarked', bookmarked);
      if (bookmarked.some(id => id === article.id)) {
        return true;
      } else {
        return false;
      }
    });

    setArticles(arr);
    return arr;
  };

  const {
    data: bookmarkedArticles,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: apiHost,
  });
  console.log('bookmarkedArticles', bookmarkedArticles);

  if (isPending) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다...</div>;

  return (
    <div className="px-10">
      <h1 className="mt-2 mb-3 text-xl font-bold">북마크한 게시물</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {bookmarkedArticles.map(bookmark =>
          bookmark.author_id ? (
            <Link to={`/detail?article_id=${bookmark.id}`} key={bookmark.id}>
              <div key={bookmark.id} className="overflow-hidden border rounded-lg shadow-lg w-72">
                <img
                  src={bookmark.thumbnail ?? defaultUrl}
                  alt={bookmark.title}
                  className="object-cover w-full h-64"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500">{bookmark.region}</p>
                  <h3 className="text-lg font-semibold">{bookmark.title}</h3>
                  <p className="text-sm text-blue-500">#{bookmark.category}</p>
                </div>
              </div>
            </Link>
          ) : (
            <Link to={`/cafeinfo?id=${bookmark.id}`} key={bookmark.id}>
              <div key={bookmark.id} className="overflow-hidden border rounded-lg shadow-lg w-72">
                <img
                  src={bookmark.thumbnail ?? defaultUrl}
                  alt={bookmark.title}
                  className="object-cover w-full h-64"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500">{bookmark.region}</p>
                  <h3 className="text-lg font-semibold">{bookmark.title}</h3>
                  <p className="text-sm text-blue-500">#{bookmark.category}</p>
                </div>
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  );
};
export default Bookmark;
