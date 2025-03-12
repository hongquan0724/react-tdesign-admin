import BasicUploadFiles from "@/view/componentsPage/UploadPage/component/BasicUploadFiles.jsx";
import BasicImageUpload from "@/view/componentsPage/UploadPage/component/BasicImageUpload.jsx";
import { Space } from 'tdesign-react';
import BatchUploadOfFiles from "@/view/componentsPage/UploadPage/component/BatchUploadOfFiles.jsx";
import BatchImageUpload from "@/view/componentsPage/UploadPage/component/BatchImageUpload.jsx";

const UploadPage = () => {
    return (
        <div className="components-container custom-scrollbar" >
            <Space direction="vertical" style={{width:'100%'}}>
                <BasicUploadFiles />
                <BasicImageUpload />
                <BatchUploadOfFiles />
                <BatchImageUpload />
            </Space>

        </div>
    )
}
export default UploadPage
