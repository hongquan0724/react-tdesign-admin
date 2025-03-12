

import "./PanThumb.less"
import classNames from "classnames";
const PanThumb = ({image,className}) => {
    const PanStyle = {
        backgroundImage:`url(${image})`
    }
    return(
        <div className={classNames("pan-thumb-container",className)}>
            <div className="pan-info">
                <div className="pan-info-roles-container">
                </div>
            </div>
            <div style={PanStyle} className="pan-thumb"></div>
        </div>
    )

}


export default PanThumb
