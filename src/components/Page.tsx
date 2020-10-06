import React from 'react';
import styled from '@emotion/styled';

import { Colors } from 'style';

const Container = styled.div``;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 5rem;
  font-size: 2rem;
  background-color: ${Colors.Black};
  color: ${Colors.GreyLight};
  text-transform: uppercase;
  font-weight: 600;
`;

type PageProps = {
  title: string;
};

const Page: React.FC<PageProps> = ({ children, title, ...rest }) => (
  <Container {...rest}>
    <Title>{title}</Title>
    {children}
  </Container>
);

export default Page;
