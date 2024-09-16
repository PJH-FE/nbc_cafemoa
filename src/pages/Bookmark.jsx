import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Bookmark = () => {
  const fetchBookmarkedArticles = async () => {
    const res = await axios.get('http://localhost:5000/articles?isBookmarked=true');
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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bookmarks.map(bookmark => (
          <div key={bookmark.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img src={bookmark.image} alt={bookmark.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{bookmark.title}</h3>
              <p className="text-sm text-gray-500">{bookmark.region}</p>
              <p className="text-sm text-blue-500">{bookmark.category}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Bookmark;
