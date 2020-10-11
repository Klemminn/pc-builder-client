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
import {
  FaBars,
  FaCartPlus,
  FaCheck,
  FaPencilAlt,
  FaPlus,
} from 'react-icons/fa';

import { FormatUtils } from 'utils';
import { Colors, Themes } from 'styles';
import Link from './Link';

type ButtonProps = BootstrapButtonProps & {
  color?: Themes.ThemeTypes;
  to?: string;
};

const StyledButton = styled(BootstrapButton)<ButtonProps>`
border: none;
${({ color }) =>
  `
background-color: ${Themes.ColorThemes[color ?? 'default'].background};
color: ${Themes.ColorThemes[color ?? 'default'].font}
`}}
`;

export const Button: React.FC<ButtonProps> = ({ to, ...rest }) =>
  to ? (
    <Link to={to}>
      <StyledButton {...rest} />
    </Link>
  ) : (
    <StyledButton {...rest} />
  );

const IconButtonStyle = `
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

const IconButton = styled(Button)`
  ${IconButtonStyle}
`;

export const AddButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <IconButton children={<FaPlus />} {...rest} />
);

export const EditButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <IconButton children={<FaPencilAlt />} {...rest} />
);

export const CheckButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <IconButton children={<FaCheck />} {...rest} />
);

const UnstyledMenuButton: React.FC<ButtonProps> = ({ ...rest }) => (
  <IconButton children={<FaBars />} {...rest} />
);

export const MenuButton = styled(UnstyledMenuButton)`
  position: absolute;
  background-color: transparent;
  font-size: 2rem;
  height: 5rem;
  width: 5rem;
`;

export const DropdownButtonToggle = styled(DropdownToggle)`
  ${IconButtonStyle}
  width: 100%;
`;

type OfferingsButtonProps = {
  offerings: any[];
  onSelect(item: any): void;
};

export const OfferingsButton: React.FC<OfferingsButtonProps> = ({
  offerings,
  onSelect,
  children,
}) => (
  <UncontrolledDropdown>
    <DropdownButtonToggle caret={!!children}>
      {children ?? <FaCartPlus />}
    </DropdownButtonToggle>
    <DropdownMenu>
      {offerings.map((offering, idx) => (
        <DropdownItem key={idx} onClick={() => onSelect(offering)}>
          {`${offering.retailerName} - ${FormatUtils.formatCurrency(
            offering.price,
          )}`}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledDropdown>
);
