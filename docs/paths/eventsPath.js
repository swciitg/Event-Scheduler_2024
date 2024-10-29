import eventGetSchema from "../schema/eventGetSchema.js";
import eventPostSchema from "../schema/eventPostSchema.js";
import security_keyHeader from "../schema/securityKeyHeader.js";
import authHeader from "../schema/authHeader.js";

const eventsPath = {
    '/': {
        get: {
            tags: ['Events'],
            summary: 'Get all events',
            description: 'Get all events',
            operationId: 'getAllEvents',
            parameters: [
                authHeader,
                security_keyHeader
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
                                        items: eventGetSchema
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
                authHeader,
                security_keyHeader
            ],
            requestBody: {
                content: {
                    'multipart/form-data': {
                        schema: eventPostSchema
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
                                        example: 'Title, club_org, board, startDateTime, endDateTime are required fields'
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