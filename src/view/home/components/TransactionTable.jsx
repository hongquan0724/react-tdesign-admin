import {  Table , Tag } from 'tdesign-react';
import {toThousandFilter} from "@/common/utils.js";
import {useEffect, useState} from "react";
import api from "@/api/api.js";
const TransactionTable = () => {
    const [tableData,setTableData] = useState([])
    function  orderNoFilter(str) {
        return str.substring(0, 30)
    }
    const columns = [
        {
            colKey: 'order_no',
            title: 'Order_No',
            ellipsis: true,
            minWidth:"200",
            cell: ({ row }) => (
                orderNoFilter(row.order_no)
            )
        },
        {
            colKey: 'price',
            title: 'Price',
            ellipsis: true,
            width:"195",
            cell: ({ row }) => (
                <>
                    ¥{toThousandFilter(row.price)}
                </>
            )
        },
        {
            colKey: 'status',
            title: 'Status',
            ellipsis: true,
            width:"100",
            cell: ({ row }) => (
                <Tag theme={row.status == 'success' ? row.status : 'danger'} >{row.status} </Tag>
            )
        },
    ]

    useEffect(()=>{

        api.home.tablelisturl().then((res)=>{
            // console.log(res.data);
            setTableData(res.data.items)
        })

        return ()=>{
            return tableData
        }
    },[])



    return (
        <div className="transaction-table-container">
            <Table rowKey="index" height={550} data={tableData} columns={columns}/>
        </div>
    )
}

export default TransactionTable
