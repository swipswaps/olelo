(function(){var i=function(){var f=typeof document.selection!=="undefined"&&typeof document.selection.createRange!=="undefined";return{getSelectionRange:function(a){var b,c,d;a.focus();if(typeof a.selectionStart!=="undefined"){b=a.selectionStart;c=a.selectionEnd}else if(f){b=document.selection.createRange();c=b.text.length;if(b.parentElement()!==a)throw"Unable to get selection range.";if(a.type==="textarea"){d=b.duplicate();d.moveToElementText(a);d.setEndPoint("EndToEnd",b);b=d.text.length-c}else{a=
a.createTextRange();a.setEndPoint("EndToStart",b);b=a.text.length}c=b+c}else throw"Unable to get selection range.";return{start:b,end:c}},getSelectionStart:function(a){return this.getSelectionRange(a).start},getSelectionEnd:function(a){return this.getSelectionRange(a).end},setSelectionRange:function(a,b,c){var d;a.focus();if(typeof c==="undefined")c=b;if(typeof a.selectionStart!=="undefined")a.setSelectionRange(b,c);else if(f){d=a.value;a=a.createTextRange();c-=b+d.slice(b+1,c).split("\n").length-
1;b-=d.slice(0,b).split("\n").length-1;a.move("character",b);a.moveEnd("character",c);a.select()}else throw"Unable to set selection range.";},getSelectedText:function(a){var b=this.getSelectionRange(a);return a.value.substring(b.start,b.end)},insertText:function(a,b,c,d,g){d=d||c;var h=c+b.length,l=a.value.substring(0,c);d=a.value.substr(d);a.value=l+b+d;g===true?this.setSelectionRange(a,c,h):this.setSelectionRange(a,h)},replaceSelectedText:function(a,b,c){var d=this.getSelectionRange(a);this.insertText(a,
b,d.start,d.end,c)},wrapSelectedText:function(a,b,c,d){b=b+this.getSelectedText(a)+c;this.replaceSelectedText(a,b,d)}}}();window.Selection=i})();
(function(i){i.fn.extend({getSelectionRange:function(){return Selection.getSelectionRange(this[0])},getSelectionStart:function(){return Selection.getSelectionStart(this[0])},getSelectionEnd:function(){return Selection.getSelectionEnd(this[0])},getSelectedText:function(){return Selection.getSelectedText(this[0])},setSelectionRange:function(f,a){return this.each(function(){Selection.setSelectionRange(this,f,a)})},insertText:function(f,a,b,c){return this.each(function(){Selection.insertText(this,f,a,
b,c)})},replaceSelectedText:function(f,a){return this.each(function(){Selection.replaceSelectedText(this,f,a)})},wrapSelectedText:function(f,a,b){return this.each(function(){Selection.wrapSelectedText(this,f,a,b)})}})})(jQuery);(function(i){var f={creole:{link:["[[","link text","]]"],bold:["**","bold text","**"],italic:["//","italic text","//"],ul:["* ","list item","",true],ol:["# ","list item","",true],h1:["= ","headline","",true],h2:["== ","headline","",true],h3:["=== ","headline","",true],sub:["~~","subscript","~~"],sup:["^^","superscript","^^"],del:["--","deleted text","--"],ins:["++","inserted text","++"],image:["{{","image","}}"],preformatted:["{{{","preformatted","}}}"]},markdown:{link:function(a){return(a=prompt("link target:",
a))?["[","link text","]("+a+")"]:null},bold:["**","bold text","**"],italic:["*","italic text","*"],ul:["* ","list item","",true],ol:["1. ","list item","",true],h1:["","headline","\n========",true],h2:["","headline","\n--------",true],image:function(a){return(a=prompt("image path:",a))?["![","image alt text","]("+a+")"]:null},preformatted:["    ","preformatted","",true]},orgmode:{bold:["*","bold text","*"],italic:["/","italic text","/"],ul:["- ","list item",""],ol:["1. ","list item",""],h1:["* ","headline",
""],h2:["** ","headline",""],h3:["*** ","headline",""]},textile:{link:function(a){return(a=prompt("link target:",a))?['"',"link text",'":'+a]:null},bold:["*","bold text","*"],italic:["_","italic text","_"],ul:["* ","list item","",true],ol:["# ","list item","",true],h1:["h1. ","headline","",true],h2:["h2. ","headline","",true],h3:["h3. ","headline","",true],em:["_","emphasized text","_"],sub:["~","subscript","~"],sup:["^","superscript","^"],del:["-","deleted text","-"],ins:["+","inserted text","+"],
image:["!","image","!"]}};i.fn.markupEditor=function(a){if(a=f[a]){var b=i('<ul class="button-bar" id="markup-editor"/>'),c=[];for(k in a)c.push(k);c.sort();for(var d=0;d<c.length;++d)b.append('<li><a href="#" id="markup-editor-'+c[d]+'">'+c[d]+"</a></li>");this.before(b);var g=this;i("a",b).click(function(){var h=a[this.id.substr(14)],l=g.getSelectedText();if(typeof h=="function")h=h(l);if(h){var e=g.getSelectionRange(),j=h[0],n=h[1],m=h[2];if(h[3]){g.setSelectionRange(e.start-1,e.start);if(e.start!==
0&&g.getSelectedText()!="\n")j="\n"+j;g.setSelectionRange(e.end,e.end+1);if(g.getSelectedText()!="\n")m+="\n"}if(e.start==e.end){g.insertText(j+n+m,e.start,e.start,false);g.setSelectionRange(e.start+j.length,e.start+j.length+n.length)}else g.insertText(j+l+m,e.start,e.end,false)}return false})}}})(jQuery);if(window.Olelo){var mime=Olelo.page_mime;if(mime=="application/x-empty"||mime=="inode/directory")mime=Olelo.default_mime;var match=/text\/x-(\w+)/.exec(mime);match&&$("#edit-content").markupEditor(match[1])};
