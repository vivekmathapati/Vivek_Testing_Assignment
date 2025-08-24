module.exports = {
  postUserSchema: {
    type: 'object',
    required: ['name', 'job', 'id', 'createdAt'],
    properties: {
      name: { type: 'string' },
      job: { type: 'string' },
      id: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' }
    }
  }
};
