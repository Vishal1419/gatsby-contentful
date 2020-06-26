import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';

import blogStyles from './blog.module.scss';
import Layout from '../components/layout';
import Head from '../components/head';

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogPost (
        sort: {
          fields: publishedDate,
          order: DESC
        }
      ) {
        edges {
          node {
            title
            slug
            publishedDate (formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <Head title="Blogs" />
      <h1>Blogs</h1>
      <ol className={blogStyles.blogPosts}>
        {
          data.allContentfulBlogPost.edges.map(edge => (
            <li className={blogStyles.blogPost}>
                <Link to={`/blog/${edge.node.slug}`}>
                  <h2>{edge.node.title}</h2>
                  <p>{edge.node.publishedDate}</p>
                </Link>
            </li>
          ))
        }
      </ol>
    </Layout>
  );
}

export default BlogPage;
