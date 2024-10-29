const authSchema = {
    in: 'header',
    name: 'authorization',
    required: true,
    type: 'Bearer',
    description: 'Bearer token for authentication',
    schema: {
        type: 'string',
        example: 'Bearer <token>'
    }
}

export default authSchema;