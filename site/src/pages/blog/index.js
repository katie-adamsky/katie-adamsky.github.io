import { useState, useEffect } from "react";
import {Routes, Route, Link, Outlet} from 'react-router-dom';
import './blog.css';
import BlogPost from "./BlogPost";


function Blog() {
  const [blogPosts, setBlogPosts] = useState(null);

  useEffect(() => {
      const contentful = require('contentful')
      const client = contentful.createClient({
        space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
      })

      client
      .getEntries({
        content_type: "pageBlogPost",
        limit: 10,
        include: 10,
      })
      .then((posts) => setBlogPosts(posts.items))
      .catch(console.error);
  }, []);
  if (!blogPosts) {
    return <div className="blog">"Loading..."</div>;
  }

  function BlogPosts(blogPosts) {
    return (
        <div className="blog">
            {blogPosts.blogPosts.map((post) => (
            <div key={`${post.fields.slug}`} className="blog-post-card">
                <div className="header-container">
                    <img src={`${post.fields.featuredImage?.fields?.file?.url}`}
                      alt={`${post.fields.slug}`} className="featured-image"/>
                      <div className="box"> 
                        <h3><Link to={`${post.fields.slug}`}>{post.fields.title}</Link></h3>
                        <p>{`${post.fields.shortDescription}`}</p>
                      </div>
                      <p className="preview">
                        {post.fields?.content?.content?.[0].content?.[0].value}
                        <Link className="preview" to={`${post.fields.slug}`}>See more</Link>
                      </p>
                </div>
                <div className="blog-content">
                    <Outlet />
                </div>
            </div>
            ))}
        </div>
    );
    }
  return (
      <div className="blog-posts">
          <Routes>
            <Route index element={<BlogPosts blogPosts={blogPosts} />} />
            {blogPosts.map((_post) => {
                return (<Route exact path=":postId" element={<BlogPost posts={blogPosts}/>}/>);
            })}
          </Routes>
      </div>
  )
}

export default Blog;