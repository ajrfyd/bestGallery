export default {
  keywordSearch(data) {
    const { results } = data;
    const arr = [];
    results.forEach(item => {
      arr.push({
        id: item.id,
        liked_by_user: item.liked_by_user,
        likes: item.likes,
        url: item.urls.thumb,
        user: item.user
      })
    })
    return arr;
  },
  keywordSearch2() {
    return 2;
  }
}