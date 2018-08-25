import * as $ from "jquery";

/**
 * 动态创建表单提交
 * @method submitForm
 * @param {String} url 请求url
 * @param {Object} data 参数
 * @return {String} method 请求类型
 * @author evanyuan
 */
export function submitForm(url, data, method, isOpenTab = false) {
  method = method ? method : 'post';
  var $form = $("<form>").attr("action", url).attr("method", method).attr("target", isOpenTab ? "_blank" : "_self").css("display", "none");
  if (data) {
    for (var key in data) {
      let value = data[key];

      if (Object.prototype.toString.call(value).toLowerCase() == '[object array]') {
        for (var i = 0; i < value.length; i++) {
          $form.append($('<input type="hidden">').attr('name', key + '[' + i + ']').val(value[i]));
        }
      } else if (typeof (value) == 'object') {
        $form.append($('<input type="hidden">').attr('name', key).val(JSON.stringify(data[key])));
      } else {
        $form.append($('<input type="hidden">').attr('name', key).val(value));
      }
    }
  }
  $form.appendTo("body").submit();
  setTimeout(function () {
    $form.remove();
  }, 200)
}
