import React, { useState, useEffect } from 'react';

import { Page, Table } from 'components';
import { OfferingsService } from 'services';
import { CpuCoolerContainer } from 'types';

const CpuCoolerPage: React.FC = () => {
  const [data, setData] = useState<CpuCoolerContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: CpuCoolerContainer = await OfferingsService.getCpuCoolers();
    setData(response);
  };

  return (
    <Page title="Veldu örgjörvakælingu">
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
            attribute: 'fanSize',
            renderSelectLabel: (value) => `${value}mm`,
            label: 'Viftustærð',
          },
          {
            type: 'price',
          },
        ]}
        renderRow={(item, idx) => (
          <Table.Row key={idx}>
            <Table.ImageColumn src={item.image} />
            <Table.NameColumn item={item} />
            <Table.Column
              center
            >{`${item.fans}x ${item.fanSize}mm`}</Table.Column>
            <Table.PriceColumn item={item} componentType="cpuCooler" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default CpuCoolerPage;
