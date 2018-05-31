<template>
  <div class="page">
    <div class="clicntShowWrap">
      <div class="clicntShow">
        <div class="topBox">
          <img :src="view.wMerchantDo.shopImg1" class="infoImg">
          <div class="info">
            <span class="state state0" v-if="view.state==0">予約確認中</span>
            <span class="state state1" v-if="view.state==1">予約完了</span>
            <span class="state state2" v-if="view.state==2">来店済み</span>
            <span class="state state3" v-if="view.state==3">取消</span>
            <span class="state state4" v-if="view.state==4">却下</span>
            <div class="name">{{view.wMerchantDo.shopName}}</div>
            <p class="addaddress">{{view.wMerchantDo.address}}</p>
            <p class="tel">{{view.wMerchantDo.merchantPhone}}</p>
            <p class="time">{{view.wMerchantDo.operatedBegin1}}-{{view.wMerchantDo.operatedEnd1}} {{view.wMerchantDo.operatedBegin2}}-{{view.wMerchantDo.operatedEnd2}}<br>{{view.wMerchantDo.openDailyJ}}</p>
          </div>
        </div>
        <div class="cinfo">
          <ul>
            <li>
              <span>利用人数</span>
              <p>{{view.orderNum}}</p>
            </li>
            <li>
              <span>来店日</span>
              <p>{{view.orderDate}}</p>
            </li>
            <li>
              <span>来店時間</span>
              <p>{{view.orderTime}}</p>
            </li>
            <li>
              <span>名前</span>
              <p>{{view.name}}</p>
            </li>
            <li>
              <span>電話</span>
              <p>{{view.phone}}</p>
            </li>
          </ul>
        </div>
        <div class="conditions" v-if="view.wdIscountDtoOut!=null">
          <div class="box">
            <span>特典</span>
            <div class="box_n">
              <div class="box_n1">
                <div class="lbox">
                  <div class="n">期限：{{view.wdIscountDtoOut.limitedJ}}</div>
                  <p>条件1：{{view.wdIscountDtoOut.conditionJ1}}</p>
                  <p>条件2：{{view.wdIscountDtoOut.conditionJ}}</p>
                </div>
                <div class="rbox">
                  <p>内容：</p>
                  <p>{{view.wdIscountDtoOut.contentJ}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <van-cell-group style="margin-top:15px">
        <van-cell :title="view.orderNum+'人'" is-link />
        <van-cell :title="view.orderDate" is-link />
        <van-cell :title="view.orderTime" is-link />
      </van-cell-group> -->
    </div>
    <van-goods-action style="border-top:solid 1px #eee" v-if="view.state==0||view.state==1">
      <van-goods-action-big-btn text="予約を却下する" @click="nextPost(4,'取消予約')" class="btnPostBg1" />
      <van-goods-action-big-btn text="予約を修正する" :to="'/orders/change?id='+id" class="btnPostBg2" />
      <van-goods-action-big-btn text="予約を承認する" @click="nextPost(1,'确定予約')" class="btnPostBg3" v-if="view.state==0" />
      <van-goods-action-big-btn text="来店済みにする" @click="nextPost(2,'确认来店')" class="btnPostBg4" v-if="view.state==1" />
    </van-goods-action>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      id: "",
      view: {
        id: 0,
        name: "string",
        orderDate: "2018-05-29T03:46:44.639Z",
        state:null,
        orderNum: 0,
        orderTime: "2018-05-29T03:46:44.639Z",
        phone: "string",
        wMerchantDo: {
          address: "string",
          id: 0,
          merchantPhone: "string",
          openDailyC: "string",
          openDailyJ: "string",
          operatedBegin1: "2018-05-29T03:46:44.639Z",
          operatedBegin2: "2018-05-29T03:46:44.639Z",
          operatedBegin3: "2018-05-29T03:46:44.639Z",
          operatedEnd1: "2018-05-29T03:46:44.639Z",
          operatedEnd2: "2018-05-29T03:46:44.639Z",
          operatedEnd3: "2018-05-29T03:46:44.639Z",
          shopImg1: "string",
          shopImg2: "string",
          shopImg3: "string",
          shopName: "string"
        },
        wdIscountDtoOut: {
          conditionC: "string",
          conditionC1: "string",
          conditionJ: "string",
          conditionJ1: "string",
          contentC: "string",
          contentJ: "string",
          customerDiscountId: 0,
          id: 0,
          limitedC: "string",
          limitedJ: "string",
          prompt: 0,
          reserve: 0
        }
      }
    };
  },
  mounted: function() {
    this.id = this.$route.query.id;
    this.getData();
  },
  methods: {
    nextPost(nextState, text) {
      Dialog.confirm({
        title: "消息",
        message: text,
        confirmButtonText: "確認する",
        cancelButtonText: "キャンセル"
      }).then(() => {
        this.postData(nextState);
      });
    },
    getData() {
      this.$http
        .get(this.httpUrl + "/merchant/orders/merchantOrderDetail.do", {
          params: { orderId: this.id }
        })
        .then(response => {
          this.view = response.data.data;
          this.view.orderDate=this.formatDateTime(this.view.orderDate)
          this.view.orderTime=this.formatDateTime(this.view.orderTime,"time")
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    postData(nextState) {
      this.$http
        .post(
          this.httpUrl + "/merchant/orders/merchantOrder.do",
          { orderId: this.id, state: nextState }
        )
        .then(response => {
          this.getData()
        })
    },
    formatDateTime(obj,v) {
      var date =  new Date(obj);
      var y = 1900+date.getYear();
      var m = "0"+(date.getMonth()+1);
      var d = "0"+date.getDate();
      var minute = date.getMinutes();  
      var second = date.getSeconds();  
      minute = minute < 10 ? ('0' + minute) : minute;    
      second = second < 10 ? ('0' + second) : second;
      if(v=="time"){
      return minute+':'+second;   
      }else{
      return y+"-"+m.substring(m.length-2,m.length)+"-"+d.substring(d.length-2,d.length);
      }
    }
  }
};
</script>

<style>

</style>