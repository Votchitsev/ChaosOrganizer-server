class Storage {
  constructor() {
    this.textPosts = new Set();
  }

  addTextPost(text) {
    const post = {
      type: 'textPosts',
      content: {
        text,
      },
    };
    this.textPosts.add(post);
  }

  getTextPostList() {
    return this.textPosts;
  }
}

module.exports = Storage;
