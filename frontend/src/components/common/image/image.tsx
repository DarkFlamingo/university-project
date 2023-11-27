import { FC } from 'common/types/types';

type Props = {
  src: string;
  className?: string;
  alt?: string;
};

const Image: FC<Props> = ({ src, className, alt = '' }) => (
  <img src={src} className={className} alt={alt} />
);
export { Image };
