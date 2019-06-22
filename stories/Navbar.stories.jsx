/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { useSpring, animated, useTransition } from 'react-spring';

import {
  Navbar,
  DesktopList,
  DesktopListEmpty,
  MobileList,
  MobileListEmpty,
} from 'accessible-navbar';
import { Box, Centered, Text } from '../src/components/Primitives';
import { Heading1, Heading2 } from '../src/components/Variants';
import theme from '../src/layouts/theme';
import GlobalStyle from '../src/layouts/GlobalStyle';

const NavbarDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {storyFn()}
    </>
  </ThemeProvider>
);

const AnimatedDesktopList = animated(DesktopList);
const AnimatedDesktopListEmpty = animated(DesktopListEmpty);
const AnimatedMobileList = animated(MobileList);
const AnimatedMobileListEmpty = animated(MobileListEmpty);

// 1.
// const FixedWidth = styled(AnimatedMobileList)`
//   max-width: 320px;
// `;

// 2.
const FixedWidth = styled(MobileList)`
  max-width: 320px;
`;
const AnimatedFixedWidth = animated(FixedWidth);

storiesOf('Navbar', module)
  .addDecorator(withInfo)
  .addDecorator(NavbarDecorator)
  .add('default', () => (
    <Box height="200vh">
      <Navbar applicationNodeId="root" c="red" hc="blue">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </Box>
  ))
  .add('mobile breakpoint', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        desktopList={props => <DesktopList {...props} mobileBreakpoint={3000} />}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </Box>
  ))
  .add('animate DesktopList', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        topEffect
        desktopList={({ isAtTop, ...props }) => {
          const spring = useSpring({ height: isAtTop ? 80 : 100 });
          return <AnimatedDesktopList style={spring} {...props} />;
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
      <Centered height="200px">
        <Text>Scroll down</Text>
      </Centered>
    </Box>
  ))
  .add('animate DesktopList #2', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        topEffect
        desktopList={({ isAtTop, ...props }) => {
          const [spring, set] = useSpring(() => ({ height: 100 }));
          if (isAtTop) {
            set({
              height: 80,
              backgroundColor: 'white',
              color: 'black',
              borderBottom: '1px solid #e4e4e4',
            });
          } else {
            set({
              height: 100,
              backgroundColor: 'black',
              color: 'white',
              borderBottom: '1px solid black',
            });
          }
          return <AnimatedDesktopList style={spring} {...props} />;
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
      <Centered height="200px">
        <Text>Scroll down</Text>
      </Centered>
    </Box>
  ))
  .add('animate DesktopListEmpty', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        topEffect
        desktopList={({ isAtTop, ...props }) => {
          const spring = useSpring({ height: isAtTop ? 60 : 100 });
          return (
            <AnimatedDesktopListEmpty style={spring} {...props}>
              <Centered>
                <Heading2>My Content</Heading2>
              </Centered>
            </AnimatedDesktopListEmpty>
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </Box>
  ))
  .add('fade-in MobileList', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { opacity: 0 },
            enter: { opacity: 1 },
            leave: { opacity: 0 },
          });
          return transitions.map(
            ({ item, key, props }) => item && (
            <AnimatedMobileList
              {...rest}
              key={key}
              style={props}
              alwaysVisible
              mobileMenuVisible={mobileMenuVisible}
            />
            ),
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </Box>
  ))
  .add('slide-down MobileList', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { transform: 'translateY(-100vh)', opacity: 0.5 },
            enter: { transform: 'translateY(0)', opacity: 1 },
            leave: { transform: 'translateY(-100vh)', opacity: 0.5 },
          });
          return transitions.map(
            ({ item, key, props }) => item && (
            <AnimatedMobileList
              {...rest}
              key={key}
              style={props}
              alwaysVisible
              mobileMenuVisible={mobileMenuVisible}
            />
            ),
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </Box>
  ))
  .add('slide-left fixed width MobileList', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { transform: 'translateX(-320px)' },
            enter: { transform: 'translateX(0)' },
            // enter: { transform: 'translateX(calc(100vw - 320vw))', opacity: 1 },
            leave: { transform: 'translateX(-320px)' },
          });
          return transitions.map(
            ({ item, key, props }) => item && (
            <AnimatedFixedWidth
              {...rest}
              key={key}
              style={props}
              alwaysVisible
              mobileMenuVisible={mobileMenuVisible}
            />
            ),
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </Box>
  ))
  .add('slide-right MobileListEmpty', () => (
    <Box height="200vh">
      <Navbar
        applicationNodeId="root"
        mobileList={({ mobileMenuVisible, ...rest }) => {
          const transitions = useTransition(mobileMenuVisible, null, {
            from: { transform: 'translateX(100vw)', opacity: 0.5 },
            enter: { transform: 'translateX(0)', opacity: 1 },
            leave: { transform: 'translateX(100vw)', opacity: 0.5 },
          });
          return transitions.map(
            ({ item, key, props }) => item && (
            <AnimatedMobileListEmpty
              {...rest}
              key={key}
              style={props}
              alwaysVisible
              mobileMenuVisible={mobileMenuVisible}
            >
              <Centered>
                <Heading1>My Content</Heading1>
              </Centered>
            </AnimatedMobileListEmpty>
            ),
          );
        }}
      >
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </Navbar>
    </Box>
  ));
