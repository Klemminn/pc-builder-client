import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';

import { BuildState } from 'states';
import { Buttons, Page } from 'components';
import { FormatUtils, StorageUtils } from 'utils';
import { Colors } from 'styles';
import { Offering } from 'types';

const ComponentContainer = styled.div`
  margin-bottom: 1rem;
  a {
    margin-right: 1rem;
  }
`;

const ComponentTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
`;

const InfoContainer = styled.div`
  display: flex;
  border: 1px solid ${Colors.GreyDark};
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  margin-top: 0.5rem;
  padding: 1rem;
`;

const ComponentName = styled.div`
  margin-left: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ComponentPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const PriceNotification = styled.div`
  text-align: right;
  font-size: 1rem;
`;

const ComponentThumbnail = styled.img`
  height: 4rem;
`;

const ComponentNameImageContainer = styled.a`
  display: flex;
  align-items: center;
  color: ${Colors.Black};
  text-decoration: underline;
`;

const TotalPrice = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.3rem;
  text-decoration: underline;
  font-weight: bold;
`;

const ComponentNames: { [x: string]: string } = {
  cpu: 'Örgjörvi',
  cpuCooler: 'Kæling',
  memory: 'Vinnsluminni',
  gpu: 'Skjákort',
  ssd: 'SSD',
  hdd: 'HDD',
  case: 'Kassi',
  psu: 'Aflgjafi',
};

type HomeRouteParams = {
  buildId: string;
};

const HomePage: React.FC = () => {
  const buildState: any = BuildState.useState();
  const build: any = buildState.get();
  const { buildId }: HomeRouteParams = useParams();

  useEffect(() => {
    if (buildId) {
      // TODO get from server
      console.log(buildId);
    } else {
      setBuildFromStorage();
    }
    // eslint-disable-next-line
  }, [buildId]);

  const setBuildFromStorage = async () => {
    const storageBuild = await StorageUtils.getItem('build');
    if (storageBuild) {
      buildState.set(storageBuild);
    }
  };

  const totalPrice = Object.keys(build).reduce((accumulator, key) => {
    const component = build[key];
    return (
      accumulator +
      (component?.offerings?.find((o: Offering) => o.id === component.offering)
        .price || 0)
    );
  }, 0);

  const renderComponent = (key: string) => {
    if (key === 'id') return null;
    const component = build[key];
    const Button = component ? Buttons.EditButton : Buttons.AddButton;
    let selectedOffering;
    if (component) {
      selectedOffering = component?.offerings.find(
        (o: Offering) => o.id === component.offering,
      );
      if (!selectedOffering) {
        selectedOffering = component.offerings[0];
      }
    }
    const isCheapest = selectedOffering?.price === component?.minPrice;
    return (
      <ComponentContainer key={key}>
        <ComponentTitle key={key}>
          <Button to={`/${key}`} />
          {ComponentNames[key]}
        </ComponentTitle>
        {component && (
          <InfoContainer>
            <ComponentNameImageContainer
              href={selectedOffering.url}
              target="__blank"
            >
              <ComponentThumbnail
                src={FormatUtils.getSmallImageUrl(component.image)}
              />
              <ComponentName>{component.name}</ComponentName>
            </ComponentNameImageContainer>
            <ComponentPrice>
              {component.offerings.length > 1 ? (
                <Buttons.OfferingsButton
                  offerings={component.offerings}
                  onSelect={(offering) => {
                    buildState.set({
                      [key]: {
                        ...component,
                        offering: offering.id,
                      },
                    });
                  }}
                >
                  {`${
                    selectedOffering.retailerName
                  } - ${FormatUtils.formatCurrency(selectedOffering.price)}`}
                </Buttons.OfferingsButton>
              ) : (
                `${
                  selectedOffering.retailerName
                } - ${FormatUtils.formatCurrency(selectedOffering.price)}`
              )}
              {!isCheapest && (
                <PriceNotification>Til ódýrara</PriceNotification>
              )}
            </ComponentPrice>
          </InfoContainer>
        )}
      </ComponentContainer>
    );
  };

  return (
    <Page title="Veldu íhluti">
      <TotalPrice>Samtals: {FormatUtils.formatCurrency(totalPrice)}</TotalPrice>
      {Object.keys(build).map((key: string) => renderComponent(key))}
    </Page>
  );
};

export default HomePage;
