import { FC, useEffect, useState } from 'react';
import useFileContent from '../../utils/fetchOnMount';
import FourOhFour from '../FourOhFour';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import MDXComponents from '../MDXComponents';
import { LoadingIcon } from '../Loading';
import { useTranslation } from 'next-i18next';

interface MarkdownPreviewProps {
  file: any;
  path: string;
  standalone?: boolean;
}

const MarkdownPreview: FC<MarkdownPreviewProps> = ({ file, path, standalone = true }) => {
  const parentPath = standalone ? path.substring(0, path.lastIndexOf('/')) : path;
  const { t } = useTranslation();
  const { response: content, error, validating } = useFileContent(`/api/raw/?path=${parentPath}/${file.name}`, path);
  const [mdxSource, setMdxSource] = useState<any>(null);

   {/* This is for testing purposes only on development builds */}

  // const getMarkDownSource = async (content: string | null) => {
  //   if (content) {
  //     const mdxSource = await serialize(content, {
  //       mdxOptions: {
  //        development: process.env.NODE_ENV === "development"
  //       },
  //     });
  //     setMdxSource(mdxSource);
  //   }
  // };

  // useEffect(() => {
  //   getMarkDownSource(content);
  // }, [content]);

  const getMarkDownSource = async (content: string | null) => {
    if (content) {
      const mdxSource = await serialize(content);
      setMdxSource(mdxSource);
    }
  };
  
  useEffect(() => {
    getMarkDownSource(content);
  }, [content]);

  if (error) {
    return (
      <div className="border dark:border-gray-700 rounded-lg bg-white p-3 dark:bg-black dark:text-white">
        <FourOhFour errorMsg={error} />
      </div>
    );
  }

  if (validating || mdxSource === null) {
    return (
      <main>
        <div className="border dark:border-gray-700 rounded-lg bg-white p-3 dark:bg-black dark:text-white">
          <div className="items-center justify-center flex space-x-2">
            <LoadingIcon />
            <span>{t('Loading ...')}</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-2">
    <div className="markdown-body">
      <MDXRemote {...mdxSource} components={MDXComponents} />
    </div>
    </main>
  );
};

export default MarkdownPreview;
