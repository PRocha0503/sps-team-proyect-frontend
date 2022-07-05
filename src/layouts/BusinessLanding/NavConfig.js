import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/business/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  
  // URLS below are currently non functional
  {
    title: 'Business Profile',
    path: '/business/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'products',
    path: '/business/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Coupons',
    path: '/business/coupons',
    icon: getIcon('eva:file-text-fill'),
  },
];

export default navConfig;