import React, { useState, useEffect } from 'react';

import { Page, Table } from 'components';
import { OfferingsService } from 'services';
import { CaseContainer } from 'types';

const CasePage: React.FC = () => {
  const [data, setData] = useState<CaseContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: CaseContainer = await OfferingsService.getCase();
    setData(response);
  };

  return (
    <Page title="Veldu kassa">
      <Table.Table
        data={data}
        headers={[
          {
            type: 'image',
          },
          {
            type: 'name',
          },
          {
            type: 'select',
            attribute: 'motherboardFormFactor',
            label: 'Stærð móðurborðs',
          },
          {
            type: 'select',
            attribute: 'psuFormFactor',
            label: 'Stærð aflgjafa',
          },
          {
            type: 'price',
          },
        ]}
        renderRow={(item, idx) => (
          <Table.Row key={idx}>
            <Table.ImageColumn src={item.image} />
            <Table.NameColumn item={item} />
            <Table.Column center>{item.motherboardFormFactor}</Table.Column>
            <Table.Column center>{item.psuFormFactor}</Table.Column>
            <Table.PriceColumn item={item} componentType="case" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default CasePage;
