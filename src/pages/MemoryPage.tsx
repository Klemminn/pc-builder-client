import React, { useState, useEffect } from 'react';

import { Hidden, Page, Table } from 'components';
import { OfferingsService } from 'services';
import { MemoryContainer } from 'types';

const MemoryPage: React.FC = () => {
  const [data, setData] = useState<MemoryContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: MemoryContainer = await OfferingsService.getMemory();
    setData(response);
  };

  return (
    <Page title="Veldu vinnsluminni">
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
            type: 'select',
            attribute: 'size',
            renderSelectLabel: (value) => `${value}GB`,
            label: 'Stærð',
          },
          {
            type: 'select',
            attribute: 'frequency',
            renderSelectLabel: (value) => `${value}MHz`,
            label: 'Tíðni',
          },
          {
            type: 'basic',
            label: 'CAS',
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
            <Table.Column center>{item.type}</Table.Column>
            <Table.Column center>{`${item.size}GB (${item.modules}x${
              item.size / item.modules
            }GB)`}</Table.Column>
            <Table.Column center>{item.frequency}MHz</Table.Column>
            <Hidden.HideUnder width={750}>
              <Table.Column center>{item.cas}</Table.Column>
            </Hidden.HideUnder>
            <Table.PriceColumn item={item} componentType="memory" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default MemoryPage;
