const porPath = {
    '/por': {
        get: {
            tags: ['POR'],
            summary: 'Get all PORs',
            description: 'Get all PORs',
            operationId: 'getAllPORs',
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
                    description: 'All PORs were obtained successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        outlookEmail: {
                                            type: 'string',
                                            example: 'p.niraj@iitg.ac.in'
                                        },
                                        board: {
                                            type: 'string',
                                            example: 'Cultural'
                                        },
                                        position: {
                                            type: 'string',
                                            example: 'Secretary'
                                        }
                                    }
                                }
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