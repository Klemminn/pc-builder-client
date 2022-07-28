import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams } from 'react-router-dom';

import { BuildState } from 'states';
import { Buttons, Images, Page } from 'components';
import { BuildUtils, FormatUtils, StorageUtils } from 'utils';
import { Colors } from 'styles';
import { BuildService } from 'services';

const ComponentContainer = styled.div`
  margin-bottom: 1rem;
  a {
    margin-right: 1rem;
  }
`;

const ComponentInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
`;

const ComponentName = styled.div`
  margin-left: 0.5rem;
  font-size: 1.3rem;
  font-weight: bold;
`;

const ComponentPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  text-align: right;
`;

const AvailabilityNotification = styled.div`
  text-align: right;
  font-size: 1rem;
`;

const ComponentNameImageContainer = styled.a`
  display: flex;
  align-items: center;
  color: ${Colors.Black};
  text-decoration: underline;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPrice = styled.div`
  font-size: 1.3rem;
  text-decoration: underline;
  font-weight: bold;
`;

type HomeRouteParams = {
  buildId: string;
};

const HomePage: React.FC = () => {
  const buildState: any = BuildState.useState();
  const stateBuild: any = buildState.get();
  const { buildId: routeBuildId }: HomeRouteParams = useParams();
  const history = useHistory();

  useEffect(() => {
    const init = async () => {
      // We have the build in state, so we don't have to get from storage or server
      if (stateBuild.buildId) {
        return;
      }
      let currentBuild;
      if (routeBuildId) {
        currentBuild = await BuildService.getBuild(routeBuildId);
      } else {
        const storageBuildId: string = await StorageUtils.getItem('buildId');
        if (storageBuildId) {
          currentBuild = await BuildService.getBuild(storageBuildId);
        }
      }
      if (currentBuild?.buildId) {
        history.push(`/build/${currentBuild?.buildId}/compact`);
      }
      buildState.set({ ...BuildState.defaultBuild, ...currentBuild });
    };
    init();
    // eslint-disable-next-line
  }, []);

  const totalPrice = Object.keys(stateBuild).reduce((accumulator, key) => {
    const component = stateBuild[key];
    return accumulator + (component?.selectedOffering?.price ?? 0);
  }, 0);

  const Component: React.FC<{ componentKey: string }> = ({ componentKey }) => {
    if (componentKey === 'buildId') return null;
    const component = stateBuild[componentKey];
    const Button = component ? Buttons.EditButton : Buttons.AddButton;
    const isCheapest =
      component?.selectedOffering?.price === component?.minPrice;
    return (
      <ComponentContainer>
        {component && (
          <ComponentInfoContainer>
            <ComponentNameImageContainer
              href={component?.selectedOffering?.url}
              target="__blank"
            >
              <Images.Thumbnail size={4} src={component.image} />
              <ComponentName>{component.name}</ComponentName>
            </ComponentNameImageContainer>
            <ComponentPrice>
              {component.offerings.length > 1 ? (
                <Buttons.OfferingsButton
                  offerings={component.offerings}
                  onSelect={(offering) => {
                    BuildUtils.updateState(
                      {
                        [componentKey]: {
                          ...component,
                          selectedOffering: offering,
                        },
                      },
                      history,
                    );
                  }}
                >
                  {`${
                    component?.selectedOffering.retailerName
                  } - ${FormatUtils.formatCurrency(
                    component.selectedOffering.price,
                  )}`}
                </Buttons.OfferingsButton>
              ) : (
                `${
                  component.selectedOffering.retailerName
                } - ${FormatUtils.formatCurrency(
                  component.selectedOffering.price,
                )}`
              )}
              {!isCheapest && (
                <AvailabilityNotification>Til ódýrara</AvailabilityNotification>
              )}
              {component.selectedOffering.disabled && (
                <AvailabilityNotification>
                  Ekki lengur í boði hjá söluaðila
                </AvailabilityNotification>
              )}
            </ComponentPrice>
          </ComponentInfoContainer>
        )}
      </ComponentContainer>
    );
  };

  return (
    <Page title="Íhlutir">
      <TopContainer>
        <TotalPrice>
          Samtals: {FormatUtils.formatCurrency(totalPrice)}
        </TotalPrice>
      </TopContainer>
      {Object.keys(stateBuild).map((componentKey: string) => (
        <Component key={componentKey} componentKey={componentKey} />
      ))}
    </Page>
  );
};

export default HomePage;
