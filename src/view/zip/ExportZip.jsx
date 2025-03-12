import {Button, Input, Space, Table, Tag} from "tdesign-react";
import {CatalogIcon} from "tdesign-icons-react";
import {useState} from "react";
import './zip.less'
import {export_txt_to_zip} from "@/common/utils.js";

function ExportZip() {
    const [inputValue, setInputValue] = useState('');
    const data = []
    for (let i = 0; i < 10; i++) {
        data.push({
            index: i + 1,
            title: '这是一段标题'+i,
            name:['vue','react','node','jquery'][i % 4],
            remark:['An approachable, performant and versatile framework for building web user interfaces',
                'The library for web and native user interfaces',
                'Node.js® is a free, open-source, cross-platform JavaScript runtime environment that lets developers create servers, web apps, command line tools and scripts.',
                'Vite is a blazing fast frontend build tool powering the next generation of web applications.'][i % 4],
            createTime: ['2022-01-01', '2022-02-01', '2022-03-01', '2022-04-01', '2022-05-01','2022-06-01','2022-07-01'][i % 7],
        });
    }
    const columns = [
        {
            colKey: 'index',
            title: '序号',
            width:60
        },
        {
            colKey: 'title',
            title: '标题',
            width: 100,
            fixed: 'left',
        },
        {
            colKey: 'name',
            title: '名称',
            width: 100,
            fixed: 'left',
            cell: ({ row }) => (
                <Tag theme="primary" variant="light">
                    {row.name}
                </Tag>
            ),
        },
        {
            colKey: 'remark',
            title: '备注',
            width: 200,
        },
        {
            colKey: 'createTime',
            title: '创建时间',
            width: 100,
        },
    ]
    const exportZip = ()=>{
        const header = columns.map(_=>_.title);
        const headerKeys = columns.map(_=>_.colKey);
        const jsondata = data.map(d=>headerKeys.map(h=>d[h]));
        export_txt_to_zip(header, jsondata, inputValue, inputValue);
    }
    const table = (
        <Table
            bordered
            rowKey="index"
            data={data}
            lazyLoad
            columns={columns}
        />
    );
    return(
        <div className="zip-container custom-scrollbar">
            <Space>
                <label className="form-label">文件名:</label>
                <Input
                    style={{width:'300px'}}
                    value={inputValue}
                    placeholder="导出文件名称(默认default)"
                    onChange={(value) => {
                        setInputValue(value)
                    }}
                />
                <Button
                    size="medium"
                    type="button"
                    variant="base"
                    icon={<CatalogIcon />}
                    onClick={exportZip}
                >
                    导出
                </Button>
            </Space>
            <div className="table-container">
                {table}
            </div>
        </div>
    )
}

export default ExportZip;