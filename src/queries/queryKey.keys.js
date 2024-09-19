const queryKey = {
  default: {
    articlesByAuthor: authorId => ['articles', { authorId }],
    userRelations: userId => ['relations', { userId }],
    userById: userId => ['user', { userId }],
  },
};

export default queryKey;
