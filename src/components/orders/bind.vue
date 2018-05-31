<template>
  <div class="page">
      <div class="finished">正在绑定用户中...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code:null,
    };
  },
  mounted: function() {
    // 判断URL 有CODE
    if (this.getParameter("code") != null) {
      this.$http
        .post(this.httpUrl + "/merchant/customer/addMerchant.do", {
          params: {code:this.getParameter("code"),merchantId:this.getParameter("merchantId")}
        })
        .then(response => {
          this.$router.push('/')
        })
    }
    //判断URL 没有CODE
    if (this.getParameter("code")==null) {
      var appid = "wxfaaa4af41d451ca0";
      var redirct_url=encodeURI('http://japitta.leeking.cn/booking_merchant/index.html/#/orders/login');
      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
        appid +
        "&redirect_uri=" +
        redirct_url +
        "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
    }
  },
  methods: {
    getParameter(sProp) {
      var re = new RegExp(sProp + "=([^&]*)", "i");
      var a = re.exec(document.location.search);
      if (a == null) return null;
      return a[1];
    }
  }
};
</script>
