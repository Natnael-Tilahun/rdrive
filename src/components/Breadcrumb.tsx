import type { ParsedUrlQuery } from 'querystring';

import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { FaAngleRight } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';

const HomeCrumb = () => {
  const { t } = useTranslation();

  return (
    <Link href="/" className="flex items-center">
      <AiFillHome className="h-4 w-4" />
      <span className="ml-2 font-medium">{t('Home')}</span>
    </Link>
  );
};

const Breadcrumb: React.FC<{ query?: ParsedUrlQuery }> = ({ query }) => {
  if (query) {
    const { path } = query;
    if (Array.isArray(path)) {
      // We are rendering the path in reverse, so that the browser automatically scrolls to the end of the breadcrumb
      // https://stackoverflow.com/questions/18614301/keep-overflow-div-scrolled-to-bottom-unless-user-scrolls-up/18614561
      return (
        <nav className="inline-flex flex-row-reverse items-center gap-1 overflow-x-scroll text-sm text-black dark:text-white md:gap-3">
          {path
            .slice(0)
            .reverse()
            .map((p: string, i: number) => (
              <span key={i} className="flex flex-shrink-0 items-center">
                <FaAngleRight  />
                <Link
                  href={`/${path
                    .slice(0, path.length - i)
                    .map(p => encodeURIComponent(p))
                    .join('/')}`}
                  passHref
                  className={`ml-1 transition-all duration-75 hover:opacity-70 md:ml-3 ${
                    i == 0 && 'pointer-events-none opacity-80'
                  }`}
                >
                  {p.replaceAll('-', ' ')}
                </Link>
              </span>
            ))}
          <span className="flex-shrink-0 transition-all duration-75 hover:opacity-80">
            <HomeCrumb />
          </span>
        </nav>
      );
    }
  }

  return (
    <nav className="text-sm text-gray-600 transition-all duration-75 hover:opacity-80 dark:text-gray-300">
      <HomeCrumb />
    </nav>
  );
};

export default Breadcrumb;
