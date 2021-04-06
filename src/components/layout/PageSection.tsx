import classnames from 'classnames';
import { ClassValue } from 'classnames/types';

const PageSection: React.FC<{ className?: ClassValue }> = ({ className, children }) => {
  return <div className={`${classnames(className, 'bg-white border rounded-lg shadow-lg')} `}>{children}</div>;
};

export default PageSection;
