import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card as RebassCard } from 'rebass';
import Image from 'gatsby-image';

import {
  Text, Flex, Box, Heading,
} from './Primitives';
import Link from './Link';

const WrapLink = styled(Link)`
  :focus {
    outline: 1px solid transparent;
  }
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;

const Container = styled(Box)`
  position: relative;
  will-change: transform;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  &:focus-within {
    transform: translateY(-10px) scale(1.01);
    outline: 1px solid ${({ theme }) => theme.colors.primary};
  }
  :hover {
    transform: translateY(-10px) scale(1.01);
  }
`;
const Tag = styled(Box)`
  position: absolute;
  top: -3px;
  left: 5px;
  z-index: 2;
  border-radius: 2px;
  color: white;
  background-color: ${({ theme }) => theme.colors.accent};
`;

const Card = ({
  title, fluidImage, price, description, url,
}) => (
  <Container width={[1, 1 / 2, 1 / 3, 1 / 3, 1 / 4]} mb={3}>
    <Flex px={2}>
      <RebassCard width={1} mx="auto" boxShadow="large">
        {description && (
          <Tag py={2} px={4}>
            <Text as="strong" fontSize={3}>
              {description}
            </Text>
          </Tag>
        )}
        <Image title={title} fluid={fluidImage} style={{ height: '400px' }} />
        <Box p={[2, 3]}>
          <Heading>
            <WrapLink to={url} color="text" aria-label={description}>
              {title}
            </WrapLink>
          </Heading>
          <Text color="primary">{price}</Text>
        </Box>
      </RebassCard>
    </Flex>
  </Container>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  fluidImage: PropTypes.shape({
    originalName: PropTypes.string,
  }).isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string.isRequired,
};

Card.defaultProps = {
  description: null,
};

export default Card;
