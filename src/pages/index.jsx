import React from 'react';
import { graphql } from 'gatsby';

import { Flex, Box } from '../components/Primitives';
import { Heading1 } from '../components/Variants';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';
import TourCard from '../components/TourCard';
import tourData from '../data/tours';

// eslint-disable-next-line react/prop-types
const IndexPage = ({ data }) => {
  const tours = data.allFile.edges.map(({ node }) => ({
    image: node.childImageSharp.fluid,
    originalName: node.childImageSharp.fluid.originalName,
  }));
  return (
    <Layout>
      <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
      <Box height="calc(100vh - 100px)" pt={5}>
        <Heading1 textAlign="center" mb={5}>
          Available Tours
        </Heading1>
        <Flex flexWrap="wrap" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {tourData.map(({
            title, price, description, url,
          }) => {
            const regExp = new RegExp(title, 'i');
            return (
              <TourCard
                title={title}
                fluidImage={tours.find(({ originalName }) => originalName.match(regExp)).image}
                price={price}
                description={description}
                url={url}
              />
            );
          })}
        </Flex>
      </Box>
    </Layout>
  );
};

export const query = graphql`
  query TourQuery {
    allFile(filter: { relativePath: { regex: "/tours/" } }) {
      edges {
        node {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
              originalName
            }
          }
        }
      }
    }
  }
`;

export default IndexPage;
