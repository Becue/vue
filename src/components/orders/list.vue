<template>
  <div class="page">
    <!-- 选择日期 -->
    <div class="cell_date" @click="dateShowF">
      {{getDate}}
    </div>
    <div class="list_box">
      <van-list v-model="loading" :finished="finished" @load="getList" style="margin-bottom: 49px;">
        <!--item-->
        <router-link v-for="(item,index) in list.items" :key="index" :to="'/orders/detail?id='+item.id+'&state='+item.state" class="list_item">
          <div class="list_item_w1">
            <div class="list_item_w1_n">
              {{item.name}}
            </div>
            <div class="list_item_w1_p">
              {{item.id}}
            </div>
            <div class="list_item_w1_p">
              {{item.orderDate}}
            </div>
          </div>
          <div class="list_item_w2">
            {{item.orderNum}} 名
          </div>
          <div class="list_item_w3">
            <a href="#" class="list_item_w3_b list_item_w3_b_0" v-if="item.state==0">
              予約確認中
            </a>
            <a href="#" class="list_item_w3_b list_item_w3_b_1" v-if="item.state==1">
              予約完了
            </a>
            <a href="#" class="list_item_w3_b list_item_w3_b_2" v-if="item.state==2">
              来店済み
            </a>
            <a href="#" class="list_item_w3_b list_item_w3_b_3" v-if="item.state==3">
              取消
            </a>
            <a href="#" class="list_item_w3_b list_item_w3_b_4" v-if="item.state==4">
              却下
            </a>
          </div>
        </router-link>
        <div class="finished" v-if="finished">加载完毕</div>
      </van-list>
    </div>

    <!--底部菜单-->
    <van-tabbar v-model="tabbarActive">
      <van-tabbar-item icon="navbar1" @click="tabbar('')">一覧</van-tabbar-item>
      <van-tabbar-item icon="navbar2" @click="tabbar(0)">未確認</van-tabbar-item>
      <van-tabbar-item icon="navbar3" @click="tabbar(1)">完了</van-tabbar-item>
      <van-tabbar-item icon="navbar4" @click="tabbar(2)">取消</van-tabbar-item>
      <van-tabbar-item icon="navbar5" @click="tabbar(3)">来店済み</van-tabbar-item>
      <van-tabbar-item icon="navbar6" @click="tabbar(4)">却下</van-tabbar-item>
    </van-tabbar>
    <!-- 选日期-->
    <van-actionsheet v-model="dateShow">
      <van-datetime-picker v-model="currentDate" title="选择日期" type="date" @confirm="dateValF" @cancel="dateHideF" />
    </van-actionsheet>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarActive: 0,
      state: "",
      dateShow: false,
      currentDate: new Date(),
      getDate: null,
      list: {
        items: [],
        page: 0,
        size: 0,
        total: 0,
        totalPage: 0
      },
      loading: false,
      finished: false
    };
  },
  mounted: function() {
    this.getDate = this.formatDateTime(new Date());
  },
  methods: {
    tabbar(id) {
      this.finished = false;
      this.state = id;
      this.list.items = [];
      this.list.page = 0;
      this.getList();
    },
    getList() {
      this.$http
        .get(this.httpUrl + "/merchant/orders/merchantOrderList.do", {
          params: {
            state: this.state,
            orderDate: "",
            page: this.list.page + 1,
            size: 10
          }
        })
        .then(response => {
          this.list.page = response.data.data.page;
          this.list.totalPage = response.data.data.totalPage;
          for (let i = 0; i < response.data.data.items.length; i++) {
            this.list.items.push(response.data.data.items[i]);
          }
          this.loading = false;
          if (this.list.page >= this.list.totalPage) {
            this.finished = true;
          }
        });
    },
    // 日期
    dateShowF() {
      this.dateShow = true;
    },
    dateHideF() {
      this.dateShow = false;
    },
    dateValF(value) {
      this.getDate = this.formatDateTime(value);
      this.getList();
      this.dateShow = false;
    },
    formatDateTime(obj) {
      var date = new Date(obj);
      var y = 1900 + date.getYear();
      var m = "0" + (date.getMonth() + 1);
      var d = "0" + date.getDate();
      return (
        y +
        "-" +
        m.substring(m.length - 2, m.length) +
        "-" +
        d.substring(d.length - 2, d.length)
      );
    }
  }
};
</script>

<style>
</style>