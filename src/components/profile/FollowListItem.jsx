import { CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';

function FollowerList({ followers, title }) {
  const truncateText = text => {
    const maxLineCount = 20;
    if (text.length > maxLineCount) return text.slice(0, maxLineCount - 1) + '...';
    return text;
  };

  return (
    <section className="h-[calc(100%-51px)]  sm:bg-white flex flex-col item-center sm:shadow-xl">
      {followers?.length ? (
        followers.map(follower => (
          <div key={follower.id} className="p-2 px-4 border-b-2 border-b-primary01">
            <Link to={`/profile/${follower.id}`} className="flex gap-4">
              <div className="flex items-center justify-center w-12 h-12 overflow-hidden border-2 border-gray-800 rounded-full">
                {follower.profile_image ? (
                  <img
                    src={follower.profile_image}
                    alt={follower.description}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <CircleUserRound size={48} strokeWidth={1} />
                )}
              </div>
              <div>
                <div className="text-lg font-semibold">{follower.user_nickname}</div>
                <div className="text-sm font-light">{truncateText(follower.description)}</div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="flex items-center justify-center py-6">{title} 없습니다</p>
      )}
    </section>
  );
}

export default FollowerList;
