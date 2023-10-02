import clsx from 'clsx';
import Link from 'next/link';
import { ReactNode } from 'react';

export type UnstyledLinkProps = {
  href: string;
  children: ReactNode;
  targetBlank?: boolean; 
  className?: string;
};


export const shouldOpenNewTab = (href: string, openNewTab?: boolean) => {
  if (openNewTab !== undefined) {
    return openNewTab;
  }

  if (href.startsWith('http://') || href.startsWith('https://')) {
    return true;
  }

  return !href.startsWith('/') && !href.startsWith('#');
};


export default function UnstyledLink({
  children,
  href,
  targetBlank,
  className,
}: UnstyledLinkProps) {
  return (
    <Link
      href={href}
      className={clsx(className, targetBlank && 'cursor-newtab')}
      target={targetBlank ? '_blank' : undefined}
      rel={targetBlank ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  );
}
