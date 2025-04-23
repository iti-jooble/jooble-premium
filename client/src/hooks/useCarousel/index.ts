import { useState, useEffect } from 'react';
import { useSprings } from '@react-spring/web';
import { useDrag } from 'react-use-gesture';
import { clamp } from 'lodash';
import KEY_CODES from '@/constants/keyCodes';
import getWindow from '@/utils/getWindow';
import { ISpring, ISpringProps, IUseCarouselProps } from './types';

export const useCarousel = ({
  infinite = false,
  swipable = false,
  maxVisibleItems = 101,
  selectedItem,
  itemsCount,
}: IUseCarouselProps): {
  springs: ISpring[];
  selectedItemIndex: number;
  handleSetItemIndex(index: number): void;
  bindSwipe?: any;
} => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(selectedItem);

  const itemsCountBeside = (maxVisibleItems - 1) / 2;

  const createSprings = (currentIndex: number): ISpringProps => {
    const indexDiff = currentIndex - selectedItemIndex;
    const isNextElement = indexDiff === 1 || indexDiff === -1;
    const x = indexDiff * (isNextElement ? 98 : 95);
    const opacity = currentIndex === selectedItemIndex ? 1 : 0.8;
    const scale = currentIndex === selectedItemIndex ? 1 : 0.8;
    const position = x === 0 ? 'relative' : 'absolute';
    const display =
      currentIndex < selectedItemIndex - itemsCountBeside || currentIndex > selectedItemIndex + itemsCountBeside
        ? 'none'
        : 'block';

    return { x, display, position, opacity, scale };
  };

  const [springs, setSprings] = useSprings<ISpringProps>(itemsCount, createSprings);

  const handleSetItemIndex = (index: number): void => {
    let itemIndex = index;

    if (infinite) {
      if (itemIndex < 0) {
        const lastItemIndex = itemsCount - 1;
        itemIndex = lastItemIndex;
      }

      if (itemIndex >= itemsCount) {
        itemIndex = 0;
      }
    }

    setSelectedItemIndex(itemIndex);
  };

  const bindSwipe = useDrag(
    ({ down, direction: [xDir], distance, cancel }) => {
      const window = getWindow();
      if (down && distance > (window?.innerWidth || 1000) / 5 && cancel) {
        setSelectedItemIndex(clamp(selectedItemIndex + (xDir > 0 ? -1 : 1), 0, itemsCount - 1));
        cancel();
      } else {
        setSprings((currentIndex) => {
          const indexDiff = currentIndex - selectedItemIndex;

          if (indexDiff === 0) {
            setSelectedItemIndex(currentIndex);
          }

          return createSprings(currentIndex);
        });
      }
    },
    { event: { passive: false } }
  );

  const onKeyDown = (event: KeyboardEvent): void => {
    event.preventDefault();
    const { keyCode } = event;

    if (keyCode !== KEY_CODES.LEFT_ARROW && keyCode !== KEY_CODES.RIGHT_ARROW) {
      return;
    }

    let newSlideIndex = selectedItemIndex;

    if (keyCode === KEY_CODES.LEFT_ARROW && (selectedItemIndex !== 0 || infinite)) {
      newSlideIndex -= 1;
    }

    if (keyCode === KEY_CODES.RIGHT_ARROW && (selectedItemIndex !== itemsCount - 1 || infinite)) {
      newSlideIndex += 1;
    }

    handleSetItemIndex(newSlideIndex);
  };

  useEffect(() => {
    setSprings(createSprings);

    const window = getWindow();

    window?.addEventListener('keydown', onKeyDown, false);

    return (): void => window?.removeEventListener('keydown', onKeyDown, false);
  }, [selectedItemIndex]);

  return { springs, selectedItemIndex, handleSetItemIndex, ...(swipable && { bindSwipe }) };
};