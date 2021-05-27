import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa';

import { Hidden, Page, Table } from 'components';
import { OfferingsService } from 'services';
import { MonitorContainer } from 'types';

const MonitorPage: React.FC = () => {
  const [data, setData] = useState<MonitorContainer>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await OfferingsService.getMonitor();
    setData(response);
  };

  return (
    <Page title="Veldu skjá">
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
            attribute: 'size',
            renderSelectLabel: (value) => `${value}"`,
            label: 'Stærð',
          },
          {
            type: 'select',
            attribute: 'resolution',
            label: 'Upplausn',
          },
          {
            type: 'select',
            attribute: 'panel',
            label: 'Panel',
            hideUnder: 750,
          },
          {
            type: 'select',
            attribute: 'refreshRate',
            renderSelectLabel: (value) => `${value}Hz`,
            label: 'Tíðni',
            hideUnder: 750,
          },
          {
            type: 'select',
            attribute: 'gsync',
            label: 'G-Sync',
            hideUnder: 750,
          },
          {
            type: 'select',
            attribute: 'freesync',
            label: 'FreeSync',
            hideUnder: 750,
          },
          {
            type: 'basic',
            label: 'Curved',
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
            <Table.Column center>{item.size}"</Table.Column>
            <Table.Column center>{item.resolution}</Table.Column>
            <Hidden.HideUnder>
              <Table.Column center>{item.panel}</Table.Column>
              <Table.Column center>{item.refreshRate}Hz</Table.Column>
              <Table.Column center>{item.gsync}</Table.Column>
              <Table.Column center>{item.freesync}</Table.Column>
              <Table.Column center>{item.curved && <FaCheck />}</Table.Column>
            </Hidden.HideUnder>
            <Table.PriceColumn item={item} componentType="monitor" />
          </Table.Row>
        )}
      />
    </Page>
  );
};

export default MonitorPage;
