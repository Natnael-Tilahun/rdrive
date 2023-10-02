import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

export type UnstyledLinkProps = {
  href: string;
  children: ReactNode;
  openNewTab?: boolean;
  className?: string;
};

export const shouldOpenNewTab = (href: string, openNewTab?: boolean) => {
  if (openNewTab !== undefined) {
    return openNewTab;
  }

  return !href.startsWith('/') && !href.startsWith('#');
};

export default function UnstyledLink({
  children,
  href,
  openNewTab,
  className,
}: UnstyledLinkProps) {
  const isNewTab = shouldOpenNewTab(href, openNewTab);

  return (
    <Link href={href} 
        className={clsx(className, isNewTab && 'cursor-newtab')}
        target={isNewTab ? '_blank' : undefined}
        rel={isNewTab ? 'noopener noreferrer' : undefined}
      >
        {children}
    </Link>
  );
}
