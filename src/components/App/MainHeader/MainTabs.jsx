

import { Icon } from 'tdesign-icons-react';
import React, {useContext, useEffect, useRef, useState} from "react";
import "./MainTabs.less"

import {AppContext} from '@/App.jsx'
import classNames from "classnames";
import {useNavigate} from "react-router-dom";
function MainTabs ({}){
    const {providerVal,setProviderVal,MenuList,MenuDispatch} = useContext(AppContext)
    const [tabList,setTabList] = useState([])
    let count = 0
    const navigator = useNavigate()
    function closeClick(e,tab){
        e.stopPropagation()
        const _len = MenuList.length
        const curMenuActive = MenuList[_len - 2]
        if(curMenuActive){
            setProviderVal({...providerVal,curMenuActive})
            navigator(curMenuActive.MenuUrl)
        }
        MenuDispatch({...tab,type:'deleted'})

    }
    function tabClick(e,tab){
        setProviderVal({...providerVal,curMenuActive:tab})
        if(tab.MenuUrl){
            navigator(tab.MenuUrl)
        }
    }
    function showTabs(){
        // console.log(MenuList,'MenuList');
        return MenuList.map(tab=> {
            return <div className={classNames('tab-item-box',
                {'active':providerVal.curMenuActive.MenuCode == tab.MenuCode})} key={tab.MenuCode}
                onClick={event => tabClick(event,tab)}
            >
                <span>{tab.MenuName}</span>
                {tab.Closeable  == '1' ?<Icon name="close" size="16px"
                                              onClick={event => closeClick(event,tab)} /> : null }
            </div>
        })
    }

    return (
        <div className="main-tabs-container custom-scrollbar">
            <div className="tabs-content ">
                {/*<div className="tab-item-box">*/}
                {/*    <span>首页</span>*/}
                {/*    <Icon name="close" size="16px" />*/}
                {/*</div>*/}
                {showTabs()}
            </div>
        </div>
    )
}

export default MainTabs
