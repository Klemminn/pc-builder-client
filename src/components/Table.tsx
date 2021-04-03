import React, { useState } from 'react';
import { Table as BootstrapTable } from 'reactstrap';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import { FormatUtils, BuildUtils } from 'utils';
import * as Images from './Images';
import { Component, ComponentTypes } from 'types';
import { Buttons, Hidden, Inputs, Loader } from 'components';
import { BuildState, SelectedRetailersState } from 'states';
import { Colors } from 'styles';

type HeaderObjectProps = {
  type: string;
  label?: string;
  attribute?: string;
  hideUnder?: number;
  renderSelectLabel?(value: string | number): string;
};

type TableProps = {
  data: any;
  headers: HeaderObjectProps[];
  renderRow(item: any, idx: number): JSX.Element;
};

type Filters = {
  [x: string]: string[];
};

export const Table: React.FC<TableProps> = ({
  data,
  headers,
  renderRow,
  ...rest
}) => {
  const [filters, setFilters] = useState<Filters>({});
  const [search, setSearch] = useState('');
  const selectedRetailersState = SelectedRetailersState.useState();
  const selectedRetailers = selectedRetailersState.get();

  const renderHeader = (header: HeaderObjectProps) => {
    const { type, label, attribute, hideUnder, renderSelectLabel } = header;
    let parsed;
    if (type === 'image') {
      parsed = <Header thin />;
    } else if (type === 'basic') {
      parsed = <Header label={label} center />;
    } else if (type === 'name') {
      parsed = (
        <SelectHeader
          label="Framleiðandi"
          options={data?.vendor.map((value: string) => ({
            label: renderSelectLabel?.(value) ?? value,
            value: value,
          }))}
          onChange={(options) => {
            setFilters({
              ...filters,
              vendor: options,
            });
          }}
        >
          <Inputs.TextInput
            placeholder="Leit..."
            onChange={(value) => setSearch(value)}
          />
        </SelectHeader>
      );
    } else if (type === 'price') {
      parsed = (
        <>
          <SelectHeader
            label="Verslanir"
            options={data?.retailer.map((value: string) => ({
              label: renderSelectLabel?.(value) ?? value,
              value: value,
            }))}
            defaultSelected={selectedRetailers}
            onChange={(options) => {
              selectedRetailersState.set(options);
            }}
          />
          <Header thin />
        </>
      );
    } else if (type === 'select') {
      parsed = (
        <SelectHeader
          label={label ?? ''}
          options={data?.[attribute ?? ''].map((value: string) => ({
            label: renderSelectLabel?.(value) ?? value,
            value: value,
          }))}
          onChange={(options) => {
            setFilters({
              ...filters,
              [attribute ?? '']: options,
            });
          }}
        />
      );
    }
    if (hideUnder) {
      parsed = <Hidden.HideUnder width={hideUnder}>{parsed}</Hidden.HideUnder>;
    }
    return parsed;
  };
  let filteredItems = data?.items;
  if (filteredItems) {
    // Filter by name for searched string
    if (search.length) {
      const searchSplit = search.toLowerCase().split(' ');
      filteredItems = filteredItems.filter((item: Component) =>
        searchSplit.every((word) => item.name.toLowerCase().includes(word)),
      );
    }
    if (selectedRetailers.length) {
      filteredItems = filteredItems
        .map((item: Component) => ({
          ...item,
          offerings: item.offerings.filter((offering) =>
            selectedRetailers.includes(offering.retailerName),
          ),
        }))
        .filter((item: Component) => item.offerings.length > 0);
    }
    // Filter by chosen attributes
    for (const attribute in filters) {
      filteredItems = filteredItems.filter(
        (item: Component) =>
          !filters[attribute].length ||
          filters[attribute].includes(item[attribute]),
      );
    }
  }

  return !data ? (
    <Loader />
  ) : (
    <BootstrapTable striped {...rest}>
      <>
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <React.Fragment key={idx}>{renderHeader(header)}</React.Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item: Component, idx: number) =>
            renderRow(item, idx),
          )}
        </tbody>
      </>
    </BootstrapTable>
  );
};

export const Row = styled.tr``;

type ColumnProps = {
  thin?: boolean;
  center?: boolean;
  right?: boolean;
};

export const Column = styled('td')<ColumnProps>`
  vertical-align: middle !important;
  ${({ thin }) => `${thin ? 'width: 1%;' : ''}`}
  ${({ right }) => `${right ? 'text-align: right' : ''}`}
  ${({ center }) => `${center ? 'text-align: center' : ''}`}
`;

type ImageColumnProps = {
  src: string;
};

export const ImageColumn: React.FC<ImageColumnProps> = ({ src }) => (
  <Column thin center>
    <Images.Thumbnail src={src} />
  </Column>
);

type NameColumnProps = {
  item: Component;
};

export const NameColumn: React.FC<NameColumnProps> = ({ item }) => (
  <Column>{item.name}</Column>
);

type PriceColumnProps = {
  item: Component;
  componentType: ComponentTypes;
};

const WebsiteLink = styled.a`
  color: ${Colors.Black};
  text-decoration: underline;
`;

const PriceRange = styled.div`
  font-size: 0.8rem;
  color: ${Colors.GreyDarker};
`;

export const PriceColumn: React.FC<PriceColumnProps> = ({
  item,
  componentType,
}) => {
  const build = BuildState.useState().get();
  const history = useHistory();

  const component = build[componentType];
  const selected = component?.id === item.id;
  const { offerings } = item;

  return (
    <>
      <Column right>
        <WebsiteLink href={offerings[0].url} target="__blank">
          {`${offerings[0].retailerName} - ${FormatUtils.formatCurrency(
            offerings[0].price,
          )}`}
        </WebsiteLink>
        {offerings.length > 1 && (
          <PriceRange>
            {`Verðbil: ${FormatUtils.thousandSeparator(
              item.minPrice,
            )} - ${FormatUtils.formatCurrency(
              offerings[offerings.length - 1].price,
            )}`}
          </PriceRange>
        )}
      </Column>
      <Column thin>
        {selected ? (
          <Buttons.CheckButton color="secondary" />
        ) : (
          <Buttons.CartButton
            onClick={() =>
              BuildUtils.updateState(
                {
                  [componentType]: { ...item, selectedOffering: offerings[0] },
                },
                history,
              )
            }
            offerings={offerings}
          />
        )}
      </Column>
    </>
  );
};

type Option = {
  label: string;
  value: string;
};

type HeaderProps = ColumnProps & {
  label?: string;
};

const StyledHeader = styled('th')<HeaderProps>`
  border-top: none !important;
  ${({ thin }) => `${thin ? 'width: 1%;' : ''}`}
  ${({ right }) => `${right ? 'text-align: right' : ''}`}
  ${({ center }) => `${center ? 'text-align: center' : ''}`}
`;

export const Header: React.FC<HeaderProps> = ({ label, ...rest }) => (
  <StyledHeader {...rest}>{label}</StyledHeader>
);

const SelectContainer = styled.div`
  display: flex;
  > div {
    flex-grow: 1;
    min-width: 50%;
  }
`;

type SelectHeaderProps = {
  label: string;
  options: Option[];
  defaultSelected?: string[];
  onChange(options: any): void;
};

const SelectHeader: React.FC<SelectHeaderProps> = ({
  label,
  options,
  defaultSelected,
  onChange,
  children,
}) => (
  <StyledHeader>
    <SelectContainer>
      <Hidden.HideUnder width={640}>
        <Inputs.Select
          options={options}
          defaultSelected={defaultSelected}
          onChange={(selectedOptions: string[]) => onChange(selectedOptions)}
          placeholder={label}
        />
      </Hidden.HideUnder>
      {children}
    </SelectContainer>
  </StyledHeader>
);
