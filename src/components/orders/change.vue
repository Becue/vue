<template>
  <div class="page">
    <div class="clicntShowWrap">
      <div class="clicntShow">
        <div class="topBox">
          <img :src="view.wMerchantDo.shopImg1" class="infoImg">
          <div class="info">
            <div class="name">{{view.wMerchantDo.shopName}}</div>
            <p class="addaddress">{{view.wMerchantDo.address}}</p>
            <p class="tel">{{view.wMerchantDo.merchantPhone}}</p>
            <p class="time">{{view.wMerchantDo.operatedBegin1}}-{{view.wMerchantDo.operatedEnd1}} {{view.wMerchantDo.operatedBegin2}}-{{view.wMerchantDo.operatedEnd2}}<br>{{view.wMerchantDo.openDailyJ}}</p>
          </div>
        </div>
        <div class="cinfo">
          <ul>
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
        <div class="conditions">
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
      <van-cell-group style="margin-top:15px">
        <van-cell :title="view.orderNum+'人'" is-link @click="numShowF" />
        <van-cell :title="view.orderDate" is-link @click="dateShowF" />
        <van-cell :title="view.orderTime" is-link @click="timeShowF" />
      </van-cell-group>
    </div>
    <van-goods-action style="border-top:solid 1px #eee">
      <van-goods-action-big-btn text="確認する" @click="nextPost('确定变更')" class="btnPostBg3" />
    </van-goods-action>
    <!-- 时间 -->
    <van-actionsheet v-model="timeShow">
      <van-datetime-picker v-model="view.orderTime" title="选择时间" type="time" @confirm="timeValF" @cancel="timeHideF" />
    </van-actionsheet>
    <!-- 选人-->
    <van-actionsheet v-model="numShow">
      <van-picker :columns="numVal" title="选择就餐人数" show-toolbar @confirm="numValF" @cancel="numHideF" />
    </van-actionsheet>
    <!-- 选日期-->
    <van-actionsheet v-model="dateShow">
      <van-datetime-picker v-model="currentDate" title="选择日期" type="date" :min-date="minDate" @confirm="dateValF" @cancel="dateHideF" />
    </van-actionsheet>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      id: "",
      state: "",
      timeShow: false,
      numShow: false,
      dateShow: false,
      currentDate: new Date(),
      minDate: new Date(),
      numVal: [
        { text: "1人", val: 1 },
        { text: "2人", val: 2 },
        { text: "3人", val: 3 },
        { text: "4人", val: 4 },
        { text: "5人", val: 5 },
        { text: "6人", val: 6 },
        { text: "7人", val: 7 },
        { text: "8人", val: 8 },
        { text: "9人", val: 9 },
        { text: "10人", val: 10 },
        { text: "10人以上", val: 11 }
      ],
      view: {
        id: 0,
        name: "string",
        orderDate: "2018-05-29T03:46:44.639Z",
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
    nextPost(text) {
      Dialog.confirm({
        title: "消息",
        message: text,
        confirmButtonText: "確認する",
        cancelButtonText: "キャンセル"
      }).then(() => {
        this.postData();
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
    },
    postData() {
      this.$http
        .post(
          this.httpUrl + "/merchant/orders/merchantChangeOrder.do",
          {
            orderId: this.id,
            orderNum: this.view.orderNum,
            orderDate: this.view.orderDate,
            orderTime: this.view.orderDate+" "+this.view.orderTime+":00"
          }
        )
        .then(response => {
          this.$router.push("/orders/success?id=" + this.id);
        })
    },
    // 时间
    timeShowF() {
      this.timeShow = true;
    },
    timeHideF() {
      this.timeShow = false;
    },
    timeValF(val) {
      this.view.orderTime = val;
      this.timeShow = false;
    },
    // 人数
    numShowF() {
      this.numShow = true;
    },
    numHideF() {
      this.numShow = false;
    },
    numValF(value, index) {
      this.view.orderNum = this.numVal[index].val;
      this.numShow = false;
    },
    // 日期
    dateShowF() {
      this.dateShow = true;
    },
    dateHideF() {
      this.dateShow = false;
    },
    dateValF(value) {
      this.view.orderDate=this.formatDateTime(value)
      this.dateShow = false;
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
.clicntShowWrap {
  margin-bottom: 50px;
}
.clicntShow {
  background: #ffffff;
  padding: 20px;
  border-bottom: solid 1px #eeeeee;
}
.clicntShow .topBox {
  padding-bottom: 20px;
  border-bottom: solid 1px #eeeeee;
  overflow: hidden;
}
.clicntShow .topBox .infoImg {
  width: 40%;
  float: left;
}
.clicntShow .topBox .info {
  float: left;
  width: 60%;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 12px;
  color: #999;
}
.clicntShow .topBox .info .state {
  height: 20px;
  line-height: 20px;
  border-radius: 10px;
  padding: 0 10px;
  color: #ffffff;
  display: inline-block;
  margin-bottom: 10px;
}

.clicntShow .topBox .info .name {
  font-size: 16px;
  color: #111111;
  font-weight: bold;
  line-height: 20px;
}
.clicntShow .topBox .info p {
  line-height: 16px;
  margin-top: 10px;
  padding-left: 20px;
  line-height: 20px;
}
.clicntShow .topBox .info p.addaddress {
  background: url(/static/images/c1.jpg) no-repeat left top;
  background-size: 16px;
}
.clicntShow .topBox .info p.tel {
  background: url(/static/images/c2.jpg) no-repeat left top;
  background-size: 16px;
}
.clicntShow .topBox .info p.time {
  background: url(/static/images/c3.jpg) no-repeat left top;
  background-size: 16px;
}

.conditions {
  padding: 20px 0;
}
.conditions .box {
  border: solid 1px #eee;
  padding: 5px;
  position: relative;
  overflow: hidden;
}
.conditions .box span {
  height: 20px;
  line-height: 20px;
  position: absolute;
  width: 80px;
  font-size: 0.5rem;
  color: #ffffff;
  background: #ff393a;
  text-align: center;
  transform: rotate(45deg);
  top: 10px;
  right: -20px;
}
.conditions .box .box_n {
  border: solid 1px #333;
  padding: 2px;
}
.conditions .box .box_n1 {
  border: solid 1px #ddd;
  padding: 15px 10px;
  min-height: 100px;
}
.conditions .box .lbox {
  width: 60%;
  float: left;
  box-sizing: border-box;
  border-right: solid 1px #eee;
}
.conditions .box .lbox .n {
  font-size: 14px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}
.conditions .box .lbox p {
  font-size: 12px;
  line-height: 22px;
  color: #999;
}
.conditions .box .rbox {
  width: 40%;
  float: right;
  box-sizing: border-box;
  padding-left: 10px;
}
.conditions .box .rbox p {
  font-size: 12px;
  color: #999;
  line-height: 22px;
}
.conditions .box .rbox p b {
  font-size: 35px;
  color: #ff3939;
  font-family: "Times New Roman", Times, serif;
  margin-right: 10px;
}
.cinfo {
  padding: 10px 0;
  border-bottom: solid 1px #eee;
}
.cinfo ul li {
  line-height: 30px;
  font-size: 14px;
}
.cinfo ul li span {
  width: 90px;
  color: #333;
  display: inline-block;
}
.cinfo ul li p {
  color: #999;
  display: inline-block;
}
</style>