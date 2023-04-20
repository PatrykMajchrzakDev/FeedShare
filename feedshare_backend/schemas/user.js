export default {
  //Name of the user
  name: 'user',
  //Name of the doc
  title: 'User',
  type: 'document',

  //Thats whats gonna be inside a doc
  fields: [
    {
      name: 'userName',
      title: 'UserName',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      //type is url string
      type: 'string',
    },
  ],
}
