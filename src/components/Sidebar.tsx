import React from 'react';
import ReactSidebar from 'react-sidebar';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaMemory, FaBox, FaHammer } from 'react-icons/fa';
import { FiCpu, FiHardDrive } from 'react-icons/fi';
import { CgScreenMirror } from 'react-icons/cg';
import { ImPower } from 'react-icons/im';

import { Link } from 'components';
import { Colors } from 'style';

import VaktinLogo from 'assets/vaktinlogo.png';

const LogoContainer = styled.div`
  display: flex;
  padding: 1rem;
  height: 5rem;
  background-color: ${Colors.Black};
`;

const Logo = styled.img`
  width: 50%;
  text-align: center;
`;

const StyledItem = styled('div')<{ active: boolean }>`
  display: flex;
  align-items: center;
  font-size: 2rem;
  padding: 1rem;
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
    text: 'Smíða',
    to: '/',
  },
  {
    icon: <FiCpu />,
    text: 'CPU',
    to: '/cpu',
  },
  {
    icon: <FaMemory />,
    text: 'RAM',
    to: '/ram',
  },
  {
    icon: <CgScreenMirror />,
    text: 'GPU',
    to: '/gpu',
  },
  {
    icon: <FiHardDrive />,
    text: 'HDD & SSD',
    to: '/storage',
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
];

const Sidebar: React.FC<SidebarProps> = ({ children, open, toggleSidebar }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });
  const location = useLocation();

  console.log(location);

  return (
    <ReactSidebar
      sidebar={
        <>
          <LogoContainer>
            <Logo src={VaktinLogo} />
          </LogoContainer>
          {components.map(({ to, ...component }, idx) => (
            <React.Fragment key={idx}>
              <Link to={to}>
                <SidebarItem active={to === location.pathname} {...component} />
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
