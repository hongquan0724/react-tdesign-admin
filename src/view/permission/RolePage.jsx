
import './RolePage.less'
import {Row, Col, Button, Table, Space, DialogPlugin, Form, Input, Textarea, Dialog,Tree} from 'tdesign-react'
import {EditIcon, DeleteIcon} from "tdesign-icons-react";
import {useEffect, useState} from "react";
import api from "@/api/api.js";
const { FormItem } = Form;
let currentEidt = {}
let treeslist = []
function RolePage() {
    const [tableData,setTableData] = useState([
        {key:'admin',name:"admin",description:'Super Administrator. Have access to view all pages.'},
        {key:'editor',name:"editor",description:'Normal Editor. Can see all pages except permission page'},
        {key:'visitor',name:"visitor",description:'Just a visitor. Can only see the home page and the document page'},
    ])
    const [treeItems,setTreeItems] = useState([])
    const [treeValues,setTreeValues] = useState([])
    const [visible, setVisible] = useState(false);
    const [header,setHeader] = useState('新增角色');
    const [form] = Form.useForm();
    const name = Form.useWatch('name', form);
    const description = Form.useWatch('description', form);
    const onDelete = (row,index)=>{
       const confirmDia = DialogPlugin.confirm({
            header: 'Warning',
            body: 'Confirm to remove the role?',
            confirmBtn: 'Confirm',
            cancelBtn: 'cancel',
            onConfirm: ({ e }) => {
                console.log('confirm button has been clicked!');
                console.log('e: ', e);
                const data = JSON.parse(JSON.stringify(tableData))
                data.splice(index, 1)
                setTableData(
                    data
                );
                console.log(data);
                confirmDia.hide();
            },
            onClose: ({ e, trigger }) => {
                console.log('e: ', e);
                console.log('trigger: ', trigger);
                confirmDia.hide();
            },
        });
    }

    const onEdit = (row)=>{
        setHeader('Edit Role')
        form.setFieldsValue?.({...row})
        setVisible(true);
        if(row.key === 'admin' && !row.trees){
            setTreeValues(treeslist.map(_=>_.value));
        } else {
            setTreeValues(row.trees || []);
        }
        currentEidt = row
    }
    const treesFun = (list)=>{
        for (const listItem of list) {
            if(listItem.SubMenuList && listItem.SubMenuList.length>0){
                Object.assign(listItem,{value:listItem.MenuCode,label:listItem.MenuName,children:treesFun(listItem.SubMenuList)})
            }else {
                Object.assign(listItem,{value:listItem.MenuCode,label:listItem.MenuName})
            }
        }
        return list
    }
    useEffect(()=>{
        api.menu.menulisturl({}).then((res)=>{
             treeslist = treesFun(res.MenuList)
            setTreeItems(treeslist);
        })
        // console.log(menulist);
        return ()=>treeItems
    },[])
    const columns = [
        {
            colKey: 'key',
            title: 'Role Name',
            align:'center',
            width:220
        },
        {
            colKey: 'name',
            title: 'Role Name',
            align:'center',
            width: 220,
        },

        {
            colKey: 'description',
            title: 'Description',
            align:'center',
        },
        {
            colKey: 'operation',
            title: 'Operations',
            align:'center',
            cell: ({ row,rowIndex }) => (
                <Space>
                    <Button icon={<EditIcon />} theme="primary" onClick={()=>onEdit(row)}>
                        编辑权限
                    </Button>
                    <Button icon={<DeleteIcon />} theme="primary" onClick={()=>onDelete(row,rowIndex)}>
                        删除
                    </Button>
                </Space>
            ),
        },
    ]

    const addRole = ()=>{
        setHeader('New Role');
        setVisible(true);
        form.setFieldsValue?.({name:'',description:''})
        setTreeValues([]);
        currentEidt = {}
    }
    const onConfirm = (context) => {
        console.log('点击了确认按钮', context);
        setVisible(false);
        const _data = JSON.parse(JSON.stringify(tableData));
        if(currentEidt.key){
            currentEidt.trees = treeValues
            _data.forEach(item=>{
                if(item.key === currentEidt.key) {
                    Object.assign(item,currentEidt)
                }
            })
        }else {
            _data.push({key:'test'+_data.length,name,description,trees:treeValues});
        }
        setTableData(_data);
    };
    const onCancel = (context) => {
        console.log('点击了取消按钮', context);
    };
    const onClickCloseBtn = (context) => {
        console.log('点击了关闭按钮', context);
    };
    const onKeydownEsc = (context) => {
        console.log('按下了ESC', context);
    };
    const onClickOverlay = (context) => {
        console.log('点击了蒙层', context);
    };
    const handleClose = (context) => {
        console.log('关闭弹窗，点击关闭按钮、按下ESC、点击蒙层等触发', context);
        setVisible(false);
    };
    const handleChange = (checked, context) => {
        console.info('onChange:', checked, context);
        setTreeValues(checked)
    };
    const handleClick = (context) => {
        console.info('onClick:', context);
    };
    const table = (
        <Table
            bordered
            data={tableData}
            lazyLoad
            columns={columns}
        />
    );
    return(
        <div className="rolePage-container">
            <Row>
                <Col span={4}>
                    <Button type="primary" onClick={addRole}>新增角色</Button>
                </Col>
            </Row>
            <div className="table-container">
                {table}
            </div>
            <Dialog
                style={{width:'1000px'}}
                header={header}
                visible={visible}
                confirmOnEnter
                onClose={handleClose}
                onConfirm={onConfirm}
                onCancel={onCancel}
                onEscKeydown={onKeydownEsc}
                onCloseBtnClick={onClickCloseBtn}
                onOverlayClick={onClickOverlay}
            >
                <Form
                    form={form}
                    labelAlign="right"
                    layout="vertical"
                    showErrorMessage
                >
                    <FormItem
                        label="Name"
                        name="name"
                    >
                        <Input placeholder="请输入内容" />
                    </FormItem>
                    <FormItem
                        label="Desc"
                        name="description"
                    >
                        <Textarea placeholder="请输入内容" />
                    </FormItem>
                    <FormItem   label="Menus" name="trees">

                    </FormItem>
                    <Tree
                        expandAll
                        hover
                        value={treeValues}
                        data={treeItems}
                        checkable={true}
                        onChange={handleChange}
                        onClick={handleClick}
                    />
                </Form>

            </Dialog>
        </div>
    )
}
export default RolePage;