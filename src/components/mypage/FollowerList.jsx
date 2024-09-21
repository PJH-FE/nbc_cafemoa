import { Link } from 'react-router-dom';

function FollowerList({ followers, title }) {
  return (
    <>
      <h2 className="text-xl">{title}</h2>
      {followers?.length ? (
        followers.map(follower => (
          <div key={follower.id}>
            <Link to={`/detail/${follower.id}`} className="flex">
              <div className="w-12 h-12 rounded-full overflow-hidden border-4 border-gray-800 flex items-center justify-center">
                <img
                  src={follower.profile_image}
                  alt={follower.description}
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{follower.user_nickname}</span>
            </Link>
          </div>
        ))
      ) : (
        <p>{title === '팔로우 목록' ? '팔로우가 없습니다' : '팔로잉이 없습니다'}</p>
      )}
    </>
  );
}

export default FollowerList;
