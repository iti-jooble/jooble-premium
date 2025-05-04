export interface IUseCarouselProps {
  infinite?: boolean;
  swipable?: boolean;
  maxVisibleItems?: number;
  selectedItem: number;
  itemsCount: number;
}

export interface ISpringProps {
  x: number;
  display: string;
  position: string;
  opacity: number;
  scale: number;
}

export interface ISpring {
  x: any;
  display: any;
  position: any;
  opacity: any;
  scale: any;
}

export interface ICarouselComponentProps<I> {
  infinite?: boolean;
  swipable?: boolean;
  withBar?: boolean;
  selectedItem?: number;
  items: I[];
  children: React.ComponentType<{ item: I; index: number }>;
  itemClassName?: string;
  itemSize?: string;
  className?: string;
  onChange?: (index: number) => void;
}
