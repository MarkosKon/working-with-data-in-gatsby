/* eslint-disable no-console */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

// 1. Create those slugs from file names.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });

    const frontmatterTypes = ['tour', 'destination'];
    const frontmatterType = node.frontmatter.type;
    if (frontmatterTypes.includes(frontmatterType)) {
      const parentPath = frontmatterType === 'tour' ? 'tours' : 'destinations';
      createNodeField({
        name: 'slug',
        node,
        value: `/${parentPath}${value}`,
      });
    }
  }
};

// 2. Create pages
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMdx(filter: { frontmatter: { published: { eq: true } } }) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                type
              }
            }
          }
        }
      }
    `,
  );

  if (result.errors) console.log(result.errors);

  result.data.allMdx.edges.forEach(({ node }) => {
    const tourTemplate = path.resolve('./src/templates/Tour.jsx');
    const destinationTemplate = path.resolve('./src/templates/Destination.jsx');
    const template = node.frontmatter.type === 'tour' ? tourTemplate : destinationTemplate;
    createPage({
      path: node.fields.slug,
      component: template,
      context: { id: node.id },
    });
  });
};
