import React from 'react';
import { Table as BootstrapTable } from 'reactstrap';

type TableProps = {
  headers: JSX.Element[];
  rows: JSX.Element[];
};

export const Table: React.FC<TableProps> = ({ headers, rows, ...rest }) => (
  <BootstrapTable {...rest}>
    <thead>{headers}</thead>
    <tbody></tbody>
  </BootstrapTable>
);
