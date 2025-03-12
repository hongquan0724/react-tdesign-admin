import {useState, useReducer, createContext, useEffect,} from 'react'
import classNames from 'classnames';
import './App.less'
import {RoutesList} from '@/routes/index.jsx'
import {
    useNavigate,
    useRoutes,
} from 'react-router-dom';
import MainMenu from "@/components/App/MainMenu.jsx";
import MainHeader from "@/components/App/MainHeader/MainHeader.jsx";



export const AppContext = createContext(null);
function App() {
  const navigator = useNavigate()
  const [MenuList,MenuDispatch] = useReducer(MenuReducer,[])
  const [providerVal, setProviderVal] = useState({
      collapsed:false,
      curMenuActive:{},
  })
 function MenuReducer (menulist, action){
      switch (action.type){
          case 'added':
              if(menulist.some(s=>s.MenuCode == action.MenuCode)){
                  return menulist
              }else {
                  return [...menulist, {
                      ...action
                  }];
              }
              break;
          case 'deleted':
              return menulist.filter(t => t.MenuCode !== action.MenuCode);
              break;
          default:
              throw Error('Unknown action: ' + action.type);
              break;
      }
 }
    useEffect(() => {
        navigator('/home', { replace: true });
    }, [navigator]);

    return (
      <AppContext.Provider value={{providerVal,setProviderVal,MenuDispatch,MenuList}}>
          <div className="app-main-container">
              <div className={classNames('app-menu-container',{'memu-folded':providerVal.collapsed})}>
                  <MainMenu/>
              </div>
              <div className={classNames('app-right-container',{'memu-folded':providerVal.collapsed})}>
                  <div className="app-header-container">
                      <MainHeader/>
                  </div>
                  <div className="app-router-container">
                      {useRoutes(RoutesList)}
                  </div>
              </div>

          </div>
      </AppContext.Provider>
  )
}

export default App
