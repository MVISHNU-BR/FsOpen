import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import userService from "./services/user";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const Notification = ({ message, styles }) => {
    if (message === null) {
      return null;
    }
    return <div style={styles}>{message}</div>;
  };

  const handleCreateBlog = async () => {
    try {
      const blog = {
        author: author,
        title: title,
        url: url,
      };
      const postBlog = await blogService.create(blog);
      //change this before
      const newBLogs = blogs.concat(postBlog);
      setBlogs(newBLogs);
      setSuccessMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (exeption) {
      console.log(exeption);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await userService.loginUser({
        username: username,
        password: userPassword,
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUserName("");
      setUserPassword("");
    } catch (exeption) {
      console.log(exeption);
      setErrorMessage("User name or password are incorretly");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (user === null) {
    return (
      <>
        <h2>Log in to application</h2>

        <Notification
          message={errorMessage}
          styles={{
            border: "2px solid red",
            borderRadius: "8px",
            padding: "8px",
            color: "red",
            margin: "5px",
          }}
        />

        <form action={handleLogin}>
          <div>
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => {
                setUserName(target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              onChange={({ target }) => {
                setUserPassword(target.value);
              }}
              value={userPassword}
              required
            />
          </div>
          <button>login</button>
        </form>
      </>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {user ? (
        <p>
          {user.name} logged in{" "}
          <button
            onClick={() => {
              window.localStorage.removeItem("loggedBlogUser");
              setUser(null);
            }}
          >
            logout
          </button>
        </p>
      ) : (
        ""
      )}
      <Notification
        message={successMessage}
        styles={{
          border: "2px solid green",
          borderRadius: "8px",
          padding: "8px",
          color: "green",
          margin: "5px",
        }}
      />
      <div>
        <h2>Create a new</h2>
        <form action={handleCreateBlog}>
          <div>
            <label htmlFor="title">title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={({ target }) => {
                setTitle(target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="author">author:</label>
            <input
              type="text"
              id="author"
              value={author}
              onChange={({ target }) => {
                setAuthor(target.value);
              }}
            />
          </div>

          <div>
            <label htmlFor="url">url:</label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={({ target }) => {
                setUrl(target.value);
              }}
            />
          </div>
          <button onClick={""}>create</button>
        </form>
      </div>

      <br />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
