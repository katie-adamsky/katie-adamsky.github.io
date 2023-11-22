import { useEffect, useState } from 'react';
import { getBlogPosts } from './blog/getBlogPosts';

const Home = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      const posts = await getBlogPosts();
      setBlogPosts(posts);
    };

    fetchBlogPosts();
  }, []);

  return (
    <div>
      <h2>Blog</h2>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.sys.id}>
            <h2>{post.fields.title}</h2>
            <p>{post.fields.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
