
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { useContext, useMemo } from "react";
import FilscanState from "@/store/content";



export default (props: any) => {
      const filscanStore: any = useContext(FilscanState);

    const showValue = useMemo(() => {
        return props.value || 'test value';
    }, [props.value]);

    const theme = useMemo(() => { 
        if (filscanStore.filscan.theme === 'dark') { 
            return 'monokai'
        }
        return 'github'
    },[filscanStore.filscan.theme])

    return <AceEditor
              mode="java"
        style={{width:'100%'}}
        theme={theme}
        name="blah2"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={showValue}
        setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
        }} />
}