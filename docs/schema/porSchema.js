import { definedBoards } from "../../shared/constants.js";

const porProperties = definedBoards.reduce((acc, board) => {
    acc[board] = {
        'admins': {
            type: 'array',
            items: {
                type: 'string'
            }
        },
        'clubs_orgs': {
            type: 'array',
            items: {
                type: 'string'
            }
        }
    }
    return acc;
}
, {});

const porSchema = {
    type: 'object',
    properties: porProperties
}

export default porSchema;