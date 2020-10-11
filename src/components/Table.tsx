import React, { useState } from 'react';
import { Table as BootstrapTable } from 'reactstrap';
import styled from '@emotion/styled';
import Select from '@khanacademy/react-multi-select';

import { FormatUtils } from 'utils';
import * as Images from './Images';
import { Component, ComponentTypes } from 'types';
import { Buttons, Hidden } from 'components';
import { BuildState } from 'states';

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

  const renderHeader = (header: HeaderObjectProps) => {
    const { type, label, attribute, hideUnder, renderSelectLabel } = header;
    let parsed;
    if (type === 'image') {
      parsed = <Header thin />;
    } else if (type === 'basic') {
      parsed = <Header label={label} center />;
    } else if (type === 'name') {
      parsed = <Header label="Nafn" />;
    } else if (type === 'price') {
      parsed = (
        <>
          <Header label="Lægsta verð" right />
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
    for (const attribute in filters) {
      filteredItems = filteredItems.filter(
        (item: Component) =>
          !filters[attribute].length ||
          filters[attribute].includes(item[attribute]),
      );
    }
  }

  return (
    <BootstrapTable striped {...rest}>
      {!data ? null : (
        <>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <React.Fragment key={idx}>
                  {renderHeader(header)}
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item: Component, idx: number) =>
              renderRow(item, idx),
            )}
          </tbody>
        </>
      )}
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
    <Images.Thumbnail src={FormatUtils.getSmallImageUrl(src)} />
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

export const PriceColumn: React.FC<PriceColumnProps> = ({
  item,
  componentType,
}) => {
  const build = BuildState.useState().get();
  const component = build[componentType];
  const selected = Array.isArray(component)
    ? component.findIndex((c) => c.id === item.id)
    : component?.id === item.id;
  const { offerings } = item;

  return (
    <>
      <Column right>{`${
        offerings[0].retailerName
      } - ${FormatUtils.formatCurrency(offerings[0].price)}`}</Column>
      <Column thin>
        {selected ? (
          <Buttons.CheckButton color="secondary" />
        ) : (
          <Buttons.OfferingsButton
            onSelect={(offering) =>
              BuildState.accessState().set({
                [componentType]: { ...item, offering: offering.id },
              })
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

type SelectHeaderProps = {
  label: string;
  options: Option[];
  onChange(options: any): void;
};

const SelectHeader: React.FC<SelectHeaderProps> = ({
  label,
  options,
  onChange,
}) => {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <StyledHeader>
      <Select
        options={options}
        selected={selected}
        onSelectedChanged={(selectedOptions: string[]) => {
          setSelected(selectedOptions);
          onChange(selectedOptions);
        }}
        disableSearch
        hasSelectAll={false}
        overrideStrings={{
          selectSomeItems: label,
          allItemsAreSelected: 'Allt valið',
        }}
      />
    </StyledHeader>
  );
};
