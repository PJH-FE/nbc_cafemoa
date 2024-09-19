const queryKey = {
  default: {
    articlesByAuthor: authorId => ['articles', { authorId }],
    followers: userId => ['followers', { userId }],
  },
};

export default queryKey;
