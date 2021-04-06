import classNames from 'classnames';
import { ClassValue } from 'classnames/types';
import { iconIndex } from './index';

export type TIconKeys = keyof typeof iconIndex;

const Icon: React.FC<{
  name: TIconKeys;
  className?: ClassValue;
}> = ({ name, className }) => {
  const finalClasses: ClassValue = classNames(className, []);

  const IconComponent = iconIndex[name];

  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={finalClasses}>
      <IconComponent />
    </svg>
  );
};

export default Icon;
