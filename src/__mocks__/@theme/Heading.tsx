import React from 'react';

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3';
  children: React.ReactNode;
};

export default function Heading({ as = 'h1', children }: HeadingProps) {
  return React.createElement(as, {}, children);
}
