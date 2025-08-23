import React from 'react';
import styles from './Typography.module.css';
import clsx from 'clsx';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'large' | 'base' | 'small' | 'tiny';
type TypographyWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type TypographyColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'destructive' | 'foreground' | 'background';

interface BaseProps {
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  color?: TypographyColor;
  children: React.ReactNode;
  className?: string;
}

interface PolymorphicRef<C extends React.ElementType> {
  ref?: React.ComponentPropsWithRef<C>['ref'];
}

type TypographyProps<C extends React.ElementType> = BaseProps &
  Omit<React.ComponentPropsWithRef<C>, keyof BaseProps> &
  PolymorphicRef<C> & {
    as?: C;
  };

const defaultElement = 'p';

export const Typography = <C extends React.ElementType = typeof defaultElement>({
  variant = 'base',
  weight = 'regular',
  color,
  as,
  children,
  className,
  ...props
}: TypographyProps<C>) => {
  const Component = as || defaultElement;

  return (
    <Component
      className={clsx(
        styles.text,
        styles[variant],
        styles[weight],
        color && styles[color],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

Typography.displayName = 'Typography';

// Convenience components
type HeadingProps = Omit<TypographyProps<'h1'>, 'variant' | 'as'>;

export const H1: React.FC<HeadingProps> = (props) => (
  <Typography as="h1" variant="h1" {...props} />
);

export const H2: React.FC<HeadingProps> = (props) => (
  <Typography as="h2" variant="h2" {...props} />
);

export const H3: React.FC<HeadingProps> = (props) => (
  <Typography as="h3" variant="h3" {...props} />
);

export const H4: React.FC<HeadingProps> = (props) => (
  <Typography as="h4" variant="h4" {...props} />
);

export const Text = Typography;