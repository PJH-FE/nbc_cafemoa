import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';

const Bookmark = () => {
  const fetchBookmarkedArticles = async () => {
    const res = await DATA_API.get('/articles?isBookmarked=true');
    return res.data;
  };

  const {
    data: bookmarks,
    isPending,
    isError,
  } = useQuery({
    queryKey: ['bookmarkedArticles'],
    queryFn: fetchBookmarkedArticles,
  });

  if (isPending) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다...</div>;

  return (
    <div className="px-10">
      <h1 className="mt-2 mb-3 text-xl font-bold">북마크한 게시물</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="overflow-hidden border rounded-lg shadow-lg w-72">
            <img src={bookmark.thumbnail} alt={bookmark.title} className="object-cover w-full h-64" />
            <div className="p-4">
              <p className="text-sm text-gray-500">{bookmark.region}</p>
              <h3 className="text-lg font-semibold">{bookmark.title}</h3>
              <p className="text-sm text-blue-500">#{bookmark.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Bookmark;
