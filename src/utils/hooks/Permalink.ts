import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const Permalink = (fileName: string) => {
  const router = useRouter();
  const fileNameFromUrl = router.asPath.split('#')[1];
  const isSelected = fileName === fileNameFromUrl;
  const itemRef = useRef(null);

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isSelected]);

  return { isSelected, itemRef };
};