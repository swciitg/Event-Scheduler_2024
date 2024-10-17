const porSchema = {
    type: 'object',
    properties: {
        _id : { type: 'string', example: '5f3f1f2d6c1c8d0017d3f3a8' },
        outlookEmail: { type: 'string', example: 'p.niraj@iitg.ac.in' },
        board : { type: 'string', example: 'Cultural' },
        position : { type: 'string', example: 'Secretary' },
    }
}

export default porSchema;