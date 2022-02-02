import {gql} from "@apollo/client";

const CREATE_BLOG = gql`
    mutation createBlog($title: String!, $outline: String!, $content: String!, $author: String!) {
        createBlog(title: $title, outline: $outline, content: $content, author: $author) {
            id
        }
    }
`;

export default {
    CREATE_BLOG,
};