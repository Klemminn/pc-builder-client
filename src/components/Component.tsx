import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { ComponentNames } from 'constants/ComponentNames';
import styled from '@emotion/styled';
import { Buttons, Images } from 'components';
import { FaTimes } from 'react-icons/fa';
import { BuildUtils, FormatUtils } from 'utils';
import { Colors } from 'styles';

export const Component: React.FC<{ componentKey: string; component: any }> = ({
  componentKey,
  component,
}) => {
  const history = useHistory();
  const location = useLocation();
  if (componentKey === 'buildId') return null;

  const isCompact = location.pathname.endsWith('/compact');
  const Button = component ? Buttons.EditButton : Buttons.AddButton;
  const isCheapest = component?.selectedOffering?.price === component?.minPrice;

  if (isCompact && !component) return null;

  if (isCompact)
    return (
      <tr>
        <th scope="row">{ComponentNames[componentKey]}</th>
        <td>{component && component.name}</td>
        <td>{component && component.selectedOffering.retailerName}</td>
        <td>
          {component &&
            FormatUtils.formatCurrency(component.selectedOffering.price)}
        </td>
      </tr>
    );

  return (
    <ComponentContainer>
      {!isCompact && (
        <ComponentTitle>
          <Button to={`/${componentKey}`} />
          {ComponentNames[componentKey]}
          {component && (
            <RemoveIcon
              onClick={() =>
                BuildUtils.updateState(
                  {
                    [componentKey]: null,
                  },
                  history,
                )
              }
            />
          )}
        </ComponentTitle>
      )}
      {component && (
        <ComponentInfoContainer isCompact={isCompact}>
          <ComponentNameImageContainer
            href={component?.selectedOffering?.url}
            target="__blank"
          >
            <Images.Thumbnail size={4} src={component.image} />
            <ComponentName>{component.name}</ComponentName>
          </ComponentNameImageContainer>
          {component.offerings && (
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
          )}
        </ComponentInfoContainer>
      )}
    </ComponentContainer>
  );
};

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

const ComponentInfoContainer = styled.div<{ isCompact: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
  ${({ isCompact }) =>
    isCompact
      ? ''
      : `
  border: 1px solid ${Colors.GreyDark};
  border-radius: 1rem;
  margin-left: 3.5em;
  padding: 1rem;
  `}
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

const RemoveIcon = styled(FaTimes)`
  width: 2rem;
  color: #929292;
  font-size: 1.5rem;
  cursor: pointer;
`;
