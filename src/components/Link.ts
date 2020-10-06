import { Link as RouterLink } from 'react-router-dom';
import styled from '@emotion/styled';

const Link = styled(RouterLink)`
  text-decoration: none;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default Link;
