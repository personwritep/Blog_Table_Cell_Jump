// ==UserScript==
// @name        Blog Table ⭐ Cell Jump
// @namespace        http://tampermonkey.net/
// @version        0.7
// @description        「⇧」「⇩」キーで「table」内のキャレットのセル移動を可能にする
// @author        Ameba Blog User
// @match        https://blog.ameba.jp/ucs/entry/srventryinsertinput.do*
// @match        https://blog.ameba.jp/ucs/entry/srventryupdateinput.do*
// @icon        https://www.google.com/s2/favicons?sz=64&domain=ameblo.jp
// @grant        none
// @updateURL        https://github.com/personwritep/Blog_Table_Cell_Jump/raw/main/Blog_Table_Cell_Jump.user.js
// @downloadURL        https://github.com/personwritep/Blog_Table_Cell_Jump/raw/main/Blog_Table_Cell_Jump.user.js
// ==/UserScript==


let listen=Symbol();


let cursor=0; //「0」:セルの末尾　「1」:セルの先頭
set_allow();


let target=document.getElementById('cke_1_contents'); // 監視 target
let monitor=new MutationObserver( catch_key );
monitor.observe(target, {childList: true, attributes: true}); // キー操作待受け開始

catch_key();

function catch_key(){
    if(document.querySelector('.cke_wysiwyg_frame')!=null){ //「通常表示」から実行開始
        let editor_iframe=document.querySelector('.cke_wysiwyg_frame');
        let iframe_doc=editor_iframe.contentWindow.document;

        if(!iframe_doc[listen]){
            iframe_doc.addEventListener('keydown', check_key);
            iframe_doc[listen]=true; }


        let gate=0;
        function check_key(event){
            if(!(event.ctrlKey || event.shiftKey || event.altKey || event.metaKey)){
                let table=is_table();
                if(table){
                    if(event.keyCode==19){
                        gate=1; } //「Pause」キー入力

                    if(event.keyCode==37){ //「Pause」➔「⇦」
                        if(gate==1){
                            event.preventDefault();
                            cursor=1;
                            set_allow(cursor);
                            gate=-1; }}
                    if(event.keyCode==39){ //「Pause」➔「⇨」
                        if(gate==1){
                            event.preventDefault();
                            cursor=0;
                            set_allow(cursor);
                            gate=-1; }}

                    if(event.keyCode !=19){ gate=-1; }


                    if(event.keyCode==38){ //「⇧」
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        go(table, 0); }
                    if(event.keyCode==40){ //「⇩」
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        go(table, 1); }}

            }} // check_key()



        function is_table(){
            let selection=iframe_doc.getSelection();
            if(selection.rangeCount>0){
                let range=selection.getRangeAt(0);
                let ac_node=selection.anchorNode;
                if(ac_node){
                    let table_elm=ac_node.parentElement.closest('table');
                    if(table_elm){
                        return table_elm; }}}}



        function go(table, n){
            let td_all=table.querySelectorAll('td');
            let col=table.rows[0]?.cells.length || 0; // 列数

            let cell=get_td();
            if(!cell) return;

            let now_tdp=cell.cellIndex
            let now_trp=cell.parentElement.rowIndex
            let now_point=col*now_trp + now_tdp;

            let el;
            if(n==0){
                el=td_all[now_point - col]; }
            else{
                el=td_all[now_point + col]; }
            if(el){
                let selction=iframe_doc.getSelection();
                let range=iframe_doc.createRange();
                range.selectNodeContents(el);
                if(cursor==0){
                    range.collapse(false); } // false: 移動後のキャレット位置 セル末尾
                else{
                    range.collapse(true); } // true: 移動後のキャレット位置 セル先頭
                selction.removeAllRanges();
                selction.addRange(range); }

        } // go(n)



        function get_td(){
            let selection=iframe_doc.getSelection();
            if(!selection || selection.rangeCount===0) return null;
            let range=selection.getRangeAt(0);
            let container=range.startContainer;

            let point;
            if(container.nodeType==1){
                point=container.closest('td'); }
            else{
                point=container.parentElement.closest('td'); }
            return point;

        } // get_td()



        function set_allow(n){
            let cell=get_td();
            if(!cell) return;

            let iframeRect=editor_iframe.getBoundingClientRect();
            let rect=cell.getBoundingClientRect();
            let arrow_top=iframeRect.top + rect.top - 25;
            let arrow_left=iframeRect.left + rect.left + 4;

            let j_arrow=document.querySelector('.j_arrow');
            if(j_arrow){
                if(n==0){
                    j_arrow.classList.remove('left'); }
                else{
                    j_arrow.classList.add('left'); }

                j_arrow.style.top=arrow_top+'px';
                j_arrow.style.left=arrow_left+'px';

                setTimeout(()=>{
                    j_arrow.style.top='-30px';
                }, 2000); }

        } // set_allow()



    }

} // catch_key()



function set_allow(){
    let disp=
        '<div class="j_arrow">'+
        '<span class="left">◀</span><span class="right">▶</span>'+
        '</div>'+
        '<style>'+
        '.j_arrow { position: fixed; top: -30px; left: 0; z-index: 200; '+
        'width: 32px; height: 18px; text-align: center; background: #000000a0; '+
        'border-radius: 3px; } '+
        '.j_arrow span { font: normal 16px/20px Meiryo; color: #fff; } '+
        '.j_arrow .left { display: none; } .j_arrow .right { display: block; } '+
        '.j_arrow.left .left { display: block; } .j_arrow.left .right { display: none; } '+
        '</style>';

    document.querySelector('.j_arrow') ? null : document.body.insertAdjacentHTML('beforeend', disp);

} // set_allow()
