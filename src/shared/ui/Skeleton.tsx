import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from 'tosslib';

interface SkeletonProps {
  className?: string;
}

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const SkeletonWrapper = styled.div`
  display: block;
  width: 100%;
  border-radius: 4px;
  background-color: ${colors.greyOpacity100};
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
`;

const SkeletonShimmer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, ${colors.greyOpacity100}, transparent);
  animation: ${shimmer} 1.5s infinite;
`;

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <SkeletonWrapper className={className}>
      <SkeletonShimmer />
    </SkeletonWrapper>
  );
};
