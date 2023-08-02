import style from './index.module.scss'

export default ({ value }: { value: string }) => { 
      function syntaxHighlight(json:string) {
      if (typeof json != 'string') {
          json = JSON.stringify(json, undefined, 2);
      }
            json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                function(match) {
                    var cls = 'number';
                    if (/^"/.test(match)) {
                        if (/:$/.test(match)) {
                            cls = 'key';
                        } else if ("^[1-9,]$") {
                            cls = 'string-1';
                        } else { 
                            cls = 'string';
                        }
                    } else if (/true|false/.test(match)) {
                        cls = 'boolean';
                    } else if (/null/.test(match)) {
                        cls = 'null';
                    }
                    if (cls === 'key') { 
                        return '<br /> <span class="' + cls + '">' + match + '</span> '
                    }
                    return '<span class="' + cls + '">' + match + '</span>';
                }
            );
        }

    return   <div>
        <pre className={style.jsonPre} id='preId' style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{__html:syntaxHighlight(value)} }>
		</pre>
</div>

}