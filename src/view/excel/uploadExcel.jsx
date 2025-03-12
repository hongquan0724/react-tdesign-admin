
import {useEffect, useState,} from "react";
import {Upload, MessagePlugin, Table} from 'tdesign-react';
import ExcelJS from "exceljs";
function uploadExcel(){
    const [files, setFiles] = useState([]);
    const [theme, setTheme] = useState('file');
    const [autoUpload, setAutoUpload] = useState(false);
    const [columns,setColumns] = useState([]);
    const [tableData,setTableData] = useState([]);
    let table = null
    const onFail = () => {
        MessagePlugin.error('上传失败');
    };
    const onSuccess = () => {
        MessagePlugin.success('上传成功');
    };
    const onChange =  (value) => {
        console.log(value);
        const reader = new FileReader();
        reader.onload = async function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = new ExcelJS.Workbook();
            // 加载 Excel 文件
            await workbook.xlsx.load(data);
            // 遍历所有工作表
            const worksheet = workbook.getWorksheet(1);
            const columns = [];
            const tableData = [];
            // 遍历每一行
            worksheet.eachRow((row, rowNumber) => {
                const rowdata = {};
                row.eachCell((cell, colNumber) => {
                    if (rowNumber === 1){
                        if(cell.text === 'index'){
                            columns.push({
                                colKey: 'index',
                                title: '序号',
                                width:60
                            })
                        }else {
                            columns.push({
                                colKey: colNumber,
                                title: cell.text,
                            })
                        }
                    }else {
                        rowdata[colNumber === 2 ?'index' : colNumber]= cell.text
                    }
                });
                if(rowNumber >1){
                    tableData.push(rowdata)
                }
                console.log(tableData,'tableData');
            });
            console.log(columns);
            setColumns(columns);
            setTableData(tableData);
        };
        reader.readAsArrayBuffer(value[0].raw);
    }
    table = (
        <Table
            bordered
            rowKey="index"
            data={tableData}
            lazyLoad
            columns={columns}
        />
    );
    return (
        <div className="excel-container custom-scrollbar">
            <div className="upload-container">
                <Upload
                    theme={theme}
                    autoUpload={autoUpload}
                    draggable
                    files={files}
                    onChange={onChange}
                    onFail={onFail}
                    onSuccess={onSuccess}
                    // use fileListDisplay to define any file info
                    // fileListDisplay={({ files }) => <div>{JSON.stringify(files)}</div>}
                />
            </div>
            <div className="table-container">
                {table}
            </div>
        </div>
    )
}

export default uploadExcel;