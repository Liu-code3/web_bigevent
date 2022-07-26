$(function () {
    var form = layui.form

    // 校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'
        ],
        // 这个 value, 你把这个 samPwd 校验规则给哪个文本框，里面输入的值通过value获取
        samPwd: function (value) {
            if (value === $("[name=oldPwd]").val()) {
                return '新旧密码不能相同!'
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return '两次密码不一致!'
            }
        }
    })

    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    console.log(res);
                    return layui.layer.msg('更新密码失败!')

                }
                layui.layer.msg('更新密码成功!')
                // 重置表单 
                // 修改完密码后重置 利用原生js的reset方法
                $(".layui-form")[0].reset()
            }
        })
    })
})