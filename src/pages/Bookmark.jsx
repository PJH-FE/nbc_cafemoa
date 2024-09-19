import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';
import { Link } from 'react-router-dom';

const Bookmark = () => {
  const getBookmarks = async () => {
    const result = await DATA_API.get(`/users?user_id=asy13&_embed=articles`);
    return result.data;
  };

  const {
    data: bookmarks,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['bookmarkedArticles'],
    queryFn: getBookmarks,
  });

  if (isPending) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다...</div>;

  const bookmarked = bookmarks[0].bookmarked;
  const arr = bookmarks[0].articles.filter(article => {
    if (bookmarked.some(id => id === article.id)) {
      return true;
    } else {
      return false;
    }
  });
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
