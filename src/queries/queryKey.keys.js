const queryKey = {
  default: {
    articlesByAuthor: authorId => ['articles', { authorId }],
    followers: userId => ['followers', { userId }],
    userById: userId => ['user', { userId }],
  },
};

export default queryKey;
