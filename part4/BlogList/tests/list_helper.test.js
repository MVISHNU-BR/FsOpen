const listHelper = require('../utils/list_helper');
const totalLikes = require('../utils/list_helper').totalLikes;
const favoriteBlog = require('../utils/list_helper').favoriteBlog
test('dummy returns one', () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
})


describe('total likes', () => {
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
            _id: "5a422a851b54a676234d17f7",
            title: "React patterns",
            author: "Michael Chan",
            url: "https://reactpatterns.com/",
            likes: 7,
            __v: 0
        },
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0
        },
        {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
        },
        {
            _id: "5a422ba71b54a676234d17fb",
            title: "TDD harms architecture",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
            likes: 0,
            __v: 0
        },
        {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }
    ]

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
            author: "Edsger W. Dijkstra",
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
            author: "Edsger W. Dijkstra",
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
        console.log('RESULTADO')
        console.log(result[0])
        expect(result).toEqual(blogListWithOneBlog)
    })
    test('blogList with 10 blogs with most liked blog 12 likes', () => {
        const result = favoriteBlog(blogListWithTenBlogs)
        expect(result).toEqual(blogListWithOneBlog)
    })
})