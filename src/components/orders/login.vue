<template>
  <div class="page">
     <div class="finished">登录中</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:null,
    };
  },
  mounted: function() {
    //判断CODE
    if (this.getParameter("code") != null) {
      this.$http
        .get(this.httpUrl + "/merchant/customer/loginMerchant.do", {
          params: {code:this.getParameter("code")}
        })
        .then(response => {
          var token=response.data.data.token
            this.setCookie("token",token);
            window.history.go(-1)
        })
    }
    //判断COOKIE有没有token
    if (this.getCookie("token") ==""&&this.getParameter("code")==null) {
      var appid = "wxfaaa4af41d451ca0";
      var redirct_url=encodeURI('http://japitta.leeking.cn/booking_merchant/#/orders/login');
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        appid +
        "&redirect_uri=" +
        redirct_url +
        "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    }
  },
  methods: {
    setCookie(name, value) {
      var exp = new Date();
      exp.setTime(exp.getTime() + 1 * 24 * 60 * 60 * 1000); //1天过期
      document.cookie =
        name +
        "=" +
        encodeURIComponent(value) +
        ";expires=" +
        exp.toGMTString() +
        ";path=/";
      return true;
    },
    getParameter(sProp) {
      var re = new RegExp(sProp + "=([^&]*)", "i");
      var a = re.exec(document.location.search);
      if (a == null) return null;
      return a[1];
    }
  }
};
</script>