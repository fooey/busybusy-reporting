import classnames from 'classnames';
import { ClassValue } from 'classnames/types';
import React from 'react';
import Icon from './icons/Icon';

const Spinner: React.FC<{ className?: ClassValue }> = ({ className }) => (
  <>
    <Icon name="Process" className={`w-5 h-5 text-gray-400 animate-spin ${classnames(className)}`} />
  </>
);

export default Spinner;
