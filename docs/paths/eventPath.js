import eventGetSchema from "../schema/eventGetSchema.js";
import eventPostSchema from "../schema/eventPostSchema.js";
import authHeader from "../schema/authHeader.js";
import securityKeyHeader from "../schema/securityKeyHeader.js";

const eventPath = {
    '/:id': {
        get: {
            "tags": ["Events"],
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
                authHeader,
                securityKeyHeader
              ],
              "responses": {
                "200": {
                  "description": "Event found",
                  "content": {
                    "application/json": {
                      "schema": {
                        "type": "object",
                        "properties": {
                            "event": eventGetSchema
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
            "tags": ["Events"],
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
                authHeader,
                securityKeyHeader
                ],
                "requestBody": {
                "content": {
                    "multipart/form-data": {
                    "schema": eventPostSchema
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
            "tags": ["Events"],
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
            authHeader,
            securityKeyHeader
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