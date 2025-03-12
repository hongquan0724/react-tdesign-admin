import PanelGroup from "@/view/home/components/PanelGroup.jsx";
import { Row, Col  } from 'tdesign-react';
import LineChart from "@/view/home/components/LineChart.jsx";
import {useState} from "react";
import ChartGroup from "@/view/home/components/ChartGroup.jsx";


import './home.less'
import HomeInfoGroup from "@/view/home/components/HomeInfoGroup.jsx";
const lineChartData = {
    newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
    }
}
const home = () =>{
    const [curChartData,SetCurChartData] = useState(lineChartData.newVisitis)
    const handleSetLineChartData = (name)=>{
        console.log(name,'name')
        SetCurChartData(lineChartData[name])
    }
    const lineEchartStyle = {background:'#fff',padding:'16px 16px 0',marginBottom:'32px'}
    return (
        <div className="page-home-container custom-scrollbar">
            <PanelGroup handleSetLineChartData={handleSetLineChartData} />
            <Row style={lineEchartStyle}>
                <LineChart chartData={curChartData}/>
            </Row>
            <ChartGroup />
            <HomeInfoGroup />
        </div>
    )
}

export default home;
