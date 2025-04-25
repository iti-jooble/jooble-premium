import React, { CSSProperties } from "react";
import { animated } from "@react-spring/web";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { uniqueId } from "lodash";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useCarousel } from "@/hooks/useCarousel";
import { ICarouselComponentProps } from "@/hooks/useCarousel/types";
import { cn } from "@/lib/utils";

export function Carousel<I extends object>({
  infinite = false,
  swipable = false,
  withBar = false,
  selectedItem = 0,
  items = [],
  children: Children,
  itemClassName,
  className,
  onChange,
}: ICarouselComponentProps<I>): JSX.Element {
  const itemsCount = items.length;

  const { springs, selectedItemIndex, handleSetItemIndex, bindSwipe } =
    useCarousel({
      selectedItem,
      itemsCount,
      infinite,
      swipable,
    });

  const handleChangeSlide =
    (indexDiff: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      const nextIndex = selectedItemIndex + indexDiff;
      event.stopPropagation();
      handleSetItemIndex(nextIndex);

      if (infinite) {
        if (nextIndex < 0) {
          onChange?.(itemsCount - 1);
          return;
        }

        if (nextIndex >= itemsCount) {
          onChange?.(0);
          return;
        }
      }

      onChange?.(nextIndex);
    };

  const isLeftButtonVisible = infinite || selectedItemIndex !== 0;
  const isRightButtonVisible =
    infinite || selectedItemIndex !== springs.length - 1;

  return (
    <div
      className={cn(
        "relative flex justify-center overflow-hidden w-full",
        className,
      )}
    >
      <div className="relative flex justify-center items-center h-[600px] w-[356px]">
        {isLeftButtonVisible && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background shadow-md"
            onClick={handleChangeSlide(-1)}
            data-test-name="carouselLeftArrowButton"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {springs.map(({ x, display, position, opacity, scale }, i) => (
          <animated.div
            {...(bindSwipe && bindSwipe())}
            key={uniqueId(i.toString())}
            style={{
              display: display as unknown as CSSProperties["display"],
              position: position as unknown as CSSProperties["position"],
              transform: x.to((xVal: number) => `translate3D(${xVal}%, 0, 0)`),
              opacity,
              scale,
            }}
            className={cn("flex justify-center items-center px-6", {
              [itemClassName!]: !!itemClassName,
            })}
          >
            <Children item={items[i]} index={i} />
          </animated.div>
        ))}

        {isRightButtonVisible && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10 rounded-full h-10 w-10 bg-background shadow-md"
            onClick={handleChangeSlide(1)}
            data-test-name="carouselRightArrowButton"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>

      {withBar && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-2">
            <strong className="text-sm">{selectedItemIndex + 1}</strong>
            <span className="text-muted-foreground text-sm">of</span>
            <span className="text-sm">{itemsCount}</span>
          </div>
        </div>
      )}
    </div>
  );
}
