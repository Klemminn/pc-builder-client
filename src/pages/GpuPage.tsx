import React, { useState, useEffect } from 'react';

import { Page, Table } from 'components';
import { OfferingsService } from 'services';
import { GpuContainer } from 'types';

const GpuPage: React.FC = () => {
  const [data, setData] = useState<GpuContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: GpuContainer = await OfferingsService.getGpu();
    setData(response);
  };

  return (
    <Page title="Veldu skjákort">
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
            attribute: 'type',
            label: 'Tegund',
          },
          {
            type: 'price',
          },
        ]}
        renderRow={(item, idx) => (
          <Table.Row key={idx}>
            <Table.ImageColumn src={item.image} />
            <Table.NameColumn item={item} />
            <Table.Column center>{item.type}</Table.Column>
            <Table.PriceColumn item={item} componentType="gpu" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default GpuPage;
