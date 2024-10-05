var _ = require('lodash')

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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const groupByAuthor = _.groupBy(blogs, 'author')

  let author, count = 0
  _.forEach(groupByAuthor, (value, key) => {
    if (value.length > count) {
      author = key
      count = value.length
    }
  })

  return { author: author, blogs: count }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}