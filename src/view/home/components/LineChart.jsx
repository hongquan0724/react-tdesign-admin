
import * as echarts from 'echarts'
import {useEffect, useRef, memo, useState} from 'react';
import {GlobalEvent} from "@/common/event.js";


let chart  = null
const LineChart = ({chartData})=>{

    const ChartRef = useRef(null)
    const setOptions = ({ expectedData, actualData } = {})=>{
        chart.setOption({
            xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                boundaryGap: false,
                axisTick: {
                    show: false
                }
            },
            grid: {
                left: 10,
                right: 10,
                bottom: 20,
                top: 30,
                containLabel: true
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                },
                padding: [5, 10]
            },
            yAxis: {
                axisTick: {
                    show: false
                }
            },
            legend: {
                data: ['expected', 'actual']
            },
            series: [{
                name: 'expected', itemStyle: {
                    normal: {
                        color: '#FF005A',
                        lineStyle: {
                            color: '#FF005A',
                            width: 2
                        }
                    }
                },
                smooth: true,
                type: 'line',
                data: expectedData,
                animationDuration: 2800,
                animationEasing: 'cubicInOut'
            },
                {
                    name: 'actual',
                    smooth: true,
                    type: 'line',
                    itemStyle: {
                        normal: {
                            color: '#3888fa',
                            lineStyle: {
                                color: '#3888fa',
                                width: 2
                            },
                            areaStyle: {
                                color: '#f3f8ff'
                            }
                        }
                    },
                    data: actualData,
                    animationDuration: 2800,
                    animationEasing: 'quadraticOut'
                }]
        },true)
    }

    useEffect(()=>{
        chart = echarts.init(ChartRef.current, 'macarons')
        setOptions(chartData)
        return ()=>{
            chart && chart.dispose()
        }
    },[])
    useEffect(() => {
        if(ChartRef.current){
            chart = echarts.init(ChartRef.current, 'macarons')
            setOptions(chartData)
            GlobalEvent.off(ChartRef.current,'resize')
            GlobalEvent.on(ChartRef.current,'resize',chart.resize)
        }
    }, [chartData]);



    return (
        <div ref={ChartRef}  className="line-chart" style={{width:'100%',height:'350px'}}></div>
    )

}

export default LineChart
