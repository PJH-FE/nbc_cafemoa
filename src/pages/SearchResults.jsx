import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useSearchedArticles } from '../queries/searchArticleQuery';
import { useState } from 'react';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('keyword');

  const { data: articles, isPending, error } = useSearchedArticles(searchKeyword);

  if (isPending) return <p>로딩중</p>;
  if (error) return <p>에러: {error.message}</p>;
  console.log('articles', articles);
  return (
    <div>
      <p>{articles.length}개의 게시물이 있습니다.</p>
      <ul>
        {articles.length === 0 ? (
          <div>검색 결과가 없습니다.</div>
        ) : (
          articles.map(article => <li key={article.id}>{article.title}</li>)
        )}
      </ul>
    </div>
  );
};
export default SearchResults;
