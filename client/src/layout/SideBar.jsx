//External Lib  imports
import React from 'react';
import { RiDashboardLine } from 'react-icons/ri';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { BiSupport } from 'react-icons/bi';

//Internal Lib  imports
import NavItem from './NavItem';

const SideBar = ({ openMenu, setOpenMenu }) => {
  const { t } = useTranslation();
  return (
    <div className={openMenu ? 'side-nav-open' : 'side-nav-close'}>
      <Nav className="flex-column pt-2">
        <NavItem title={t('dashboard')} link="/dashboard" Icon={RiDashboardLine} />
        <NavItem title={t('task')} link="/task" Icon={BiSupport} />
      </Nav>
    </div>
  );
};

export default SideBar;
