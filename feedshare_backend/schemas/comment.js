export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy',
    },
    //Lower object is for comment itself
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
    },
  ],
}
