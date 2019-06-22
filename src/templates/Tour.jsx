import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import BgImage from '../components/BgImage';
import { Centered } from '../components/Primitives';
import { Heading1 } from '../components/Variants';
import Layout from '../layouts/Layout';

const TourTemplate = ({ data: { mdx } }) => {
  const tourImage = mdx.frontmatter.image && mdx.frontmatter.image.childImageSharp.fluid;
  return (
    <Layout>
      <BgImage
        title={mdx.frontmatter.title}
        fluid={tourImage}
        height="60vh"
        overlayColor="#00000061"
      >
        <Centered>
          <Heading1 color="bg">{mdx.frontmatter.title}</Heading1>
        </Centered>
      </BgImage>
      <MDXRenderer tourImage={tourImage}>{mdx.code.body}</MDXRenderer>
    </Layout>
  );
};

export const tourTemplateQuey = graphql`
  query TourTemplateQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
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

TourTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object,
  }).isRequired,
};

export default TourTemplate;
