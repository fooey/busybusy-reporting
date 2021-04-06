import Link from 'next/link';
import classNames from 'classnames';
import { ClassValue } from 'classnames/types';
import Image from 'next/image';

const linkClass = classNames('text-gray-500 hover:text-gray-900');

const AppHeader: React.FC = () => (
  <header className="container mx-auto flex flex-nowrap justify-between items-center p-4 border-b border-gray-300">
    <h1 className="font-thin flex items-center nowrap">
      <Link href="/">
        <a className={`flex items-center ${linkClass}`}>
          <Image src="/images/busybusy-b.png" width="36" height="36" alt="busybusy " className="block" />
          <span className="ml-4 text-xl md:text-2xl text-center hidden sm:block">busybusy</span>
        </a>
      </Link>
    </h1>
    <nav className="flex">
      <NavItem className="hidden sm:inline" href="/">
        Home
      </NavItem>
    </nav>
  </header>
);

const NavItem: React.FC<{ className?: ClassValue; href: string }> = ({ className, href, children }) => (
  <Link href={href}>
    <a className={`ml-6 md:ml-8 xl:ml-12 ${linkClass} ${classNames(className)}`}>{children}</a>
  </Link>
);

export default AppHeader;
