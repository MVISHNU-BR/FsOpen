const listHelper = require('../utils/list_helper');
const totalLikes = require('../utils/list_helper').totalLikes;
const favoriteBlog = require('../utils/list_helper').favoriteBlog
const mostBlogs = require('../utils/list_helper').mostBlogs
const mostLikes = require('../utils/list_helper').mostLikes

test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
})


const listWithZeroBlog = [];
const listWithOneBlog = [{
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
}
]
const listWithSixBlog = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]
describe('total likes', () => {

    test('of empty list is zero', () => {
        const result = totalLikes(listWithZeroBlog);
        expect(result).toBe(0);

    })

    test('when likst has only one blog equals the likes of that', () => {
        const result = totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = totalLikes(listWithSixBlog)
        expect(result).toBe(36)
    })


});

describe('most liked blog', () => {
    const blogListWithZeroBlogs = []
    const blogListWithOneBlog = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        }
    ]
    const blogListWithTenBlogs = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 8
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 3
        },
        {
            title: "Canonical string reduction",
            author: "Pedro Silva ",
            likes: 2
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 5
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 4
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            title: "Canonical string reduction",
            author: "Another Author",
            likes: 11
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 10
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 2
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 1
        }
    ]
    test('blogList with zero blogs', () => {
        const result = favoriteBlog(blogListWithZeroBlogs);
        expect(result).toEqual([]);
    })

    test('blogList with one blog with 12 likes;', () => {
        const result = favoriteBlog(blogListWithOneBlog)
        expect(result).toEqual(blogListWithOneBlog)
    })
    test('blogList with 10 blogs with most liked blog 12 likes', () => {
        const result = favoriteBlog(blogListWithTenBlogs)
        expect(result).toEqual(blogListWithOneBlog)
    })

    test('author with most blogs', () => {
        const result = mostBlogs(blogListWithTenBlogs);

        expect(result.blogs).toBe(8)
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 8
        })
    })
    test('author with most liked blogs', () => {
        const result = mostLikes(blogListWithTenBlogs);

        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 45
        })
    })
})