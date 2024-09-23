# ☕ 카테고리별 맞춤형 카페정보 공유 플랫폼

- 배포 URL : https://cafemoa.vercel.app/
- Test ID : cafemoatest1
- Test PW : 123123


## 🖋️ 프로젝트 소개
다양한 카페를 카테고리별로 분류하여 사용자들에게 맞춤형 정보를 제공하는 플랫폼입니다.
사용자는 자신이 선호하는 카테고리를 선택하면, 그에 맞는 카페 추천을 받을 수 있습니다. 각 카페의 위치, 운영시간, sns 등 상세한 정보를 제
공해 사용자가 자신에게 맞는 카페를 쉽게 찾을 수 있도록 돕습니다.
또한 카페로그 목록에서 유저간의 카페정보를 공유할 수 있는 커뮤니티가 생성되어있습니다.


## 🙂 팀원 구성 및 담당 업무
- 김태현(팀장) : 마이페이지 / 팔로우 조회
- 정지형(팀원) : 회원가입 / 로그인 / 게시물검색
- 안수영(팀원) : 북마크한 글 목록 / 댓글CRUD
- 박준호(팀원) : 게시글 작성 / 수정 / 디테일페이지 / 북마크 기능 / 디자인 / 카페DB정보수집
- 임보라(팀원) : 헤더 / 푸터 / 메인페이지 / 목록페이지 / 디자인 / 카페DB정보수집


## 💻 1. 개발 환경
- Front : HTML, React, Tailwind CSS
- Back-end : json-server
- 버전 및 이슈관리 : Github
- 협업 툴 : Slack, Notion, Github
- 서비스 배포 환경 : Vercel
- 디자인 : [Figma](https://www.figma.com/design/HLX581Cyobq8Bk3eBS4OWW/Untitled?node-id=0-1&node-type=canvas&t=3rOAepNyUUxgOWyK-0)
- [커밋 컨벤션](https://teamsparta.notion.site/Github-Rules-9d03e98fac544f35a05fcaa08f9f4aa7)
- [코드 컨벤션](https://teamsparta.notion.site/Code-Convention-3d438e4910b24d7caf08ccc693ac5f57)
  

## ✔️ 2. 채택한 개발 기술
- TailWind CSS 
  * 추후 유지보수보다 당장 구현을 하는데 시간을 단축시킬 수 있는 방안으로 테일윈드 선택
- Zustand 
  * 불필요한 전역 state를 로컬 state로 관리하고, 가벼운 전역 state 관리를 위해 Zustand 채택
- TanStack Query
  * 비동기 데이터와 상태관리를 효율적으로 처리하기 위해 선택
    

## 📂 3. 프로젝트 구조

<details>
<summary>접었다 펴기</summary>

```
src
 ┣ api
 ┃ ┣ AuthClient.js
 ┃ ┗ api.js
 ┣ assets
 ┃ ┣ icons
 ┃ ┃ ┗ FollowIcon.jsx
 ┃ ┣ KoddiUDOnGothic-Bold.woff2
 ┃ ┣ KoddiUDOnGothic-Regular.woff2
 ┃ ┣ favicon.ico
 ┃ ┣ insta.png
 ┃ ┗ noimage.png
 ┣ components
 ┃ ┣ board
 ┃ ┃ ┣ FormInput.jsx
 ┃ ┃ ┣ Map.jsx
 ┃ ┃ ┗ ToastForm.jsx
 ┃ ┣ common
 ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┣ Header.jsx
 ┃ ┃ ┗ Layout.jsx
 ┃ ┣ profile
 ┃ ┃ ┣ ArticlesSection.jsx
 ┃ ┃ ┣ FollowButton.jsx
 ┃ ┃ ┣ FollowList.jsx
 ┃ ┃ ┣ FollowListItem.jsx
 ┃ ┃ ┗ ProfileSection.jsx
 ┃ ┣ AreaCategory.jsx
 ┃ ┣ AuthForm.jsx
 ┃ ┣ BookmarkedList.jsx
 ┃ ┣ Comments.jsx
 ┃ ┣ DescriptionEditor.jsx
 ┃ ┣ MainBanner.jsx
 ┃ ┣ MainCategory.jsx
 ┃ ┣ MainRecommend.jsx
 ┃ ┣ NicknameEditor.jsx
 ┃ ┣ ProfileImageUploader.jsx
 ┃ ┣ SearchInput.jsx
 ┃ ┣ SpotListItem.jsx
 ┃ ┣ UserListItem.jsx
 ┃ ┗ WritingFixBtn.jsx
 ┣ data
 ┃ ┗ category.js
 ┣ hooks
 ┃ ┗ useUser.js
 ┣ mutation
 ┃ ┣ useToggleFollowMutation.js
 ┃ ┗ useUpdateUserMutation.js
 ┣ pages
 ┃ ┣ Bookmark.jsx
 ┃ ┣ CafeInfo.jsx
 ┃ ┣ Detail.jsx
 ┃ ┣ Edit.jsx
 ┃ ┣ Home.jsx
 ┃ ┣ List.jsx
 ┃ ┣ ListCategory.jsx
 ┃ ┣ Login.jsx
 ┃ ┣ ProfilePage.jsx
 ┃ ┣ SearchResults.jsx
 ┃ ┣ SignUp.jsx
 ┃ ┣ UsersCommutity.jsx
 ┃ ┗ Write.jsx
 ┣ queries
 ┃ ┣ boardQueries.js
 ┃ ┣ queryKey.keys.js
 ┃ ┣ searchArticleQuery.js
 ┃ ┣ useGetArticlesByAuthorIdQuery.js
 ┃ ┣ useGetUserByIdQuery.js
 ┃ ┗ useGetUserRelationsQuery.js
 ┣ services
 ┃ ┣ api.js
 ┃ ┗ userService.js
 ┣ shared
 ┃ ┣ PrivateRouter.jsx
 ┃ ┗ Router.jsx
 ┣ supabase
 ┃ ┗ supabase.js
 ┣ utils
 ┃ ┣ cateListHandle.jsx
 ┃ ┣ getCategoryColor.js
 ┃ ┣ getNowDate.js
 ┃ ┗ goDetail.jsx
 ┣ zustand
 ┃ ┗ bearStore.js
 ┣ App.jsx
 ┣ index.css
 ┣ main.jsx
 ┗ reset.css
```
</details>

<br/>

## 🗓️ 4. 개발 기간 및 작업 관리
- 전체 개발 기간 : 2024.09.12 ~ 2024.09.23
  
  <br/>

## ✨ 5. 주요 기능

### 1️⃣ 메인페이지
![main](https://github.com/user-attachments/assets/4c9b7af8-7a47-489d-90c9-4431864b5689)

#### 1-1. 스와이퍼 배너
메인 배너와 지역 카테고리 등 컨텐츠들을 스와이프 제스처로 확인 하실 수 있습니다.


#### 1-2. 햄버거 메뉴
상단 햄버거메뉴를 통해 카테고리에 쉽게 접근 가능합니다.

<br/>

### 2️⃣ 카테고리
![category](https://github.com/user-attachments/assets/19be36a8-3f62-4a97-9952-fbcb64bac57f)


#### 2-1. 모아보기
상단 모아보기 버튼을 통해, 카페모아에서 제공하는 모든 카페 데이터들을 한 번에 확인 하실 수 있습니다.

#### 2-2. 카테고리
햄버거 메뉴를 통해 카테고리에 접근하여, 해당 카테고리의 데이터들만 확인이 가능합니다.

<br/>

### 3️⃣ 상세페이지
![detail](https://github.com/user-attachments/assets/27da4606-8f7d-4628-9225-d606b5d2b9a7)


#### 3-1. 카카오 API
카카오 API를 이용한 지도로 해당 카페의 위치를 확인 하실 수 있습니다.

#### 3-2. 댓글
로그인 회원은, 각 게시글에 댓글을 추가/수정/삭제 하실 수 있습니다.


<br/>

### 4️⃣ 검색페이지
![search](https://github.com/user-attachments/assets/66d7ca16-a98c-41e5-99a5-7821782f78fa)

카페모아의 게시글과 카페 정보를 검색을 통해 원하는 데이터만 확인 하실 수 있습니다.


<br/>

### 5️⃣ 북마크페이지
![bookmark](https://github.com/user-attachments/assets/da265d18-7645-49c2-81e8-db7b58b545e3)

원하시는 게시글들은 북마크 버튼으로 저장/삭제가 가능하며,
북마크 탭을 통해 저장된 게시글들을 확인 하실 수 있습니다.


<br/>

### 6️⃣ 프로필페이지
![profile](https://github.com/user-attachments/assets/5c3e911e-7d50-4736-88cc-22b4d59dced9)

#### 6-1. 게시글/팔로워
프로필 페이지에서는 해당 유저의 팔로워/팔로우 목록과 작성글들을 확인 하실 수 있습니다.

#### 6-2. 타인 프로필페이지
로그인 한 유저는, 원하는 유저의 프로필 페이지에서 팔로우버튼을 통해 유저를 팔로우 하실 수 있습니다.

#### 6-3. 본인 프로필 페이지
유저는 본인 프로필페이지에서 닉네임, 프로필이미지, 한줄 소개를 수정 하실 수 있습니다.


<br/>


## 📝 6. 프로젝트 후기
### 김태현 
예상보다 여러 사람이 함께 코드를 조정하고 정리하는 것이 어렵다는 점을 깊이 실감하게 되었고, 이
를 통해 다양한 배움의 필요성을 더욱 절실히 느끼게 되었습니다
### 정지형
zustand와 tanstack query를 사용해 보아서 좋았고 회원가입/로그인, 검색 기능을 개발해 볼수 있
어서 좋았다.
### 안수영
북마크 페이지 - db.json파일에 두 가지 게시글 형태가 분리되어 있어 한 페이지에 하나의 형태로 불
러오는 과정에서 db.json파일의 한계점을 많이 느꼈습니다.
댓글CRUD - 작성자 닉네임을 불러오는 과정에서 comments와 zustand로 불러온 로그인한
users 내용을 이용하여 닉네임을 불러와야 프로필 닉네임 변경 시 반영이 되는데, comments에 닉
네임 값을 추가하면서 닉네임 변경 시 반영되지 않는 부분에서 어려움을 많이 겪었습니다.
### 박준호
주소 입력에따라서 지도가 보여질 수 있게하기위해 lodash 라이브러리와 debounce를 사용해 볼
수 있어서 좋았고, 아직 깔끔한 클린코드나 리팩토링에 많이 미숙함을 느끼게 된 프로젝트였다.
### 임보라
TanStack Query와 Zustand를 다양하게 활용하는 방법에 익숙하지않아 단순한 기능부터 만들어
컴포넌트로 불러와 사용했을때 왜 사용을 하는지 이해했다.
같은 기능은 util이나 Zustand로 빼서 사용했지만 아직 반복되는 코드들이 있어서 하드코딩을 더 줄
이는 방향으로 연습해야겠다.
