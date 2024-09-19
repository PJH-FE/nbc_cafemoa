const queryKey = {
  default: {
    articlesByAuthor: authorId => ['articles', { authorId }],
  },
};

export default queryKey;
