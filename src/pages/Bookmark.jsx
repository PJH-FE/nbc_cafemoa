import { useQuery } from '@tanstack/react-query';
import { DATA_API } from '../api/api';
import { Link } from 'react-router-dom';
import useUserStore from '../zustand/bearStore';
import { useState } from 'react';
import defaultUrl from '../assets/noimage.png';
import { getCategoryColor } from '../utils/getCategoryColor';

const Bookmark = () => {
  const [articles, setArticles] = useState([]);
  const { getUserInfo } = useUserStore();
  const { bookmarked, user_nickname } = getUserInfo();

  const apiHost = async () => {
    // articles, cafedb 내용 둘 다 호출
    const articleResult = await DATA_API.get(`/articles`);
    const adminResult = await DATA_API.get(`/cafedb`);

    // 두 호출 합침
    const result = [...articleResult.data, ...adminResult.data];

    const arr = result.filter(article => {
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

  if (isPending) return <div>로딩중입니다...</div>;
  if (isError) return <div>에러가 발생했습니다...</div>;

  const linkTo = bookmark => {
    return bookmark.author_id ? `/detail?article_id=${bookmark.id}` : `/cafeinfo?id=${bookmark.id}`;
  };

  return (
    <div className="content">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-4 mb-6 border-b-4 border-primary01">
        <div>
          <h2 className="sub-title mb-[10px]">북마크</h2>
          <h2 className="text-[18px] text-[#858585]">{user_nickname}님이 북마크하신 카페 리스트입니다.</h2>
        </div>
      </div>

      <div className="grid gap-y-[50px] gap-x-[10px] grid-cols-4 sm:grid-cols-2 sm:gap-x-[10px] sm:gap-y-[50px]">
        {bookmarkedArticles.map(bookmark => {
          return (
            <Link to={linkTo(bookmark)} key={bookmark.id} className="block w-full">
              <div key={bookmark.id} className="overflow-hidden border rounded-lg shadow-lg">
                <div className="relative flex items-center justify-center w-full py-[62.25%] h-0 overflow-hidden">
                  <img
                    className="absolute z-10 object-cover min-w-full min-h-full"
                    src={bookmark.thumbnail ?? defaultUrl}
                    alt={bookmark.title}
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500">{bookmark.region}</p>
                  <h3 className="text-lg font-semibold">{bookmark.title}</h3>

                  <p className="text-sm" style={{ color: getCategoryColor(bookmark.category) }}>
                    # {bookmark.category}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Bookmark;
