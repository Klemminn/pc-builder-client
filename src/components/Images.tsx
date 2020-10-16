import React from 'react';
import styled from '@emotion/styled';
import { LazyImage } from 'react-lazy-images';

import { FormatUtils } from 'utils';

type SizedImageProps = {
  size: number;
};

const SizedImage = styled.img<SizedImageProps>`
  height: ${({ size }) => `${size}rem`};
`;

type ImageProps = {
  src: string;
  size?: number;
};

export const Thumbnail: React.FC<ImageProps> = ({ src, size = 2, ...rest }) => (
  <LazyImage
    placeholder={({ ref }) => <div ref={ref} />}
    src={FormatUtils.getSmallImageUrl(src)}
    actual={({ imageProps }) => <SizedImage size={size} {...imageProps} />}
  />
);
