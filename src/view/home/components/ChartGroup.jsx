

import { Row, Col  } from 'tdesign-react';
import RaddarChart from "@/view/home/components/RaddarChart.jsx";
import PieChart from "@/view/home/components/PieChart.jsx";
import BarChart from "@/view/home/components/BarChart.jsx";

const ChartGroup = ()=>{


    return(
        <Row gutter={32} >
            <Col xs={12}  sm={12} lg={4}>
                <div className="chart-wrapper">
                    <RaddarChart />
                </div>
            </Col>
            <Col xs={12}  sm={12} lg={4}>
                <div className="chart-wrapper">
                    <PieChart />
                </div>
            </Col>
            <Col xs={12}  sm={12} lg={4}>
                <div className="chart-wrapper">
                    <BarChart />
                </div>
            </Col>
        </Row>
    )

}

export default ChartGroup
