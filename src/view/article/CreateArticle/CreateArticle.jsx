import { Form, Input, Radio, Checkbox, Button, Rate, MessagePlugin, DatePicker, Tooltip, Space } from 'tdesign-react';
import Tinymce from "@/view/article/CreateArticle/Tinymce.jsx";
import './CreateArticle.less'
import {useState, useEffect, useRef} from "react";
const { FormItem } = Form;
import { useLocation } from 'react-router-dom';
import LocalStore from '@/common/LocalStore';

function CreateArticle() {
    const [form] = Form.useForm();
    const name = Form.useWatch('title', form);
    const summary = Form.useWatch('summary', form);
    const time = Form.useWatch('time', form);
    const author = Form.useWatch('author', form);
    const importance = Form.useWatch('importance', form);
    const [TinymceContent,setTinymceContent] = useState('');
    const TinymceRef = useRef(null);
    const location = useLocation();
    console.log(location,'location');
    const state = location.state;
    const store = new LocalStore();
    let ArticleListData = []
    let status = ''
    store.getItem('ArticleList').then((data) => {
        console.log(data);
        ArticleListData = data
    })
    let initialData = {...state}

    useEffect(()=>{
        if(state?.ID) {
            if(state.TinymceContent){
                if(state.TinymceContent && TinymceRef.current){
                    TinymceRef.current.setTinymceContent(state.TinymceContent)
                }
            }
        }
    },[TinymceRef.current])
    const onSubmit = (e) => {
        console.log(e);
        if (e.validateResult === true) {
            MessagePlugin.info('提交成功');
            if(state?.ID){
                ArticleListData.forEach((item,index) => {
                    if(item.ID === state.ID){
                        ArticleListData[index] = {...e.fields,TinymceContent,ID:item.ID,status};
                    }
                })
            }else {
                ArticleListData.push({...e.fields,TinymceContent,ID:ArticleListData.length+1,status})
            }
            store.setItem('ArticleList', ArticleListData)
        }
    };
    const onReset = (e) => {
        console.log(e,TinymceRef.current,);
        setTinymceContent('')
        if(TinymceRef.current){
            TinymceRef.current.setTinymceContent('')
        }
        MessagePlugin.info('重置成功');
    };
    const getTinymceContent = (data)=>{
        setTinymceContent(data);
        console.log(data);
    }
    const rules = {
        title: [
            {
                required: true,
                message: '必填',
                type: 'error',
            },
        ],
    };
    return (
        <div className="createPost-container">

            <Form initialData={initialData}
                  form={form}
                  onSubmit={onSubmit}
                  onReset={onReset} colon
                  labelWidth={100}
                  rules={rules}>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem'}}>
                    <FormItem>
                        {state?.ID ?  <Space direction="inline">
                                <Button
                                    size="medium"
                                    theme="success"
                                    variant="base"
                                    onClick={()=> {
                                        MessagePlugin.success('发布文章成功');
                                        status = 'published';
                                    }}
                                >
                                    published
                                </Button>
                                <Button size="medium" theme="warning" variant="base"
                                        type="submit"
                                        onClick={() => {
                                            status = 'draft '
                                        }}
                                >
                                    draft
                                </Button>
                            </Space> :
                        <Space direction="inline">
                           <Button
                                size="medium"
                                type="reset"
                                variant="base"
                            >
                                重置
                            </Button>
                            <Button size="medium" theme="warning" variant="base" type="submit">
                                提交
                            </Button>
                        </Space>}
                    </FormItem>
                </div>
                <FormItem label="Title" name="title">
                    <Input/>
                </FormItem>
                <Space direction="inline">
                    <FormItem label="Author" name="author">
                        <Input/>
                    </FormItem>
                    <FormItem label="Publish Time" name="time">
                        <DatePicker
                            size="medium"
                            format="YYYY-MM-DD"
                            status="default"
                        />
                    </FormItem>
                    <FormItem label="Importance" name="importance">
                        <Rate />
                    </FormItem>
                </Space>
                <FormItem style={{paddingTop: '1rem'}} label="Summary" name="summary">
                    <Input/>
                </FormItem>
            </Form>
            <div className="tinymce-container">
                <Tinymce ref={TinymceRef} getTinymceContent={getTinymceContent} />
            </div>
        </div>
    )
}

export default CreateArticle;