import { Button } from '@nextui-org/react';
import React, { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { formatNumber } from '../../utils/fileDetails';
import Hover from '../UI/Tooltip';

const Star: React.FC = () => {
  const [starCount, setStarCount] = useState(99);
  const [star, seStar] = useState(false);

  const handleLikeClick = () => {
    if (!star) {
      setStarCount(starCount + 1);
    } else {
      setStarCount(starCount - 1);
    }
    seStar(!star);
  };

  return (
    <Hover tipChildren="In Development">
    <Button
      onPress={handleLikeClick}
      className={`bg-white bg-opacity-70 dark:bg-opacity-50 backdrop-blur-md border dark:border-gray-700 overflow-hidden dark:bg-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-850 items-center -space-x-1`}
      startContent={
        star ? (
          <BsStarFill size={18} className="text-yellow-500" />
        ) : (
          <BsStar size={18} />
        )
      }
      radius="full"
    >
      <h1>{formatNumber(starCount)}</h1>
    </Button>
    </Hover>
  );
};

export default Star;
