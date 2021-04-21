//Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

//Admin Pages
import AdminHome from '../pages/Admin';
import AdminSign from '../pages/Admin/SignIn';
import AdminEmpresa from '../pages/Admin/Empresa';

//Users pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';

//Other 
import Error404 from '../pages/Error404.js';

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes:[
            {
                path:"/admin",
                component: AdminHome,
                extac:true
            },
            {
                path:"/admin/login",
                component: AdminSign,
                exact: true
            },
            {
                path:"/admin/proveedor",
                component: AdminEmpresa,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path:"/",
        component: LayoutBasic,
        exact: false,
        routes:[
            {
                path:"/",
                component: Home,
                exact: true
            },
            {
                path:"/contacto",
                component:Contact,
                exact:true
            },
            {
                component: Error404
            }
        ]
    }
];

export default routes;