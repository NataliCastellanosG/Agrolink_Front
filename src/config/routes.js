//Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";

//Admin Pages
import AdminHome from "../pages/Admin/Home";
import AdminSignIn from "../pages/Admin/SignIn";
import AdminEmpresa from "../pages/Admin/Empresa";
import AdminInfo from "../pages/Admin/Empresa/Informacion";
//Users pages
import Home from "../pages/Home";
import Contact from "../pages/Contact";

//Other
import Error404 from "../pages/Error404.js";

const routes = [
  {
    path: "/activo",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/activo",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/activo/login",
        component: AdminSignIn,
        exact: true,
      },
      {
        path: "/activo/proveedor",
        component: AdminEmpresa,
        exact: true,
      },
      {
        path: "/activo/informacionProveedor",
        component: AdminInfo,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        path: "/contact",
        component: Contact,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
