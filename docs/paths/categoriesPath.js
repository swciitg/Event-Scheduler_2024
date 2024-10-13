const categoriesPath = {
    '/categories': {
        get: {
            tags: ['Events'],
            summary: 'Get all events grouped by categories',
            parameters: [
                {
                    in: 'header',
                    name: 'authorization',
                    schema: {
                        type: 'string',
                        example: 'Bearer <token>'
                    },
                    required: true,
                    description: 'Bearer token for authorization'
                },
                {
                    in: 'header',
                    name: 'security-key',
                    schema: {
                        type: 'string',
                        example: '<security-key>'
                    },
                    required: true,
                    description: 'Security key provided by the admin',
                },
            ],
            responses: {
                '200': {
                    description: 'Grouped events by categories',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    Category: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                _id: { type: 'string' },
                                                title: { type: 'string' },
                                                imageURL: { type: 'string' },
                                                compressedImageURL: { type: 'string' },
                                                description: { type: 'string' },
                                                club_org: { type: 'string' },
                                                board: { type: 'string' },
                                                startDateTime: { type: 'string', format: 'date-time' },
                                                endDateTime: { type: 'string', format: 'date-time' },
                                                venue: { type: 'string' },
                                                categories: {
                                                    type: 'array',
                                                    items: { type: 'string' }
                                                },
                                                __v: { type: 'integer' }
                                            }
                                        }
                                    },   
                                }
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
