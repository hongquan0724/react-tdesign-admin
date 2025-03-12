

import { ViewListIcon } from 'tdesign-icons-react';
import {  Dropdown, Button, MessagePlugin } from 'tdesign-react';
import { useNavigate } from "react-router-dom";

import React, { useReducer,useState,useContext } from 'react';
import './MainHeader.less'

import {AppContext} from '@/App.jsx'
import MainTabs from "@/components/App/MainHeader/MainTabs.jsx";


function MainHeader () {
    const {providerVal,setProviderVal} = useContext(AppContext)
    console.log(providerVal,'mainheader');

    const navigate = useNavigate();
    const options = [
        {
            content: '首页',
            value: 1,
        },
        {
            content: '退出登录',
            value: 2,
        },
    ];
    const foldClick = ()=>{
        const state = {...providerVal,collapsed:!providerVal.collapsed}
        setProviderVal(state)
    }
    const userDropdownHandler = (data) =>{
        console.log(data);
        if(data.value == 2){
            localStorage.removeItem('userInfo')
            navigate('/login')
        }
    }


    return (
        <div className="main-header-container">
            <div className="fold-btn">
                <Button variant="text" shape="square" icon={<ViewListIcon />} onClick={foldClick} />
            </div>
            <div className="main-content-container">
                <MainTabs />
            </div>
            <div className="user-container">
                <Dropdown
                    options={options}
                    onClick={userDropdownHandler}
                    trigger="click"
                    popupProps={{overlayInnerStyle: {padding: 4}}}
                >
                    <div className="user-avatar-container">
                        <img className="user-avatar" src="/img/App/avatar.gif"/>
                    </div>
                </Dropdown>

            </div>
        </div>
    )

}

export default MainHeader
