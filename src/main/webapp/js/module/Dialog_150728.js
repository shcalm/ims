define("module/Dialog",["lib/jquery","lib/bootstrap"],function(o){"use strict";var t,n;return n=o("lib/jquery"),o("lib/bootstrap"),t={init:function(o,i){var a,d=t;"string"===n.type(o)?d._body=n("#"+o):d._body=o,i=i||{},i.footer=i.footer||['<button type="button" class="btn btn-default btn-cancel" data-dismiss="modal">取消</button>','<button type="button" class="btn btn-primary btn-confirm">保存</button>'].join(""),n.extend(d,i),d.force&&(d.source=""),d._dialog=d._body.find(".modal-dialog"),d._title=d._body.find(".modal-title"),d._container=d._body.find(".modal-body"),d._footer=d._body.find(".modal-footer"),a=d.force||d._body.data("source")!==d.source,a&&(d._body.data("source",d.source).off("click.bs.custom"),d._title.html(d.title),d._container.html(d.content),d._footer.html(d.footer),d._dialog.removeClass("modal-lg, modal-sm").addClass(d.sizeClass)),d._confirm=d._footer.find(".btn-confirm"),a&&(i.initCall&&i.initCall.call(d),d.addEvent())},addEvent:function(){var o=t;o._body.data("init")||(o._body.data("init",1),o._body.on("show.bs.modal",function(t){o.enableConfirm()}),o._footer.on("click.bs.modal",".btn-confirm",function(t){n(this).prop("disabled",!0),o.confirm&&o.confirm()}),o._footer.on("click.bs.modal",".btn-cancel",function(t){o.cancel&&o.cancel()}))},show:function(o,n){var i=t;i.init(o,n),i._body.modal("show")},hide:function(){var o=this;o._body.modal("hide")},enableConfirm:function(){var o=this;o._confirm.prop("disabled",!1)}}});