import gql from 'graphql-tag';

export default gql`
  {
    notes{
      id
      title
      content
      tags
    }
  }
`