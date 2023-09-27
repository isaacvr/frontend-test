import { useRef, useState, useEffect } from 'react';

export default function TextArea({ disable, placeholder }: any) {
  const cedit = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const [ value, setValue ] = useState('');
  
  function focus() {
    cedit.current?.blur();

    if ( disable ) return;

    textarea.current?.focus();
  }

  function isURL(str: string): boolean {
    // Decompose url string in parts (protocol, domain, ip, port, query and fragment)
    let urlRegex = new RegExp('^(https?:\\/\\/)?'+
	    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
	    '((\\d{1,3}\\.){3}\\d{1,3}))'+
	    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
	    '(\\?[;&a-z\\d%_.~+=-]*)?'+
	    '(\\#[-a-z\\d_]*)?$','i');
    return urlRegex.test(str);
  }

  function strToHTML(str: string): string {
    let res = "";
    let arr = str.split(/(?=\s+\S*)/g);

    for (let i = 0, maxi = arr.length; i < maxi; i += 1) {
      let hasSpace = /^\s/.test( arr[i] );
      let hasBreak = /^\n/.test( arr[i] );
      let pref = hasBreak ? "<br>" : hasSpace ? "&nbsp;" : "";
      let s = arr[i].trim();

      if ( /^@/.test(s) ) {
        res += `${pref}<span class="arroba">${s}</span>`;
      } else if ( /^#/.test(s) ) {
        res += `${pref}<span class="hash">${s}</span>`;
      } else if ( isURL(s) ) {
        res += `${pref}<span class="url">${s}</span>`;
      } else if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(s) ) {
        res += `${pref}<span class="email">${s}</span>`;
      } else {
        res += `<span>${pref}${s}</span>`;
      }

    }

    return res + "<br>";
  }

  function updateInnerText(str: string): void {
    if ( !textarea || !cedit || !cedit.current ) return;

    let it = strToHTML(str);

    cedit.current.innerHTML = it;

    if (!str) return;

    let children = cedit.current.children;
    let child = children[0];

    let range = document.createRange();
    let sel = window.getSelection();

    range.setStart(child, 1);
    range.collapse(true);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  useEffect(() => {
    updateInnerText(value);
  }, [ value ]);

  return (
    <div className="relative -mt-1 -ml-3" onClick={ () => focus() }>
      <div onFocus={ () => focus() } 
        className="lesp bg-white text-black p-2 border-none outline-none pointer-events-none"
        ref={ cedit } contentEditable={ true }></div>

      <textarea ref={ textarea } placeholder={ placeholder }
        value={ value } onChange={ (ev) => setValue(ev.currentTarget.value) }
        className="lesp flex m-auto p-2 rounded-md text-transparent caret-black bg-transparent border-none outline-none
        transition-all duration-200 absolute inset-0 w-full h-full resize-none"></textarea>
    </div>
  )
}