const eventPath = {
    '/:id': {
        get: {
              "summary": "Get event by id",
              "description": "Retrieve details of a specific event using its ID.",
              "parameters": [
                {
                  "in": "path",
                  "name": "id",
                  "required": true,
                  "description": "Event ID",
                  "schema": {
                    "type": "string",
                    "pattern": "^[0-9a-fA-F]{24}$" // Regular expression for valid ObjectId
                  }
                },
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
              "responses": {
                "200": {
                  "description": "Event found",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                            "event": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string",
                                        "example": "Zenith 2024"
                                    },
                                    "imageURL": {
                                        "type": "string",
                                        "example": "https://example.com/image.jpg"
                                    },
                                    "compressedImageURL": {
                                        "type": "string",
                                        "example": "https://example.com/compressed-image.jpg"
                                    },
                                    "description": {
                                        "type": "string",
                                        "example": "Zenith is the annual club orientation event of Octaves, IITG."
                                    },
                                    "club_org": {
                                        "type": "string",
                                        "example": "Octaves"
                                    },
                                    "startDateTime": {
                                        "type": "string",
                                        "example": "2024-10-17T19:00:00.000Z"
                                    },
                                    "endDateTime": {
                                        "type": "string",
                                        "example": "2024-10-17T22:00:00.000Z"
                                    },
                                    "venue": {
                                        "type": "string",
                                        "example": "Auditorium"
                                    },
                                    "contactNumber": {
                                        "type": "string",
                                        "example": "9876543210"
                                    }
                                }
                            }
                        }
                      }
                    }
                  }
                },
                "400": {
                  "description": "Invalid event ID or missing event ID",
                  "content": {
                    "application/json": {
                      "schema": {
                        type: "object",
                        properties: {
                          message: {
                            type: "string",
                            example: "Event ID is required" // Example for missing ID
                          }
                        }
                      }
                    }
                  }
                },
                "404": {
                  "description": "Event not found",
                  "content": {
                    "application/json": {
                      "schema": {
                        type: "object",
                        properties: {
                          message: {
                            type: "string",
                            example: "Event not found"
                          }
                        }
                      }
                    }
                  }
                },
                "500": {
                  "description": "Server error",
                  "content": {
                    "application/json": {
                      "schema": {
                        type: "object",
                        properties: {
                          message: {
                            type: "string",
                            example: "Server error"
                          }
                        }
                      }
                    }
                  }
                }
              }
        },
        put: {
                "summary": "Edit an existing event",
                "description": "Update the details of an existing event using its ID.",
                "parameters": [
                {
                    "in": "path",
                    "name": "id",
                    "required": true,
                    "description": "Event ID to edit",
                    "schema": {
                    "type": "string",
                    "pattern": "^[0-9a-fA-F]{24}$" // Regular expression for valid ObjectId
                    }
                },
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
                "requestBody": {
                "content": {
                    "multipart/form-data": {
                    "schema": {
                        "type": "object",
                        "properties": {
                        "title": {
                            "type": "string",
                            "example": "Zenith 2024"
                        },
                        "description": {
                            "type": "string",
                            "example": "Zenith is the annual club orientation event of Octaves, IITG."
                        },
                        "startDateTime": {
                            "type": "string",
                            "example": "2024-10-17T19:00:00.000Z"
                        },
                        "endDateTime": {
                            "type": "string",
                            "example": "2024-10-17T22:00:00.000Z"
                        },
                        "venue": {
                            "type": "string",
                            "example": "Auditorium"
                        },
                        "club_org": {
                            "type": "string",
                            "example": "Octaves"
                        },
                        "contactNumber": {
                            "type": "string",
                            "example": "9876543210"
                        },
                        "file": {
                            "type": "string",
                            "description": "Image file",
                        }
                        },
                        "required": [] // You can specify required fields here if any
                    }
                    }
                }
                },
                "responses": {
                "200": {
                    "description": "Event edited successfully",
                    "content": {
                    "application/json": {
                        "schema": {
                        type: "object",
                        properties: {
                            edited_successfully: {
                            type: "boolean",
                            example: true
                            }
                        }
                        }
                    }
                    }
                },
                "400": {
                    "description": "Invalid event ID or unauthorized access",
                    "content": {
                    "application/json": {
                        "schema": {
                        type: "object",
                        properties: {
                            message: {
                            type: "string",
                            example: "You are not authorized to edit this event, as you are not a part of this club/organization."
                            }
                        }
                        }
                    }
                    }
                },
                "404": {
                    "description": "Event not found",
                    "content": {
                    "application/json": {
                        "schema": {
                        type: "object",
                        properties: {
                            message: {
                            type: "string",
                            example: "Event not found"
                            }
                        }
                        }
                    }
                    }
                },
                "500": {
                    "description": "Server error while editing the event",
                    "content": {
                    "application/json": {
                        "schema": {
                        type: "object",
                        properties: {
                            edited_successfully: {
                            type: "boolean",
                            example: false
                            }
                        }
                        }
                    }
                    }
                }
                }
        },
        delete: {
            "summary": "Delete an existing event",
            "description": "Delete an event using its ID.",
            "parameters": [
            {
                "in": "path",
                "name": "id",
                "required": true,
                "description": "Event ID to delete",
                "schema": {
                "type": "string",
                "pattern": "^[0-9a-fA-F]{24}$" // Regular expression for valid ObjectId
                }
            },
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
            "responses": {
            "200": {
                "description": "Event deleted successfully",
                "content": {
                "application/json": {
                    "schema": {
                    type: "object",
                    properties: {
                        deleted_successfully: {
                        type: "boolean",
                        example: true
                        }
                    }
                    }
                }
                }
            },
            "400": {
                "description": "Invalid event ID or unauthorized access",
                "content": {
                "application/json": {
                    "schema": {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "You are not authorized to delete this event, as you are not a part of this club/organization."
                        }
                    }
                    }
                }
                }
            },
            "404": {
                "description": "Event not found",
                "content": {
                "application/json": {
                    "schema": {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Event not found"
                        }
                    }
                    }
                }
                }
            },
            "500": {
                "description": "Server error while deleting the event",
                "content": {
                "application/json": {
                    "schema": {
                    type: "object",
                    properties: {
                        message: {
                        type: "string",
                        example: "Server error"
                        }
                    }
                    }
                }
                }
            }
            }
        }
    },
}

export default eventPath;