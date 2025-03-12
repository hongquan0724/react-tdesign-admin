import {Button,Guide} from "tdesign-react";
import {MapConnectionIcon} from "tdesign-icons-react";
import {useEffect, useState} from "react";

const classStyles = `
<style>
.guide-container {
  max-width: 600px;
  padding: 40px;
}

.title-major {
  color: var(--td-text-color-primary);
  font-size: 36px;
  font-weight: 700;
  line-height: 44px;
}

.title-sub {
  margin-top: 8px;
  color: var(--td-text-color-secondary);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.field {
  margin-top: 50px;
}

.label {
  margin-bottom: 8px;
  color: var(--td-text-color-primary);
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
}

.action {
  display: inline-flex;
  margin-top: 50px;
}

.action button:first-child {
  margin-right: 10px;
}
</style>
`;

function GuidePage(){
    useEffect(() => {
        // 添加示例代码所需样式
        document.head.insertAdjacentHTML('beforeend', classStyles);
    }, []);
    const [current, setCurrent] = useState(-1);
    const [steps, setState] = useState([
            {
                element: '.main-menu-container',
                title: '左侧导航菜单',
                body :'点击菜单跳转对应页面，菜单可折叠',
                placement: 'right',
            },
            {
                element: '.fold-btn',
                title: '折叠菜单按钮',
                body :'点击按钮菜单可折叠或展开',
            },
            {
                element: '.main-content-container',
                title: '头部导航栏',
                body:'可查看打开页面名称，点击可跳转对应页面'
            },
            {
                element: '.user-container',
                title: '用户信息',
                body:'可退出页面，回到登录页'
            },
        ])
    const handleChange = (current, { e, total }) => {
        setCurrent(current);
        console.log(current, e, total);
    };
    const handlePrevStepClick = ({ e, prev, current, total }) => {
        console.log(e, prev, current, total);
    };
    const handleNextStepClick = ({ e, next, current, total }) => {
        console.log(e, next, current, total);
    };
    const handleFinish = ({ e, current, total }) => {
        console.log(e, current, total);
    };
    const handleSkip = ({ e, current, total }) => {
        console.log('skip');
        console.log(e, current, total);
    };
    const buttonClick = ()=>{
        setCurrent(0);
    }
    return (
        <div className="components-container">
            <aside>
                引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本 Demo 是基于
                <a href="https://tdesign.tencent.com/react/components/guide" target="_blank">tdesign</a>
            </aside>
            <Button
                size="medium"
                type="button"
                variant="base"
                icon={<MapConnectionIcon />}
                onClick={buttonClick}
            >
                打开引导
            </Button>
            <Guide
                current={current}
                steps={steps}
                onChange={handleChange}
                onPrevStepClick={handlePrevStepClick}
                onNextStepClick={handleNextStepClick}
                onFinish={handleFinish}
                onSkip={handleSkip}
            />
        </div>
    )
}
export default GuidePage