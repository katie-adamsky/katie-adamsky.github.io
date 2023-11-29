import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import './blog.css';
import options from './options';

function BlogPost(){
  const {postId} = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
      const contentful = require('contentful')
      const client = contentful.createClient({
        space: process.env.REACT_APP_CONTENTFUL_SPACE_ID,
        accessToken: process.env.REACT_APP_CONTENTFUL_DELIVERY_TOKEN,
      })

      client
      .getEntries({
        content_type: "pageBlogPost",
        limit: 1,
        include: 10,
        "fields.slug": postId,
      })
      .then((post) => setBlogPost(post.items))
      .catch(console.error);
  }, [postId]);
  if (!blogPost) {
    return <div className="blog">"Loading..."</div>;
  }
  let post = blogPost[0];

  return (
  <div className="blog-post blog">
    <div className="header-container">
      <img src={`${post.fields?.featuredImage?.fields?.file?.url}`}
        alt={`${post.fields?.slug}`} className="featured-image" />
      <h3>{post.fields?.title}</h3>
    </div>
    <div className="rich-text">{documentToReactComponents(post.fields?.content, options)}</div>
  </div>);
}

export default BlogPost;