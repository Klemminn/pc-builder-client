import React, { useState, useEffect } from 'react';

import { Hidden, Page, Table } from 'components';
import { OfferingsService } from 'services';
import { PsuContainer } from 'types';

const PsuPage: React.FC = () => {
  const [data, setData] = useState<PsuContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: PsuContainer = await OfferingsService.getPsu();
    setData(response);
  };

  return (
    <Page title="Veldu aflgjafa">
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
            attribute: 'rating',
            label: 'Nýtnistaðall',
          },
          {
            type: 'select',
            attribute: 'watts',
            renderSelectLabel: (value) => `${value}W`,
            label: 'Afl',
          },
          {
            type: 'select',
            attribute: 'psuFormFactor',
            label: 'Stærð aflgjafa',
            hideUnder: 750,
          },
          {
            type: 'basic',
            label: 'PCI-E tengi',
            hideUnder: 750,
          },
          {
            type: 'price',
          },
        ]}
        renderRow={(item, idx) => (
          <Table.Row key={idx}>
            <Table.ImageColumn src={item.image} />
            <Table.NameColumn item={item} />
            <Table.Column center>{item.rating}</Table.Column>
            <Table.Column center>{item.watts}W</Table.Column>
            <Hidden.HideUnder width={750}>
              <Table.Column center>{item.psuFormFactor}</Table.Column>
              <Table.Column center>{`${item.pcieEightPin}x 8-pin ${
                !item.pcieSixPin ? '' : `/ ${item.pcieSixPin}x 6-pin`
              }`}</Table.Column>
            </Hidden.HideUnder>
            <Table.PriceColumn item={item} componentType="psu" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default PsuPage;
