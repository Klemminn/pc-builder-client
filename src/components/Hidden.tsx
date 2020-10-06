import React from 'react';
import MediaQuery from 'react-responsive';

export const IsMobile: React.FC = (props) => (
  <MediaQuery maxDeviceWidth={767} {...props} />
);
