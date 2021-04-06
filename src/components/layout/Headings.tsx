import React from 'react';
import classnames from 'classnames';
import { ClassValue } from 'classnames/types';

export const Heading1: React.FC<{ classes?: ClassValue }> = ({ children, classes }) => (
  <h1 className={classnames('text-3xl font-bold', classes)}>{children}</h1>
);

export const Heading2: React.FC<{ classes?: ClassValue }> = ({ children, classes }) => (
  <h2 className={classnames('text-2xl font-bold', classes)}>{children}</h2>
);

export const Heading3: React.FC<{ classes?: ClassValue }> = ({ children, classes }) => <h3 className={classnames('text-xl font-bold', classes)}>{children}</h3>;
