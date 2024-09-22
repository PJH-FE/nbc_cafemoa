import SpotListItem from '../components/SpotListItem';
import { useLocation } from 'react-router-dom';

const ListCategory = () => {
  const location = useLocation(); // URL 파라미터 읽기
  const queryParams = new URLSearchParams(location.search);
  const cateInLists = JSON.parse(decodeURIComponent(queryParams.get('cateInLists')));

  const nowCategory = queryParams.get('category');
  const description = category => {
    switch (category) {
      case '24시':
        return '밤에도 카페인 충전이 필요하신가요? 24시간 영업 중인 카페로 고고!';
      case '모각코':
        return '혼자서 코딩은 이제 그만! 함께 모여서 코딩의 즐거움을 나눠요.';
      case '디저트':
        return '달콤함에 빠지고 싶다면? 맛있는 디저트가 있는 카페에서 힐링하세요!';
      case '뷰맛집':
        return '커피 한 잔과 함께 멋진 뷰를 즐겨보세요. 인생샷은 덤!';
      case '분좋카':
        return '분위기 좋은 카페에서 감성 충전! 인스타그램에 올릴 준비 되셨나요?';
      case '애견동반':
        return '반려견과 함께하는 카페 타임! 사랑스러운 친구와 함께 즐거운 시간 보내세요.';
      case '한옥':
        return '전통의 멋을 느끼고 싶다면 한옥 카페로! 고풍스러운 분위기에 취해보세요.';
      default:
        return '어떤 카페를 원하시나요? 다양한 선택지가 기다리고 있어요!';
    }
  };

  return (
    <div className="content">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-4 mb-6 border-b-4 border-primary01">
        <div>
          <h2 className="sub-title mb-[10px]">{nowCategory}</h2>
          <h2 className="text-[18px] text-[#858585]">{description(nowCategory)}</h2>
        </div>
      </div>
      <div className="">
        {cateInLists.length === 0 ? (
          <p className="flex items-center justify-center h-[100vh] text-center text-gray-500">
            게시물이 없습니다
          </p>
        ) : (
          <ul className="grid gap-y-[50px] gap-x-[10px] grid-cols-4 sm:grid-cols-2 sm:gap-x-[10px] sm:gap-y-[50px]">
            {cateInLists.map(data => {
              return <SpotListItem key={data.id} data={data} />;
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default ListCategory;
