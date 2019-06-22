import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import BgImage from '../components/BgImage';
import { Centered } from '../components/Primitives';
import { Heading1 } from '../components/Variants';
import Layout from '../layouts/Layout';

const DestinationTemplate = ({ data: { mdx } }) => {
  const destinationImage = mdx.frontmatter.image && mdx.frontmatter.image.childImageSharp.fluid;
  return (
    <Layout>
      <BgImage
        title={mdx.frontmatter.title}
        fluid={destinationImage}
        height="60vh"
        overlayColor="#00000061"
      >
        <Centered>
          <Heading1 color="bg">{mdx.frontmatter.title}</Heading1>
        </Centered>
      </BgImage>
      <MDXRenderer destinationImage={destinationImage}>{mdx.code.body}</MDXRenderer>
    </Layout>
  );
};

export const pageQuery = graphql`
  query DestinationQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        image {
          childImageSharp {
            fluid(maxWidth: 1900) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      code {
        body
      }
    }
  }
`;

DestinationTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object,
  }).isRequired,
};

export default DestinationTemplate;
