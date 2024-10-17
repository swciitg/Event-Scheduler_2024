const security_keyHeader = {
    in: 'header',
    name: 'security-key',
    required: true,
    description: 'Bearer token for authentication',
    schema: {
        type: 'string',
        example: '<security-key>'
    }
}

export default security_keyHeader;