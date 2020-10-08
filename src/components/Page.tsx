import React from 'react';
import styled from '@emotion/styled';

import { Colors } from 'styles';

const Container = styled.div`
  margin: 1rem 2rem;
`;

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

const Page: React.FC<PageProps> = ({ title, ...rest }) => (
  <>
    <Title>{title}</Title>
    <Container {...rest} />
  </>
);

export default Page;
