const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogPosts) => {
    let likes = 0;

    for (const post of blogPosts) {
        likes += post.likes;
    }

    return likes
}

const favoriteBlog = (blogList) => {
    let mostLikeBlog = []
    let likes = 0;
    for (const blog of blogList) {
        if (blog.likes > likes) {
            likes = blog.likes
            mostLikeBlog.shift();
            mostLikeBlog.push(blog)
        }
    }
    return mostLikeBlog;
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}