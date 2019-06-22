import React from 'react';

import { Box } from '../components/Primitives';
import { Heading1, TextWide, TextNormal } from '../components/Variants';
import Layout from '../layouts/Layout';
import SEO from '../components/SEO';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={['gatsby', 'application', 'react']} />
    <Box height="calc(100vh - 100px)" pt={5}>
      <Heading1>Hi people</Heading1>
      <TextWide as="p">Welcome to your new Gatsby site.</TextWide>
      <TextNormal as="p" pb={3}>
        Now go build something great.
      </TextNormal>
    </Box>
  </Layout>
);

export default IndexPage;
