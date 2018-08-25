/**
*   打印接口printer
*   打印指定的iframe，兼容各种浏览器，ie6+, firefox，chrome
*   原理： 在IE下，使用ie自带的控件。
*
*   在非IE下，直接使用window.print
*/

export function printImage(url) {
  var content = '<html><body><img  style="width:100%;-webkit-print-color-adjust:exact;" id="printImg"></body><script type="text/javascript">var elem = document.getElementById("printImg"); if( elem ){ elem.onload = function(){window.focus();window.print(); window.close();}; elem.src="' + url + '";}<\/script></html>';

  var mywindow = window.open();
  mywindow.document.write(content);
  mywindow.document.close();
  return;
}

export function print(content) {
  if (!content) {
    alert("请指定要打印的内容");
    return;
  }
  _printContent(content);
}

export function printIframe(ifr) {
  if (!ifr) {
    alert("请指定要打印的内容");
    return;
  }

  var tar = $(ifr);
  var curFr = tar[0] as any;

  if (navigator.userAgent.indexOf('MSIE') >= 0) {   //是IE浏览器的话，就在浏览器里面插入

    _printContent(tar && tar.contents());

  } else {

    curFr && curFr.contentWindow && curFr.contentWindow.print();

  }
}

function _printContent(content) {
  var env = $(content);
  content += '<script type="text/javascript">window.onload=function(e){ window.focus();window.print(); window.close();}<\/script>'

  var mywindow = window.open();
  mywindow.document.write(content);
  mywindow.document.close();
  return true;
}
