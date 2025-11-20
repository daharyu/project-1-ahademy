import { cn } from '@/lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

type CustomCardProps = {
  variant: 'genre' | 'recommend';
  className?: string;
  children?: React.ReactNode;
  href?: string;
  animateIndex?: number;
  onClick?: () => void;
} & (
  | { href: string; onClick?: never }
  | { onClick: () => void; href?: never }
  | { href?: never; onClick?: never }
);

const motionVariants = {
  hidden: { opacity: 0, scale: 0.8, x: -70 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      duration: 0.5,
      delay: (i % 20) * 0.06,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const CustomCard: React.FC<CustomCardProps> = ({
  variant,
  children,
  className,
  href,
  animateIndex = 1,
  onClick,
}) => {
  const isGenre = variant === 'genre';

  const baseClasses = cn(
    'bg-white shadow-lg shadow-[#CBCACA40] transition-all duration-200',
    isGenre
      ? 'rounded-2xl p-4 cursor-pointer hover:shadow-xl hover:scale-[1.03]'
      : 'rounded-xl overflow-hidden',
    className
  );

  const motionProps: HTMLMotionProps<'div'> = {
    custom: animateIndex,
    variants: motionVariants,
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true },
    whileTap: onClick ? { scale: 0.96 } : undefined,
  };

  // 1. Clickable genre card
  if (onClick) {
    return (
      <motion.div
        {...motionProps}
        className={baseClasses}
        onClick={onClick}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {children}
      </motion.div>
    );
  }

  // 2. Navigable book card
  if (href) {
    return (
      <Link href={href} className='block'>
        <motion.div {...motionProps} className={baseClasses}>
          {children}
        </motion.div>
      </Link>
    );
  }

  // 3. Static card
  return (
    <motion.div {...motionProps} className={baseClasses}>
      {children}
    </motion.div>
  );
};

export default CustomCard;
