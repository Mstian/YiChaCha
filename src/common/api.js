

export default {
    //登录
    login:function(){
        let result = "";
        $.ajax({
            url: 'http://toutiao.ybhealth.com/index.php/api/user/login',
            type: 'POST',
            dataType: 'json',
            async:false,
            data: {username: '13522418029',password:'yibang'},
            success:function(res){
                //console.log("----" + res.ret)
                result = res.ret;
            }
        })
        return result;
    },
    //获取文章详情
    getArticle:function(token,id){
            let result = "";
            $.ajax({
                url: 'http://toutiao.ybhealth.com/index.php/api/article/view',
                type: 'get',
                dataType: 'json',
                data: {token: token,id:id},
                async:false,
                success:function(res){
                    //console.log(res)
                    result = res
                }

            })
            return result
    },
    //获取文章详情
    getXiangguan:function(id){
        let result = "";
        $.ajax({
            url: 'http://toutiao.ybhealth.com/index.php/api/article/xiangguan',
            type: 'get',
            dataType: 'json',
            data: {aid:id},
            async:false,
            success:function(res){
                //console.log(res)
                result = res
            }

        })
        return result
    },
    guanzhu:function(token,uid){
        let result = "";
        $.ajax({
            url: 'http://toutiao.ybhealth.com/index.php/api/member/guanzhu',
            type: 'post',
            dataType: 'json',
            data: {token: token,gz_uid:uid},
            async:false,
            success:function(res){
                console.log(res)
                result = res
            }
        })
        return result;
    },
    delGuanzhu:function(){
        let result = "";
        $.ajax({
            url: 'http://toutiao.ybhealth.com/index.php/api/member/guanzhuDel',
            type: 'post',
            dataType: 'json',
            data: {token: token,gz_uid:uid},
            async:false,
            success:function(res){
                //console.log(res)
                result = res
            }
        })
        return result;
    },
}
