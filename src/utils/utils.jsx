//전체데이터에서 전달받은 필터값을 가진 포스트만 추려서 list에 출력
export const cateListHandle = (cate, articleAllData, setCateInLists, navigate, filterText) => {
  const filterCateInList = articleAllData.filter(list => list[filterText] === cate);
  setCateInLists(filterCateInList);
  const cateInListsParam = encodeURIComponent(JSON.stringify(filterCateInList));
  navigate(`/list-category?cate=${cate}&cateInLists=${cateInListsParam}`);
};
