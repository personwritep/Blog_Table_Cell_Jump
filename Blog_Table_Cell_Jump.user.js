// ==UserScript==
// @name        Blog Table ⭐ Cell Jump  🟥✳️
// @namespace        http://tampermonkey.net/
// @version        0.6
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
                            alert("◀️　文字列の先頭へジャンプ")
                            gate=-1; }}
                    if(event.keyCode==39){ //「Pause」➔「⇨」
                        if(gate==1){
                            event.preventDefault();
                            cursor=0;
                            alert("　 文字列の末尾へジャンプ　▶️")
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
            let col=table.querySelector('tr').querySelectorAll('td').length;

            let now_point=get_now_pos(table);

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



        function get_now_pos(table){
            let point=get_td();
            if(point){
                let now_tdp;
                let now_trp;

                let tr_p=point.closest('tr');
                let tr_p_td=tr_p.querySelectorAll('td');
                for(let k=0; k<tr_p_td.length; k++){
                    if(tr_p_td[k]==point){
                        now_tdp=k; break; }}

                let tr_all=table.querySelectorAll('tr');
                for(let k=0; k<tr_all.length; k++){
                    if(tr_all[k]==tr_p){
                        now_trp=k; break; }}

                return tr_p_td.length*now_trp + now_tdp; }


            function get_td(){
                let selection=iframe_doc.getSelection();
                if(selection.rangeCount>0){
                    let point;
                    let range=selection.getRangeAt(0);
                    let container=range.startContainer;
                    if(container.nodeType==1){
                        point=container.closest('td'); }
                    else{
                        point=container.parentElement.closest('td'); }

                    return point; }}

        } // get_now_pos(table)

    }

} // catch_key()
