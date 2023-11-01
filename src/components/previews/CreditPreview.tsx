import { FC, useEffect, useState } from 'react';
import useFileContent from '../../utils/fetchOnMount';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import MDXComponents from '../MDXComponents';
import { Avatar } from '../GitHub/Avatar';
import { Skeleton } from '@nextui-org/react';
import { useRouter } from 'next/router';

interface CreditPreviewProps {
  path: string;
  standalone?: boolean;
}

const CreditPreview: FC<CreditPreviewProps> = ({ path }) => {
  const { asPath } = useRouter()
  const { response: content, error, validating } = useFileContent(`/api/raw/?path=${asPath}/credit.md`, path);
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
      <Avatar username="therockstarind" />
    );
  }

  if (validating) {
    return (
      <div className="flex items-center gap-2" >
          <Skeleton className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="flex flex-col space-y-1">
            <Skeleton className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <Skeleton className="w-20 h-3 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          </div >
        </div>
    );
  }
  // Parse credit content and extract the name
const creditMatches = content.match(/---\s*\n(.*?)\n---/s);
let username = '';

if (creditMatches && creditMatches.length > 1) {
  const creditData = creditMatches[1];
  const creditFields = creditData.split('\n').map((field) => field.trim());

  for (const field of creditFields) {
    const [key, value] = field.split(':').map((part) => part.trim());
    if (key === 'username') {
      username = value;
      break;
    }
  }
}

  return (
    <main>
    <Avatar username={username} />
      <MDXRemote {...mdxSource} components={MDXComponents}>
      {content.replace(/---\s*\n.*?\n---/s, '')}
      </MDXRemote>
    </main>
  );
};

export default CreditPreview;
