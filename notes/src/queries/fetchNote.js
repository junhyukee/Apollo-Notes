import gql from 'graphql-tag';

export default gql`
    query NoteQuery($id: ID!) {
        note(id: $id) {
            id
            title
            content
            tags
        }
    }
`