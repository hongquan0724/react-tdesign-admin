
import routesConfig from '@/routes/config.js'
import Pages from '@/view/view.jsx'

import { Navigate } from 'react-router-dom';


let RoutesList = []
const createRouter = (props) => {
    // const { auth } = props;
    console.log(props);
    // const createMenu = (r) => {
    //     const route = (r) => {
    //         const Component = r.path && Pages[r.path];
    //         console.log(Pages,'Pages');
    //         console.log(Component,'Component');
    //         // return {...r,element:Pages[r.path],key:r.name}
    //         return (
    //             <Route
    //                 key={r.name || r.component}
    //                 path={r.name || r.component}
    //                 component={Component}
    //             />
    //         );
    //
    //     };
    //
    //     const subRoute = (r) =>
    //         r.children && r.children.map((subR) => (subR.children ? subRoute(subR) : route(subR)));
    //
    //
    //
    //     return !r.children ? route(r) : subRoute(r);
    // };
    // const createRoute = (key) => routesConfig[key].map(createMenu);
    // console.log(Object.keys(routesConfig).map((key) => createRoute(key)),'result');
    // console.log(Object.keys(routesConfig));
    //
    // const router = createBrowserRouter(
    //     createRoutesFromElements(
    //         Object.keys(routesConfig).map((key) => createRoute(key))
    //     )
    // );
    /**
     * @routesInfo 路由信息
     *
     *
     */
   const createMenu = (routesInfo,pagesInfo)=>{
       let routelist = []
       const route = (list)=>{
           console.log(list,'routelist');
           const result = []
           if(Array.isArray(list)){
               for (const item of list) {
                   let _route = {}
                    if(!item.children){
                        _route = {...item,element: pagesInfo[item.path]}
                    }else {
                        _route = {...item,children:route(item.children)}
                    }
                   result.push(_route)
               }
           }
           return result
       }
        for (const rkey in routesInfo) {
            routelist =  routelist.concat(route(routesInfo[rkey]))
       }
        return routelist
   }

    const menulist = createMenu(routesConfig,Pages);
    return menulist;
    // return (
    //     <Routes>
    //         <Route path='/' element={<Home />} />
    //     </Routes>
    //
    //
    //     // <RouterProvider router={router} ></RouterProvider>
    // );
}

RoutesList = createRouter()
export  {
    createRouter,
    RoutesList
};
