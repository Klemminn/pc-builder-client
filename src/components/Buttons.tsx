import React from 'react';
import styled from '@emotion/styled';
import {
  Button as BootstrapButton,
  ButtonProps as BootstrapButtonProps,
} from 'reactstrap';
import { Themes } from 'style';
import { FaBars } from 'react-icons/fa';

type ButtonProps = BootstrapButtonProps & {
  color?: Themes.ThemeTypes;
};

export const Button = styled(BootstrapButton)`
  ${({ color }: ButtonProps) =>
    `
        background-color: ${Themes.ColorThemes[color ?? 'default'].background};
        color: ${Themes.ColorThemes[color ?? 'default'].font}
    `}}
`;

const IconButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  height: 5rem;
  width: 5rem;
`;

const UnstyledMenuButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <IconButton {...rest}>
    <FaBars />
  </IconButton>
);

export const MenuButton = styled(UnstyledMenuButton)`
  position: absolute;
  background-color: transparent;
  border: none;
`;
