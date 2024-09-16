import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { cateListHandle } from '../utils/utils';

const category = ['모각코', '뷰맛집', '24시', '디저트맛집', '애견동반', '한옥', '분좋카'];

const MainCategory = () => {
  const [articleAllData, setArticleAllData] = useState([]); //article 전체데이터 상태저장
  const [cateInLists, setCateInLists] = useState([]); //필터링된 리스트 상태저장
  const [filterText, setFilterText] = useState('category'); //필터링된 리스트 상태저장
  const navigate = useNavigate();

  //article 데이터 전체 가져오기
  useEffect(() => {
    const getArticle = async () => {
      const { data: articleData } = await axios.get('http://localhost:888/article');
      setArticleAllData(articleData);
    };
    getArticle();
  }, []);

  //util : 필터링 함수호출
  const onClickfilter = cate => {
    cateListHandle(cate, articleAllData, setCateInLists, navigate, filterText);
  };

  return (
    <div className="p-[20px] flex flex-col gap-[20px] max-w-[1500px] w-full mx-auto">
      <h2>카테고리</h2>
      <ul className="flex gap-[10px] w-[100%] h-[300px] sm:grid sm:grid-cols-3 sm:grid-rows-3">
        {category.map((cate, index) => {
          return (
            <li key={index} className="flex-1 cursor-pointer" onClick={() => onClickfilter(cate)}>
              <span className="flex h-full max-h-[200px] rounded-[8px] bg-slate-400 items-center justify-center">
                {cate}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MainCategory;
