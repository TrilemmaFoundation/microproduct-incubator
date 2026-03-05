import React from 'react';

type LinkProps = React.PropsWithChildren<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string;
  }
>;

export default function Link({ children, to, ...props }: LinkProps) {
  return (
    <a href={to} {...props}>
      {children}
    </a>
  );
}
