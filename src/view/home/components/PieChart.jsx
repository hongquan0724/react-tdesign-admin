import {useEffect, useRef} from "react";
import * as echarts from "echarts";
import {GlobalEvent} from "@/common/event.js";

let chart  = null

const PieChart = () => {
    const ChartRef = useRef(null)
    const setOptions = ({ expectedData, actualData } = {})=>{
        chart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                left: 'center',
                bottom: '10',
                data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
            },
            series: [
                {
                    name: 'WEEKLY WRITE ARTICLES',
                    type: 'pie',
                    roseType: 'radius',
                    radius: [15, 95],
                    center: ['50%', '38%'],
                    data: [
                        { value: 320, name: 'Industries' },
                        { value: 240, name: 'Technology' },
                        { value: 149, name: 'Forex' },
                        { value: 100, name: 'Gold' },
                        { value: 59, name: 'Forecasts' }
                    ],
                    animationEasing: 'cubicInOut',
                    animationDuration: 2600
                }
            ]
        },true)
    }
    useEffect(()=>{
        // chart = echarts.init(ChartRef.current, 'macarons')
        if(ChartRef.current){
            chart = echarts.init(ChartRef.current, 'macarons')
            GlobalEvent.off(ChartRef.current,'resize')
            GlobalEvent.on(ChartRef.current,'resize',chart.resize)
        }
        setOptions()
        return ()=>{
            chart && chart.dispose()
        }
    },[])

    return (
        <div ref={ChartRef} style={{width:'100%',height:'300px'}}></div>
    )
}


export default PieChart
