
import { Row, Col, Statistic  } from 'tdesign-react';
import "./PanelGroup.less"
import {useState} from "react";


const PanelGroup = ({handleSetLineChartData}) => {

    const cardClick = (e,type)=>{
        handleSetLineChartData(type)
    }
    return(
        <div className="panel-group-container">
            <Row gutter={40}>
                <Col xs={12} sm={6} lg={3} >
                    <div className="card-panel" onClick={(e)=>cardClick(e,'newVisitis')}>
                        <div className="card-panel-icon-wrapper icon-people">
                            <img className="svg-icon" src={import.meta.env.BASE_URL+'img/svg/peoples.svg'} />
                        </div>
                        <div className="card-panel-description">
                            <div className="card-panel-text">
                                New Visits
                            </div>
                            <Statistic value={102400}
                                       decimalPlaces={0}
                               />
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <div className="card-panel" onClick={(e)=>cardClick(e,'messages')}>
                        <div className="card-panel-icon-wrapper icon-message">
                            <img className="svg-icon" src={import.meta.env.BASE_URL+'img/svg/message.svg'}/>
                        </div>
                        <div className="card-panel-description">
                            <div className="card-panel-text">
                                Messages
                            </div>
                            <Statistic value={81212} />
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <div className="card-panel" onClick={(e)=>cardClick(e,'purchases')}>
                        <div className="card-panel-icon-wrapper icon-people">
                            <img className="svg-icon" src={import.meta.env.BASE_URL+'img/svg/money.svg'} />
                        </div>
                        <div className="card-panel-description">
                            <div className="card-panel-text">
                                Purchases
                            </div>
                            <Statistic value={9280}
                                       decimalPlaces={0}
                            />
                        </div>
                    </div>
                </Col>
                <Col xs={12} sm={6} lg={3}>
                    <div className="card-panel" onClick={(e) => cardClick(e, 'shoppings')}>
                        <div className="card-panel-icon-wrapper icon-people">
                            <img className="svg-icon" src={import.meta.env.BASE_URL+'img/svg/shopping.svg'}/>
                        </div>
                        <div className="card-panel-description">
                            <div className="card-panel-text">
                                Shoppings
                            </div>
                            <Statistic value={13600}
                                       decimalPlaces={0}
                            />
                        </div>
                    </div>
                </Col>
            </Row>


        </div>
    )
}
export default PanelGroup
