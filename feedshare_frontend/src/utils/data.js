export const userQuery = (userId) => {
  //get document of type 'user' and _id of 'userId'
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};
