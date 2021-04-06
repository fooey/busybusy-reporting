import classnames from 'classnames';
import { ClassValue } from 'classnames/types';

export interface IPageHeader {
  title?: JSX.Element;
  subTitles?: IPageHeaderSubTitle[];
}

export interface IPageHeaderSubTitle {
  iconName?: string;
  content?: string | JSX.Element;
}

type IClassedElementFC<T> = { className?: ClassValue } & React.HTMLAttributes<T>;

export const PageHeaderContainer: React.FC<IClassedElementFC<HTMLHeadingElement>> = ({
  className,
  children,
  ...attrs
}) => {
  return (
    <header className={`${classnames(`mb-8`, className)}`} {...attrs}>
      {children}
    </header>
  );
};

export const PageHeaderTitle: React.FC<IClassedElementFC<HTMLHeadingElement>> = ({ className, children, ...attrs }) => {
  return (
    <h1 className={`${classnames(`text-2xl font-thin text-gray-900 sm:text-4xl`, className)}`} {...attrs}>
      {children}
    </h1>
  );
};

export const PageHeaderSubTitlesContainer: React.FC<IClassedElementFC<HTMLHeadingElement>> = ({
  className,
  children,
  ...attrs
}) => {
  return (
    <div
      className={`${classnames(`mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6`, className)}`}
      {...attrs}
    >
      {children}
    </div>
  );
};

export const PageHeaderSubTitle: React.FC<IClassedElementFC<HTMLDivElement>> = ({ className, children, ...attrs }) => {
  return (
    <div className={`${classnames(`mt-2 flex items-center text-sm text-gray-500`, className)}`} {...attrs}>
      {children}
    </div>
  );
};
