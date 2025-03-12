import Home from "@/view/home/home.jsx";
import NotFound from "@/view/errorPage/errorPage.jsx";
import JSONEditor from "@/view/componentsPage/JSONEditor/JSONEditor.jsx";
import UploadPage from "@/view/componentsPage/UploadPage/UploadPage.jsx";
import DragBoardPage from "@/view/componentsPage/DragBoardPage/DragBoardPage.jsx";
import Keyboard from "@/view/charts/Keyboard.jsx";
import MixChart from "@/view/charts/MixChart.jsx";
import LineMarker from "@/view/charts/LineMarker.jsx";
import CreateArticle from "@/view/article/CreateArticle/CreateArticle.jsx";
import ExportExcel from "@/view/excel/exportExcel.jsx";
import UploadExcel from "@/view/excel/uploadExcel.jsx";
import ExportZip from "@/view/zip/ExportZip.jsx";
import GuidePage from "@/view/guide/guide.jsx";
import ArticleList from "@/view/article/ArticleList/ArticleList.jsx";
import RolePage from "@/view/permission/RolePage.jsx";
import OpenLayers from "@/view/map/OpenLayers/OpenLayers.jsx";
import TinymcePage from "@/view/componentsPage/Tinymce/TinymcePage.jsx";
const pageMap = {
    'home':<Home />,
    '*':<NotFound />,
    'errorPage':<NotFound />,
    'TinymcePage':<TinymcePage />,
    'JSONEditor':<JSONEditor />,
    'upload':<UploadPage />,
    'DragBoard':<DragBoardPage />,
    'Keyboard':<Keyboard />,
    'MixChart':<MixChart />,
    'LineMarker':<LineMarker />,
    'CreateArticle':<CreateArticle />,
    'ArticleList':<ArticleList />,
    'EditArticle':<CreateArticle />,
    'exportExcel':<ExportExcel />,
    'uploadExcel':<UploadExcel />,
    'ExportZip':<ExportZip />,
    'guide':<GuidePage />,
    'role':<RolePage />,
    'OpenLayers':<OpenLayers />,

}
export default pageMap
