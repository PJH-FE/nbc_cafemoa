import { useState } from 'react';
import FollowListItem from './FollowListItem';

const buttonBoxStyle =
  'border-customHardBorder border-2 flex flex-1 justify-center items-center cursor-pointer';

export default function FollowList({ following, followers }) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <section className="flex-1">
      <div className="w-full h-12 flex">
        <div
          className={`${buttonBoxStyle} ${
            !isFollowing ? 'text-white bg-customHardBorder' : 'text-customHardBorder bg-white'
          }`}
          onClick={() => setIsFollowing(false)}
        >
          팔로우
        </div>
        <div
          className={`${buttonBoxStyle} ${
            !isFollowing ? 'text-customHardBorder bg-white' : 'text-white bg-customHardBorder'
          }`}
          onClick={() => setIsFollowing(true)}
        >
          팔로잉
        </div>
      </div>
      {isFollowing ? (
        <FollowListItem followers={following} title="팔로잉이" />
      ) : (
        <FollowListItem followers={followers} title="팔로우가" />
      )}
    </section>
  );
}
