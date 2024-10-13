const eventsPath = {
    '/': {
        get: {
            tags: ['Events'],
            summary: 'Get all events',
            description: 'Get all events',
            operationId: 'getAllEvents',
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
                    description: 'All events fetched successfully',
                    // get schema from models/eventModel.js
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'All events fetched successfully'
                                    },
                                    allEvents: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                title: {
                                                    type: 'string',
                                                    example: 'Zenith 2024'
                                                },
                                                imageURL: {
                                                    type: 'string',
                                                    example: 'https://example.com/image.jpg'
                                                },
                                                compressedImageURL: {
                                                    type: 'string',
                                                    example: 'https://example.com/compressed-image.jpg'
                                                },
                                                description: {
                                                    type: 'string',
                                                    example: 'Zenith is the annual club orientation event of Octaves, IITG.'
                                                },
                                                club_org: {
                                                    type: 'string',
                                                    example: 'Octaves'
                                                },
                                                startDateTime: {
                                                    type: 'string',
                                                    example: '2024-10-17T19:00:00.000Z'
                                                },
                                                endDateTime: {
                                                    type: 'string',
                                                    example: '2024-10-17T21:00:00.000Z'
                                                },
                                                venue: {
                                                    type: 'string',
                                                    example: 'Auditorium'
                                                },
                                                contactNumber: {
                                                    type: 'string',
                                                    example: '9876543210'
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                },
                '500': {
                    description: 'Server error, could not get all events',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Server error, could not get all events'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        post: {
            tags: ['Events'],
            summary: 'Post a new event',
            description: 'Post a new event',
            operationId: 'postEvent',
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
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: {
                            type: 'object',
                            properties: {
                                title: {
                                    type: 'string',
                                    example: 'Zenith 2024',
                                },
                                description: {
                                    type: 'string',
                                    example: 'Zenith is the annual club orientation event of Octaves, IITG.'
                                },
                                startDateTime: {
                                    type: 'string',
                                    example: '2024-10-17T19:00:00.000Z',
                                },
                                endDateTime: {
                                    type: 'string',
                                    example: '2024-10-17T21:00:00.000Z',
                                },
                                venue: {
                                    type: 'string',
                                    example: 'Auditorium'
                                },
                                club_org: {
                                    type: 'string/enum',
                                    example: 'Octaves',
                                },
                                contactNumber: {
                                    type: 'string',
                                    example: '9876543210'
                                },
                                file: {
                                    description: 'Image file',
                                }
                            },
                            required: ['title', 'club_org', 'startDateTime', 'endDateTime'],
                        },
                    }
                }
            },
            responses: {
                '201': {
                    description: 'Event created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    saved_successfully: {
                                        type: 'boolean',
                                        example: true
                                    },
                                    id: {
                                        type: 'string',
                                        example: '60f0f4e9a8e1a70015e6b9c4'
                                    }
                                }
                            }
                        }
                    }
                },
                '400': {
                    description: 'Bad request, required fields missing',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    saved_successfully: {
                                        type: 'boolean',
                                        example: false
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Title, club_org, startDateTime and endDateTime are required fields'
                                    }
                                }
                            }
                        }
                    }
                },
                '500': {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    saved_successfully: {
                                        type: 'boolean',
                                        example: false
                                    },
                                    message: {
                                        type: 'string',
                                        example: 'Internal Server error'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

export default eventsPath;