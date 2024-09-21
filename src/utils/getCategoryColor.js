export const getCategoryColor = category => {
  switch (category) {
    case '모각코':
      return '#f82c4e';
    case '뷰맛집':
      return '#2b9ff1';
    case '24시':
      return '#9b38f7';
    case '디저트':
      return '#f5943e';
    case '애견동반':
      return '#f6ca46';
    case '한옥':
      return '#994715';
    case '분좋카':
      return '#4c9d21';
    default:
      return 'black'; // 기본 색상
  }
};
