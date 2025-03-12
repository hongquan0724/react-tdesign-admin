


import { Row, Col  } from 'tdesign-react';
import TransactionTable from "@/view/home/components/TransactionTable.jsx";
import TodoList from "@/view/home/components/TodoList/TodoList.jsx";
import BoxCard from "@/view/home/components/BoxCard.jsx";

const HomeInfoGroup = () => {

    return(
        <Row gutter={8}>
            <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <TransactionTable />
            </Col>
            <Col xs={12} sm={12} md={6} lg={3} xl={3}>
                <TodoList />
            </Col>
            <Col xs={12} sm={12} md={6} lg={3} xl={3}>
                <BoxCard />
            </Col>
        </Row>
    )
}

export default HomeInfoGroup
