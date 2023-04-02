//External Lib  imports
import React from 'react';
import { RiDashboardLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { BsIntersect } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

//Internal Lib  imports
import NavItem from './NavItem';
import { AiFillTags, AiFillNotification } from 'react-icons/ai';
import { BsPersonRolodex } from 'react-icons/bs';
import { MdSupportAgent, MdPriorityHigh } from 'react-icons/md';
import { BiSupport } from 'react-icons/bi';

const SideBar = ({ openMenu, setOpenMenu }) => {
  const { t } = useTranslation();
  return (
    <div className={openMenu ? 'side-nav-open' : 'side-nav-close'}>
      <Nav className="flex-column pt-2">
        <NavItem title={t('dashboard')} link="/dashboard" Icon={RiDashboardLine} />
        <NavItem title={t('support')} link="/supports" Icon={BiSupport} />
        <NavItem title={t('departments')} link="/departments" Icon={BsIntersect} />
        <NavItem title={t('categories')} link="/categories" Icon={AiFillTags} />
        <NavItem title={t('priority')} link="/priority" Icon={MdPriorityHigh} />
        <NavItem title={t('notification')} link="/notification" Icon={AiFillNotification} />
        <NavItem title={t('agents')} link="/agents" Icon={MdSupportAgent} />
        <NavItem title={t('role')} link="/role" Icon={BsPersonRolodex} />
      </Nav>
    </div>
  );
};

export default SideBar;
