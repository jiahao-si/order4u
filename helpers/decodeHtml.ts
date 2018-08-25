const REGX_HTML_ENCODE = /"|&|'|<|>|[\x00-\x20]|[\x7F-\xFF]|[\u0100-\u2700]/g;
const REGX_HTML_DECODE = /&\w+;|&#(\d+);/g;
const HTML_DECODE = {
  "&lt;": "<",
  "&gt;": ">",
  "&amp;": "&",
  "&nbsp;": " ",
  "&quot;": "\"",
  "&#039;": "\'"
};

export function encodeHtml(str) {
  return String(str)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function decodeHtml(s: string) {
  s = (s != undefined) ? s : this.toString();
  return typeof s != "string"
    ? s
    : s.replace(REGX_HTML_DECODE,
      function ($0, $1) {
        let c = HTML_DECODE[$0];

        if (c == undefined) {
          if (!isNaN($1)) {
            c = String.fromCharCode(($1 == 160) ? 32 : $1);
          } else {
            c = $0;
          }
        }
        return c;
      }
    );
}
