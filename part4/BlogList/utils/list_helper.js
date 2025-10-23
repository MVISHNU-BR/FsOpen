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

const mostBlogs = (blogArray) => {
    const countAuthor = [];

    for (const blog of blogArray) {
        const author = blog.author
        countAuthor[author] = (countAuthor[author] || 0) + 1;
    }
    let authorWithMostBlog = "";
    let maxBlogs = 0;

    for (const author of Object.keys(countAuthor)) {
        const currentCount = countAuthor[author];

        if (currentCount > maxBlogs) {
            maxBlogs = currentCount;
            authorWithMostBlog = author;
        }
    }
    return {
        author: authorWithMostBlog,
        blogs: maxBlogs
    }
}

const mostLikes = (blogArray) => {
    const countAuthor = [];

    for (const blog of blogArray) {
        const author = blog.author;

        countAuthor[author] = (countAuthor[author] || 0) + blog.likes;
    }
    let authorWithMostLiikedBlogs = "";
    let countLikedBlogs = 0;

    for (const author of Object.keys(countAuthor)) {
        const currentCount = countAuthor[author];

        if (currentCount > countLikedBlogs) {
            countLikedBlogs = currentCount;
            authorWithMostLiikedBlogs = author;
        }
        return {
            author: authorWithMostLiikedBlogs,
            likes: countLikedBlogs
        }
    }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}