import { useEffect } from 'react';

const { kakao } = window;

const Map = ({ cafeData, post, setPost, height }) => {
  useEffect(() => {
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(37.56251, 126.97759), // 지도의 중심좌표
        level: 1, // 지도의 확대 레벨
        mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
      };

    // 지도를 생성한다
    const map = new kakao.maps.Map(mapContainer, mapOption);

    // 주소-좌표 변환 객체를 생성합니다
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    if (!!cafeData.cafe_address) {
      geocoder.addressSearch(cafeData.cafe_address, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 결과값으로 받은 위치를 마커로 표시합니다
          const marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });

          // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
          const zoomControl = new kakao.maps.ZoomControl();
          map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
          searchDetailAddrFromCoords(coords, function (result, status) {
            // 인포윈도우로 장소에 대한 설명을 표시합니다
            const infowindow = new kakao.maps.InfoWindow();

            if (status === kakao.maps.services.Status.OK) {
              let detailAddr = !!result[0].road_address
                ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>'
                : '';
              detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

              const content = '<div class="flex flex-col h-20 ">' + detailAddr + '</div>';
              if (!!setPost) {
                setPost({
                  ...post,
                  cafe_address: result[0].address.address_name,
                  region: result[0].address.address_name.slice(0, 2),
                });
              }

              // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
              infowindow.setContent(content);

              // 마커에 마우스오버 이벤트를 등록합니다
              kakao.maps.event.addListener(marker, 'mouseover', function () {
                // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
                infowindow.open(map, marker);
              });

              // 마커에 마우스아웃 이벤트를 등록합니다
              kakao.maps.event.addListener(marker, 'mouseout', function () {
                // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
                infowindow.close();
              });
            }
          });
          function searchDetailAddrFromCoords(coords, callback) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
          }
        }
      });
    }
  }, [cafeData]);

  return <div id="map" className={`w-full h-[${height}]`}></div>;
};
export default Map;
