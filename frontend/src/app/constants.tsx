import {
  LuLayoutDashboard,
} from 'react-icons/lu'
import {IoChatbubblesOutline} from "react-icons/io5";
import {TbApps} from "react-icons/tb";

export const navigationItems = [
  {
    title: 'Dashboard',
    icon: <LuLayoutDashboard className='h-5 w-5' />,
    href: '/dashboard',
  },
  {
    title: 'Chats',
    icon: <IoChatbubblesOutline className='h-5 w-5' />,
    href: '/admin/chats',
  },
  {
    title: 'Connections',
    icon: <TbApps className='h-5 w-5' />,
    href: '/admin/connections',
  },
]