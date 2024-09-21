import { Link } from 'react-router-dom';

function FollowerList({ followers, title }) {
  const truncateText = text => {
    const maxLineCount = 20;
    if (text.length > maxLineCount) return text.slice(0, maxLineCount - 1) + '...';
    return text;
  };

  return (
    <section>
      {followers?.length ? (
        followers.map(follower => (
          <div key={follower.id} className="border-b-customHardBorder border-2 p-2 px-4">
            <Link to={`/detail/${follower.id}`} className="flex gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-800 flex items-center justify-center">
                <img
                  src={follower.profile_image}
                  alt={follower.description}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-lg">{follower.user_nickname}</div>
                <div className="font-light text-sm">{truncateText(follower.description)}</div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center">{title} 없습니다</p>
      )}
    </section>
  );
}

export default FollowerList;
