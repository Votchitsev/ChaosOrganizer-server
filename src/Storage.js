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

  getTextPostList(param) {
    let arr;

    if (param.search) {
      arr = Array.from(this.textPosts)
        .reverse();

      const filtredArr = [];

      for (let i = 0; i < arr.length; i += 1) {
        if (arr[i].text.toLowerCase().includes(param.search.toLowerCase())) {
          filtredArr.push(arr[i]);
        }
      }

      return new Set(filtredArr);
    }

    arr = Array.from(this.textPosts)
      .reverse()
      .slice(Number(param.start), Number(param.end) + 1);

    return new Set(arr);
  }
}

module.exports = Storage;
