import React, { useState, useEffect } from 'react';

import { Page, Table } from 'components';
import { OfferingsService } from 'services';
import { MotherboardContainer } from 'types';

const MotherboardPage: React.FC = () => {
  const [data, setData] = useState<MotherboardContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: MotherboardContainer = await OfferingsService.getMotherboard();
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
            attribute: 'cpuSocket',
            label: 'Sökull',
          },
          {
            type: 'select',
            attribute: 'chipset',
            label: 'Kubbasett',
          },
          {
            type: 'select',
            attribute: 'motherboardFormFactor',
            label: 'Staðall',
          },
          {
            type: 'basic',
            label: 'Minnisraufar',
          },
          {
            type: 'basic',
            label: 'm.2 raufar',
          },
          {
            type: 'price',
          },
        ]}
        renderRow={(item, idx) => (
          <Table.Row key={idx}>
            <Table.ImageColumn src={item.image} />
            <Table.NameColumn item={item} />
            <Table.Column center>{item.cpuSocket}</Table.Column>
            <Table.Column center>{item.chipset}</Table.Column>
            <Table.Column center>{item.motherboardFormFactor}</Table.Column>
            <Table.Column center>{`${item.ramSlots}`}</Table.Column>
            <Table.Column center>{`${item.m2Slots}`}</Table.Column>
            <Table.PriceColumn item={item} componentType="motherboard" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default MotherboardPage;
