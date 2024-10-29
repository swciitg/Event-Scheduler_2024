import porSchema from "../schema/porSchema.js";
import authSchema from "../schema/authHeader.js";
import securityKeySchema from "../schema/securityKeyHeader.js";

const porPath = {
    '/por': {
        get: {
            tags: ['POR'],
            summary: 'Get all PORs',
            description: 'Get all PORs',
            operationId: 'getAllPORs',
            parameters: [
                authSchema,
                securityKeySchema
            ],
            responses: {
                '200': {
                    description: 'All PORs were obtained successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: porSchema
                            }
                        }
                    }
                },
                '404': {
                    description: 'Error occurred while obtaining all PORs',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Error message'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};

export default porPath;