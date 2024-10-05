// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce(
    (accumulatedLikes, blog) => {
      return accumulatedLikes + blog.likes
    },0
  )
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const favoriteBlog = blogs.reduce(
    (favBlog, curBlog) => {
      return (curBlog.likes > favBlog.likes ? curBlog : favBlog)
    }
  )

  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}