define("page/login",["lib/jquery"],function(t){"use strict";var n,i=t("lib/jquery");return n=function(t,n){var o=this;o._body=i("#"+t),o=i.extend(o,n),o.init(),o.addEvent()},n.prototype={alertTip:"用户名和密码不能为空",init:function(){this._account=this._body.find(".account").focus(),this._password=this._body.find(".password")},addEvent:function(){var t=this;i(document).on("keydown",function(n){13===n.keyCode&&t.submit()}),t._body.on("click",".confirm",function(n){n.preventDefault(),t.submit()}).on("click",".reset",function(n){t._account.val("").focus(),t._password.val("")})},submit:function(){var t=this;t.validate()&&i.ajax({url:window.basePath+"login/userLogin",type:"POST",data:{loginId:t._account.val().trim(),password:t._password.val()},dataType:"json",success:function(t){0===t.status?document.location.href=t.result[0].url:alert(t.msg)}})},validate:function(){return this._account.val()&&this._password.val()?!0:void alert(this.alertTip)}},n});