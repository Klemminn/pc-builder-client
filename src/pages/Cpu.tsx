import React, { useState, useEffect } from 'react';

import { Hidden, Page, Table } from 'components';
import { OfferingsService } from 'services';
import { FormatUtils } from 'utils';
import { CpuContainer } from 'types';

const Home: React.FC = () => {
  const [data, setData] = useState<CpuContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response: CpuContainer = await OfferingsService.getCpus();
    setData(response);
  };

  return (
    <Page title="Veldu örgjörva">
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
            label: 'Sökkull',
          },
          {
            type: 'basic',
            label: 'Tíðni/Boost',
          },
          {
            type: 'basic',
            label: 'Kjarnar/Þræðir',
            hideUnder: 750,
          },
          {
            type: 'basic',
            label: 'TDP',
            hideUnder: 750,
          },
          {
            type: 'basic',
            label: 'Skjástýring',
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
            <Table.Column center>{item.cpuSocket}</Table.Column>
            <Table.Column center>
              {FormatUtils.formatFrequency(item.coreClock)}
              {item.boostClock &&
                ` / ${FormatUtils.formatFrequency(item.boostClock)}`}
            </Table.Column>
            <Hidden.HideUnder width={750}>
              <Table.Column center>
                {item.cores}/{item.threads}
              </Table.Column>
              <Table.Column center>{item.tdp}W</Table.Column>
              <Table.Column>{item.graphics}</Table.Column>
            </Hidden.HideUnder>
            <Table.PriceColumn offerings={item.offerings} />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default Home;
