import { Link, useSearchParams } from 'react-router-dom';
import { useFetchCafeInfo } from '../queries/boardQueries';
import Map from '../components/board/Map';
import Comments from '../components/Comments';

const CafeInfo = () => {
  const [searchParams] = useSearchParams();
  const nowCafeId = searchParams.get('id');
  const { data: cafeInfo, isPending, isError } = useFetchCafeInfo(nowCafeId);

  if (isPending) return;
  if (isError) return;

  const cafeData = { cafe_name: cafeInfo?.title, cafe_address: cafeInfo?.cafe_address };

  return (
    <>
      <div className="cafe-wrap max-w-[1500px] mx-auto py-20">
        <div className="cafe-info flex justify-center gap-10 w-4/5 mx-auto">
          <div className="thumbnail w-3/6">
            <img src={cafeInfo.thumbnail} alt="thumbnail" />
          </div>

          <div className="info-box flex flex-col w-1/2 py-6">
            <div className="mb-2 text-base">{cafeInfo.category}</div>
            <div className="text-2xl font-bold">{cafeInfo.title}</div>
            {cafeInfo.sns && (
              <div className="flex mt-3">
                <span className="inline-block min-w-20">SNS</span>
                <Link to={cafeInfo.sns} target="_blank">
                  {cafeInfo.sns}
                </Link>
              </div>
            )}
            <div className="flex mt-3">
              <span className="inline-block min-w-20">Phone</span> {cafeInfo.phone}
            </div>
            <div className="flex mt-3">
              <span className="inline-block min-w-20">Hours</span>
              <div>
                {Object.keys(cafeInfo.openingHours).map(day => {
                  return (
                    <div key={day}>
                      {day} : {cafeInfo.openingHours[day]}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="cafe-map mt-20">
          <div className="address mb-6">
            <div className="text-4xl font-bold">찾아오시는 길</div>
            <span className="block text-xl mt-4">{cafeInfo.cafe_address}</span>
          </div>
          <Map cafeData={cafeData} />
        </div>
        <Comments nowArticleId={nowCafeId} />
      </div>
    </>
  );
};
export default CafeInfo;
