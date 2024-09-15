import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SpotListItem from './SpotListItem';
import { ChevronRight } from 'lucide-react';
import axios from 'axios';

//데이터 가져오기
const getArticle = async () => {
  const { data } = await axios.get('http://localhost:888/article');
  return data;
};

const MainRecommend = () => {
  //어떤 데이터 쓸건지 지정
  const {
    data: articleData,
    isPending: articleIsPending,
    isError: articleIsError,
  } = useQuery({
    queryKey: ['article'],
    queryFn: getArticle,
  });

  if (articleIsPending) return <div>loding,,</div>;
  if (articleIsError) return <div>error,,</div>;

  //최신순 정렬 후 4개만 뽑기
  const top4NewSpot = articleData.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);

  return (
    <div className="flex flex-col gap-[20px] p-[20px] max-w-[1500px] w-full mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-[20px]">새로운 카페</h2>
        <span className="flex items-center gap-[5px] cursor-pointer">
          전체보기
          <ChevronRight />
        </span>
      </div>
      <div className="flex w-[100%] gap-[20px]">
        {top4NewSpot.map(data => {
          return <SpotListItem key={data.id} data={data} />;
        })}
      </div>
    </div>
  );
};

export default MainRecommend;

/*
    유즈파람스로 선택한거의 텍스트? 전달해서,,
    필터로 가져온 텍스트와 같은것만 필터링 해서 보여주기 
    그거를 상태값에 새로 저장해서 
    맵으로 펼쳐주기..,ㅋ뭐라는겨
*/
