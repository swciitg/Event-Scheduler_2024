const eventPostSchema = {
    type: 'multipart/form-data',
    properties: {
        title: { type: 'string', example: 'Event Title' },
        description: { type: 'string', example: 'Event Description' },
        club_org: { type: 'string', example: 'Octaves' },
        board: { type: 'string', example: 'Cultural' },
        startDateTime: { type: 'string', example: '2024-10-20T14:00:00.000Z' },
        endDateTime: { type: 'string', example: '2020-10-20T16:30:00.000Z' },
        venue: { type: 'string', example: 'New SAC' },
        contactNumber: { type: 'string', example: '9876543210' },
        categories: { type: 'array', items: { type: 'string' }, example: ['Cultural', 'Technical', 'All'] },
    },
    required: ['title', 'club_org', 'board', 'startDateTime', 'endDateTime']
}

export default eventPostSchema;