import React, { useState, useEffect } from 'react';

import { Page, Table } from 'components';
import { OfferingsService } from 'services';
import { HddContainer } from 'types';
import { FormatUtils } from 'utils';

const HddPage: React.FC = () => {
  const [data, setData] = useState<HddContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: HddContainer = await OfferingsService.getHdd();
    setData(response);
  };

  return (
    <Page title="Veldu harðan disk">
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
            attribute: 'format',
            label: 'Tegund',
          },
          {
            type: 'select',
            attribute: 'capacity',
            renderSelectLabel: (value) => FormatUtils.formatCapacity(value),
            label: 'Stærð',
          },
          {
            type: 'price',
          },
        ]}
        renderRow={(item, idx) => (
          <Table.Row key={idx}>
            <Table.ImageColumn src={item.image} />
            <Table.NameColumn item={item} />
            <Table.Column center>{item.format}</Table.Column>
            <Table.Column center>
              {FormatUtils.formatCapacity(item.capacity)}
            </Table.Column>
            <Table.PriceColumn item={item} componentType="hdd" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default HddPage;
