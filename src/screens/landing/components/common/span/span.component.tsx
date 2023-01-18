import React from 'react';
import styled from 'styled-components';

export const SpanContainer = styled.span`
	background: linear-gradient(
		89.58deg,
		#44bcf0 -19.85%,
		#818cf8 54.07%,
		#a099ff 120.75%
	);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	text-fill-color: transparent;
`;

export interface SpanComponentProps {
  children: React.ReactNode;
}

export const StyledSpan: React.FC<SpanComponentProps> = ({ children }) => (
  <SpanContainer>{children}</SpanContainer>
);
