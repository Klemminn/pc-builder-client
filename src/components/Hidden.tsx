import React from 'react';
import MediaQuery from 'react-responsive';

export const IsMobile: React.FC = (props) => (
  <MediaQuery maxDeviceWidth={1000} {...props} />
);

type HideUnderProps = {
  width?: number;
};

export const HideUnder: React.FC<HideUnderProps> = ({
  width = 750,
  ...rest
}) => <MediaQuery minDeviceWidth={width} {...rest} />;

export const HideOver: React.FC<HideUnderProps> = ({
  width = 750,
  ...rest
}) => <MediaQuery maxDeviceWidth={width} {...rest} />;
