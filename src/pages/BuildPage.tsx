import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import { BuildState } from 'states';
import { Buttons, Page } from 'components';
import { BuildUtils, FormatUtils, StorageUtils } from 'utils';
import { BuildService } from 'services';
import { FaRedo, FaCheck } from 'react-icons/fa';
import { Component } from 'components/Component';
import { Button, Table } from 'reactstrap';

const ClearButton = styled(Buttons.Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  svg {
    margin-right: 0.5rem;
  }
`;

type HomeRouteParams = {
  buildId: string;
};

const BuildPage: React.FC = () => {
  const buildState: any = BuildState.useState();
  const stateBuild: any = buildState.get();
  const { buildId: routeBuildId }: HomeRouteParams = useParams();
  const history = useHistory();
  const location = useLocation();
  const isCompact = location.pathname.endsWith('/compact');

  const [copied, setCopied] = useState(false);

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
        history.push(
          `/build/${currentBuild?.buildId}${isCompact ? '/compact' : ''}`,
        );
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

  if (isCompact)
    return (
      <Page title={`${isCompact ? 'Íhlutir' : 'Veldu íhluti'}`}>
        <Table hover>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th>Samtals: {FormatUtils.formatCurrency(totalPrice)}</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stateBuild).map((componentKey: string) => (
              <Component
                key={componentKey}
                component={stateBuild[componentKey]}
                componentKey={componentKey}
              />
            ))}
          </tbody>
        </Table>
      </Page>
    );

  return (
    <Page title={`${isCompact ? 'Íhlutir' : 'Veldu íhluti'}`}>
      <TopContainer>
        {!isCompact && (
          <ClearButton onClick={() => BuildUtils.clearState(history)}>
            <FaRedo />
            Byrja upp á nýtt
          </ClearButton>
        )}

        <TotalPrice>
          Samtals: {FormatUtils.formatCurrency(totalPrice)}
        </TotalPrice>
      </TopContainer>
      {Object.keys(stateBuild).map((componentKey: string) => (
        <Component
          key={componentKey}
          component={stateBuild[componentKey]}
          componentKey={componentKey}
        />
      ))}
      <BBCode>
        <Button
          variant={copied ? 'success' : 'outline-secondary'}
          onClick={() => {
            setCopied(true);
            navigator.clipboard.writeText(
              `[builder]${window.location.href}[/builder]`,
            );
          }}
        >
          Afrita spjallkóða (BBCode) {copied && <FaCheck />}
        </Button>
      </BBCode>
    </Page>
  );
};

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalPrice = styled.div`
  font-size: 1.3rem;
  text-decoration: underline;
  font-weight: bold;
`;

const BBCode = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default BuildPage;
