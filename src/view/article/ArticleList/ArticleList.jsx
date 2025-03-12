
import LocalStore from '@/common/LocalStore';
import {Table, Tag, Button} from "tdesign-react";
import {useContext, useState} from "react";
import {EditIcon,StarIcon} from "tdesign-icons-react";
import './ArticleList.less'
import {useNavigate} from "react-router-dom";
import {AppContext} from "@/App.jsx";

function ArticleList() {
    const {providerVal,setProviderVal,MenuList,MenuDispatch} = useContext(AppContext)
    const _data = []
    for (let i = 0; i < 20; i++) {
        _data.push({
            ID: i + 1,
            author: ['Paul','Thomas','Brenda','Kenneth','Sandra','Cynthia','Melissa','Matthew'][i % 8],
            status:['published','draft',][i % 2],
            importance:[1,2,3][i % 3],
            title:['An approachable, performant and versatile framework for building web user interfaces',
                'The library for web and native user interfaces',
                'Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.',
                'Vite is a blazing fast frontend build tool powering the next generation of web applications.'][i % 4],
            time: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01','2022-06-01','2022-07-01'][i % 7],
        });
    }
    const navigator = useNavigate()
    const [tableData,setTableData] = useState(_data);
    const [total, setTotal] = useState(20);
    const store = new LocalStore();
    store.getItem('ArticleList').then((data) => {
        if (data && data.length > 0) {
            setTableData(data);
            setTotal(data.length);
        }else {
            store.setItem('ArticleList', _data);
        }
    })
    const onEdit = (row)=>{
        const _menu =    {
                MenuName:'编辑文章',
                MenuCode:'A005003',
                IsShow:'1',
                Icon:'',
                Closeable:'1',
                MenuUrl:'article/EditArticle',
                type:'added'
            }
            MenuDispatch(_menu);
            setProviderVal({...providerVal,curMenuActive:_menu})
            navigator('/article/EditArticle' ,{state: row});

    }


    const columns = [
        {
            colKey: 'ID',
            title: 'ID',
            align:'center',
            width:30
        },
        {
            colKey: 'time',
            title: '创建时间',
            align:'center',
            width: 100,
        },

        {
            colKey: 'author',
            title: '作者',
            align:'center',
            width: 100,

        },
        {
            colKey: 'importance',
            title: '重要性',
            width: 150,
            cell:({row})=>{
                const dom = []
                for (let i = 0; i < +row.importance; i++) {
                    dom.push(<StarIcon key={i} style={{color:'green'}} />);
                }
                return dom
            }

        },
        {
            colKey: 'status',
            title: '状态',
            align:'center',
            width: 50,
            cell: ({ row }) => (
                <Tag theme={row.status === 'draft' ? 'default' :'success'} variant="light">
                    {row.status}
                </Tag>

            ),
        },
        {
            colKey: 'title',
            title: '标题',
            width: 200,
        },
        {
            colKey: 'operation',
            title: '操作',
            align:'center',
            cell: ({ row }) => (
                <Button icon={<EditIcon />} theme="primary" onClick={()=>onEdit(row)}>
                    编辑
                </Button>
            ),
            width: 60,
        },
    ]

    const table = (
        <Table
            style={{height:'100%'}}
            bordered
            maxHeight={'calc( 100% - 64px)'}
            rowKey="index"
            data={tableData}
            lazyLoad
            pagination={{
                defaultPageSize: 10,
                total
            }}
            columns={columns}
        />
    );


    return (
        <div className='ArticleList-container'>
            {table}
        </div>
    )
}


export default  ArticleList