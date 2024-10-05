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

module.exports = {
  dummy,
  totalLikes
}