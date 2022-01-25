import { gql } from "@apollo/client";

const ME = gql`
    query Me {
        me {
            id
            username
            email
            permission
        }
    }
`;


export default {
    ME,
};