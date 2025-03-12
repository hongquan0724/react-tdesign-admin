import {useEffect, useRef} from "react";
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

const jsoneditor = ({data}) => {
    const textRef = useRef(null)
    let jsonEditor = null
    useEffect(() => {
        if(textRef.current && !jsonEditor){
            jsonEditor =  CodeMirror.fromTextArea(textRef.current, {
                lineNumbers: true,
                mode: 'application/json',
                gutters: ['CodeMirror-lint-markers'],
                theme: 'rubyblue',
                lint: true
            })
            jsonEditor.setValue(JSON.stringify(data, null, 2))
        }
        return ()=>jsonEditor
    }, []);

    return (
        <div className="json-editor">
            <textarea ref={textRef} />
        </div>
    )
}

export default jsoneditor
