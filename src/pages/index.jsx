import React from 'react';
import { graphql } from 'gatsby';

import { Flex, Box } from '../components/Primitives';
import { Heading1 } from '../components/Variants';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';
import TourCard from '../components/TourCard';

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
          <TourCard
            title="Spain"
            fluidImage={tours.find(({ originalName }) => originalName.match(/spain/i)).image}
            price="800$"
            description="1 Week in Spain"
            url="/tours/spain"
          />
          <TourCard
            title="France"
            fluidImage={tours.find(({ originalName }) => originalName.match(/France/i)).image}
            price="800$"
            description="1 Week in France"
            url="/tours/france"
          />
          <TourCard
            title="Germany"
            fluidImage={tours.find(({ originalName }) => originalName.match(/Germany/i)).image}
            price="800$"
            description="1 Week in Germany"
            url="/tours/germany"
          />
          <TourCard
            title="Greece"
            fluidImage={tours.find(({ originalName }) => originalName.match(/Greece/i)).image}
            price="800$"
            description="1 Week in Greece"
            url="/tours/greece"
          />
          <TourCard
            title="Japan"
            fluidImage={tours.find(({ originalName }) => originalName.match(/Japan/i)).image}
            price="800$"
            description="1 Week in Japan"
            url="/tours/japan"
          />
          <TourCard
            title="USA"
            fluidImage={tours.find(({ originalName }) => originalName.match(/USA/i)).image}
            price="800$"
            description="1 Week in USA"
            url="/tours/usa"
          />
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
