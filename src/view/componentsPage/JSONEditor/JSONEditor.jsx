

import './JSONEditor.less'
import Jsoneditor from "@/components/demos/jsoneditor.jsx";
const jsonData = '[{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"CORN"}],"name":""},{"items":[{"market_type":"forexdata","symbol":"XAUUSD"},{"market_type":"forexdata","symbol":"XAGUSD"},{"market_type":"forexdata","symbol":"AUTD"},{"market_type":"forexdata","symbol":"AGTD"}],"name":"贵金属"},{"items":[{"market_type":"forexdata","symbol":"CORN"},{"market_type":"forexdata","symbol":"WHEAT"},{"market_type":"forexdata","symbol":"SOYBEAN"},{"market_type":"forexdata","symbol":"SUGAR"}],"name":"农产品"},{"items":[{"market_type":"forexdata","symbol":"UKOIL"},{"market_type":"forexdata","symbol":"USOIL"},{"market_type":"forexdata","symbol":"NGAS"}],"name":"能源化工"}]'
const JSONEditor = () =>{
    const editorData = JSON.parse(jsonData)



    return (
        <div className="components-container custom-scrollbar">
            <aside>Json-Editor is base on &nbsp;
                <a href="https://github.com/codemirror/CodeMirror"
                                             target="_blank">CodeMirrorr</a>. Lint
                base on &nbsp;
                <a href="https://github.com/codemirror/CodeMirror/blob/master/addon/lint/json-lint.js"
                    target="_blank"
                >json-lint</a>.
            </aside>
            <div className="editor-container">
                <Jsoneditor data={editorData} />
            </div>
        </div>
    )
}

export default JSONEditor;
