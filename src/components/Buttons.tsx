import React from 'react';
import styled from '@emotion/styled';
import {
  Button as BootstrapButton,
  ButtonProps as BootstrapButtonProps,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Colors, Themes } from 'styles';
import { FaBars, FaCartPlus } from 'react-icons/fa';

type ButtonProps = BootstrapButtonProps & {
  color?: Themes.ThemeTypes;
};

export const Button = styled(BootstrapButton)<ButtonProps>`
  ${({ color }) =>
    `
        background-color: ${Themes.ColorThemes[color ?? 'default'].background};
        color: ${Themes.ColorThemes[color ?? 'default'].font}
    `}}
`;

const IconButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 2.4rem;
  width: 2.4rem;
`;

const UnstyledMenuButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <IconButton children={<FaBars />} {...rest} />
);

export const MenuButton = styled(UnstyledMenuButton)`
  position: absolute;
  background-color: transparent;
  border: none;
  font-size: 2rem;
  height: 5rem;
  width: 5rem;
`;

export const DropdownButtonToggle = styled(DropdownToggle)`
  background-color: ${Colors.Orange};
  border: none;
  display: flex;
  color: ${Colors.White};
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  height: 2.4rem;
  width: 2.4rem;
`;

type CartButtonProps = {
  items: any[];
  onSelect(item: any): void;
};

export const CartButton: React.FC<CartButtonProps> = ({ items, onSelect }) => (
  <UncontrolledDropdown>
    <DropdownButtonToggle color="warning">
      <FaCartPlus />
    </DropdownButtonToggle>
    <DropdownMenu>
      {items.map((item, idx) => (
        <DropdownItem key={idx} onClick={() => onSelect(item)}>
          {item.label}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
);
