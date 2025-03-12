import { Menu, Button } from 'tdesign-react';
import { AppIcon, CodeIcon, FileIcon, UserIcon, MailIcon, RollbackIcon,Icon } from 'tdesign-icons-react';
import React, { useReducer,useState,useContext,useEffect } from 'react';
const { SubMenu, MenuItem } = Menu;
import "./MainMenu.less"
import {AppContext} from '@/App.jsx'
import api from "@/api/api.js";
import {useNavigate} from "react-router-dom";




function MainMenu () {
    const [active, setActive] = useState('');
    const [menulists, setMenulist] = useState([]);
    const MenuStyle = {height: '100%', width: "100%"}
    const {providerVal, setProviderVal,MenuDispatch,MenuList} = useContext(AppContext)
    const navigator = useNavigate()
    const logoDom = !providerVal?.collapsed ? <span>LOGO</span> : <img src="/vite.svg" />
    useEffect(()=>{
        api.menu.menulisturl({}).then((res)=>{
            let curMenuActive = {}
            if(res.MenuList[0]){
                curMenuActive = res.MenuList[0]
            }
            setActive(curMenuActive.MenuCode)
            setMenulist(res.MenuList)
            setProviderVal({...providerVal,curMenuActive:curMenuActive})
            MenuDispatch({...curMenuActive,type:'added'})
        })
        // console.log(menulist);
        return ()=>menulists
    },[])
    useEffect(()=>{
        setActive(providerVal.curMenuActive.MenuCode)
    })
    function ShowMenuItem(){
        return ( menulists.map((menuitem)=>{
            if(menuitem.SubMenuList && menuitem.SubMenuList.length != 0){
                return  <SubMenu key={menuitem.MenuCode}  value={menuitem.MenuCode}
                                 title={<span>{menuitem.MenuName}</span>}
                         icon={<Icon name={menuitem.Icon}/>}>
                    {
                         menuitem.SubMenuList.map(sub=>{
                            return (<MenuItem key={sub.MenuCode}
                                              value={sub.MenuCode}
                                              icon={<Icon name={sub.Icon}/>}>
                                <span>{sub.MenuName}</span>
                            </MenuItem>)
                         })
                    }
                </SubMenu>
            }else {
                return <MenuItem key={menuitem.MenuCode}
                                 value={menuitem.MenuCode}
                                 icon={<Icon name={menuitem.Icon}/>}>
                    <span>{menuitem.MenuName}</span>
                </MenuItem>
            }
        }))
    }
    function MenuItemChange(val){
        setActive(val)
        const addMenu = (data)=>{
            const state = {...providerVal,curMenuActive:data}
            setProviderVal(state)
            MenuDispatch({...data,type:'added'})
            if(data.MenuUrl){
                navigator(data.MenuUrl)
            }
        }
        for (const menu of menulists) {
            if(!menu.SubMenuList){
                if(val == menu.MenuCode){
                    addMenu(menu)
                }
            }else {
                for (const subMenu of menu.SubMenuList) {
                    if(val == subMenu.MenuCode){
                        addMenu(subMenu)
                    }
                }
            }
        }
    }

    return (
        <div className="main-menu-container">
            <Menu
                value={active}
                collapsed={providerVal?.collapsed}
                expandMutex={false}
                onChange={(v) => MenuItemChange(v)}
                style={MenuStyle}
                theme="dark"
                logo={logoDom}
            >
                {
                    ShowMenuItem()
                }
            </Menu>
        </div>

    )
}

export default MainMenu
