import React from 'react';
import ReactSidebar from 'react-sidebar';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaMemory, FaBox, FaHammer } from 'react-icons/fa';
import { FiCpu, FiHardDrive, FiMonitor } from 'react-icons/fi';
import { CgDrive, CgScreenMirror } from 'react-icons/cg';
import { ImPower } from 'react-icons/im';
import { GiCircuitry, GiComputerFan } from 'react-icons/gi';

import { Link } from 'components';
import { Colors } from 'styles';
import { BuildState } from 'states';

import VaktinLogo from 'assets/vaktinlogo.png';

const LogoContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: center;
  height: 5rem;
  background-color: ${Colors.Black};
`;

const Logo = styled.img`
  height: 3rem;
  text-align: center;
`;

const StyledItem = styled('div')<{ active: boolean }>`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  padding: 0.6rem;
  color: ${Colors.GreyLight};
  ${({ active }) => (active ? `background-color: ${Colors.OrangeDark};` : '')}
`;

const SidebarText = styled.div`
  margin-left: 1rem;
  text-transform: uppercase;
  font-weight: 400;
`;

const Separator = styled.div`
  height: 2px;
  width: 100%;
  background-color: ${Colors.GreyLight};
`;

type SidebarItemProps = {
  active: boolean;
  icon: JSX.Element;
  text: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  active,
  icon,
  text,
  ...rest
}) => (
  <StyledItem active={active} {...rest}>
    {icon}
    <SidebarText>{text}</SidebarText>
  </StyledItem>
);

type SidebarProps = {
  open: boolean;
  toggleSidebar(): void;
};

const components = [
  {
    icon: <FaHammer />,
    text: 'Tölvan',
    to: null,
  },
  {
    icon: <FiCpu />,
    text: 'Örgjörvar',
    to: '/cpu',
  },
  {
    icon: <GiComputerFan />,
    text: 'Kælingar',
    to: '/cpuCooler',
  },
  {
    icon: <GiCircuitry />,
    text: 'Móðurborð',
    to: '/motherboard',
  },
  {
    icon: <FaMemory />,
    text: 'Minni',
    to: '/memory',
  },
  {
    icon: <CgScreenMirror />,
    text: 'Skjákort',
    to: '/gpu',
  },
  {
    icon: <CgDrive />,
    text: 'SSD',
    to: '/ssd',
  },
  {
    icon: <FiHardDrive />,
    text: 'HDD',
    to: '/hdd',
  },
  {
    icon: <FaBox />,
    text: 'Kassar',
    to: '/case',
  },
  {
    icon: <ImPower />,
    text: 'Aflgjafar',
    to: '/psu',
  },
  {
    icon: <FiMonitor />,
    text: 'Skjáir',
    to: '/monitor',
  },
];

const Sidebar: React.FC<SidebarProps> = ({ children, open, toggleSidebar }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const location = useLocation();
  const buildState = BuildState.useState().get();

  return (
    <ReactSidebar
      sidebar={
        <>
          <LogoContainer>
            <Logo src={VaktinLogo} />
          </LogoContainer>
          {components.map(({ to, ...component }, idx) => (
            <React.Fragment key={idx}>
              <Link
                to={to ?? `/build/${buildState.buildId ?? ''}`}
                onClick={toggleSidebar}
              >
                <SidebarItem
                  active={
                    (!to && location.pathname.includes('build')) ||
                    to === location.pathname
                  }
                  {...component}
                />
              </Link>
              {!idx && <Separator />}
            </React.Fragment>
          ))}
        </>
      }
      open={open}
      onSetOpen={toggleSidebar}
      docked={!isMobile}
      styles={{
        sidebar: {
          backgroundColor: Colors.Orange,
          width: '300px',
        },
      }}
    >
      {children}
    </ReactSidebar>
  );
};

export default Sidebar;
