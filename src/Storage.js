class Storage {
  constructor() {
    this.textPosts = new Set();
  }

  addTextPost(data) {
    const post = {
      type: data.type,
      time: data.time,
      text: data.text,
      files: data.file,
    };

    if (!Array.isArray(data.file)) {
      const f = [];
      f.push(data.file);
      post.files = f;
    }

    this.textPosts.add(post);
  }

  getTextPostList() {
    return this.textPosts;
  }
}

module.exports = Storage;
