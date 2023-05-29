
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { useMemo } from "react";



export default (props: any) => {
    
    const showValue = useMemo(() => {
        return props.value || 'test value';
    }, [props.value]);

    return <AceEditor
        className='ace-update-editor'
        mode="java"
        style={{width:'100%'}}
        theme="github"
        name="blah2"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={showValue}
        setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
        }} />
}