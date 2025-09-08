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

module.exports = {
    dummy, totalLikes
}