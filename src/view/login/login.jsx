import React, {useState} from 'react';
import { Form, Input, MessagePlugin } from 'tdesign-react';
import { useNavigate } from "react-router-dom";
import './login.less'
import api from "@/api/api.js";
import axios from "axios";

const { FormItem } = Form;
const login = (props)=>{
    console.log(props)
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const name = Form.useWatch('name', form);
    const password = Form.useWatch('password', form);

    const loginFunc = (formData) => {
        console.log(formData);
    }
    const onSubmit = (e)=>{
        console.log(e);
        console.log('name', name);
        if(!name){
            form.setFields([
                { name: 'name', status: 'error', validateMessage: { type: 'error', message: '用户不能为空!' } },
            ]);
            return
        }
        if(!password){
            form.setFields([
                { name: 'password', status: 'error', validateMessage: { type: 'error', message: '密码不能为空!' } },
            ]);
            return;
        }
        api.login.loginurl({user:name,password,}).then((res)=>{
            MessagePlugin.success('登录成功!')
            localStorage.setItem('userInfo',escape(res.data))
            navigate("/home")
        })
        // axios.post('/mock/login',{user:name,password,}).then((res)=>{
        //     console.log(res);
        //     if(res.data.code === 200){
        //         MessagePlugin.success('登录成功!')
        //
        //         localStorage.setItem('userInfo',escape(res.data.data))
        //         navigate("/")
        //     }
        //     console.log(res,'res');
        // })

    }



    return (
        <div className="login-page-container">
            <div className="login-box">
                <h2>登录</h2>
                <Form form={form} onSubmit={onSubmit}  colon labelWidth={100}>
                    <FormItem name="name" initialData="admin">
                        <Input placeholder="" required />
                        <label >用户名</label>
                    </FormItem>
                    <FormItem name="password" initialData="admin">
                        <Input type="password" placeholder="" required  />
                        <label >密码</label>
                    </FormItem>
                    <button type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </Form>
                {/*<form action={loginFunc} >*/}
                {/*    <div className="user-box">*/}
                {/*        <input type="text" name="" required=""/>*/}
                {/*        <label>用户名</label>*/}
                {/*    </div>*/}
                {/*    <div className="user-box">*/}
                {/*        <input type="password" name="" required=""/>*/}
                {/*        <label>密码</label>*/}
                {/*    </div>*/}
                {/*    <button type="submit">*/}
                {/*        <span></span>*/}
                {/*        <span></span>*/}
                {/*        <span></span>*/}
                {/*        <span></span>*/}
                {/*        Submit*/}
                {/*    </button>*/}
                {/*</form>*/}
            </div>
        </div>
    )
}

export default login
