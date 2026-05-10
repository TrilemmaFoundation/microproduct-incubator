import React from 'react';

type LinkProps = React.PropsWithChildren<
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    to?: string;
  }
>;

export default function Link({ children, to, href, ...props }: LinkProps) {
  const dest = href ?? to ?? '#';
  return (
    <a href={dest} {...props}>
      {children}
    </a>
  );
}
