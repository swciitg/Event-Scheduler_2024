const eventGetSchema = {
    type: 'object',
    properties: {
        _id : { type: 'string', example: '5f3f1f2d6c1c8d0017d3f3a8' },
        title: { type: 'string' , example: 'Event Title'},
        imageURL: { type: 'string', example: 'https://swc.iitg.ac.in/events/uploads/image_name.jpg', format: 'jpeg, png, jpg' },
        compressedImageURL: { type: 'string', example: 'https://swc.iitg.ac.in/events/uploads/uuid-compressed.jpg'},
        description: { type: 'string', example: 'Event Description' },
        club_org: { type: 'string', example: 'Octaves' },
        board: { type: 'string', example: 'Cultural' },
        startDateTime: { type: 'string', example: '2024-10-20T14:00:00.000Z' },
        endDateTime: { type: 'string', example: '2020-10-20T16:30:00.000Z' },
        venue: { type: 'string', example: 'New SAC' },
        contactNumber: { type: 'string', example: '9876543210' },
        categories: { type: 'array', items: { type: 'string' }, example: ['Cultural', 'Technical', 'All'] },
    }
}

export default eventGetSchema;