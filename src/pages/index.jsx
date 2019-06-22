import React from 'react';
import { graphql } from 'gatsby';

import { Flex, Box } from '../components/Primitives';
import { Heading1 } from '../components/Variants';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';
import TourCard from '../components/TourCard';

// eslint-disable-next-line react/prop-types
const IndexPage = ({ data }) => {
  const tours = data.allToursJson.edges.map(({ node }) => {
    const {
      description, price, title, url, image,
    } = node;
    return {
      description,
      price,
      title,
      url,
      image: image.childImageSharp.fluid,
    };
  });
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <Box height="calc(100vh - 100px)" pt={5}>
        <Heading1 textAlign="center" mb={5}>
          Available Tours
        </Heading1>
        <Flex flexWrap="wrap" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {tours.map(({
            title, price, description, url, image,
          }) => (
            <TourCard
              title={title}
              fluidImage={image}
              price={price}
              description={description}
              url={url}
            />
          ))}
        </Flex>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query TourQuery {
    allToursJson {
      edges {
        node {
          description
          price
          title
          url
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
