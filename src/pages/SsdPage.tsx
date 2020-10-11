import React, { useState, useEffect } from 'react';

import { Page, Table } from 'components';
import { OfferingsService } from 'services';
import { SsdContainer } from 'types';
import { FormatUtils } from 'utils';

const SsdPage: React.FC = () => {
  const [data, setData] = useState<SsdContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: SsdContainer = await OfferingsService.getSsd();
    setData(response);
  };

  return (
    <Page title="Veldu SSD">
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
            attribute: 'capacity',
            renderSelectLabel: (value) => FormatUtils.formatCapacity(value),
            label: 'Stærð',
          },
          {
            type: 'basic',
            label: 'Hraði',
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
            <Table.Column center>
              {FormatUtils.formatCapacity(item.capacity)}
            </Table.Column>
            <Table.Column
              center
            >{`${item.readSpeed}MB/s / ${item.writeSpeed}MB/s`}</Table.Column>
            <Table.PriceColumn item={item} componentType="ssd" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default SsdPage;
