import eventGetSchema from "../schema/eventGetSchema.js";
import security_keyHeader from "../schema/securityKeyHeader.js";
import authHeader from "../schema/authHeader.js";
import { definedCategories } from "../../shared/constants.js";
import { all } from "axios";

const allCategories = definedCategories.reduce((acc, category) => {
    acc[category] = {
        type: 'array',
        items: eventGetSchema
    };
    return acc;
}, {});

const categoriesPath = {
    '/categories': {
        get: {
            tags: ['Events'],
            summary: 'Get all events grouped by categories',
            parameters: [
                security_keyHeader,
                authHeader
            ],
            responses: {
                '200': {
                    description: 'Grouped events by categories',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: allCategories
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal Server Error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: { type: 'string', example: 'Internal Server Error' }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default categoriesPath;
