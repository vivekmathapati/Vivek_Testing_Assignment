module.exports = {
  validUserList: {
    status: 200,
    userSchema: {
      id: expect.any(Number),
      email: expect.stringMatching(/@/),
      first_name: expect.any(String),
      last_name: expect.any(String),
      avatar: expect.stringMatching(/^https?:\/\//)
    }
  }
};
