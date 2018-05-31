<template>
  <div class="page" style="background:#fff;height:100%;position: absolute;width:100%">
      <div class="successPage">
        <div class="text">
          <span>予約变更成功</span>
        </div>
        <router-link class="btn" to="/orders/list">
          予約一覧
        </router-link>
        <router-link class="btn" :to="'/orders/detail?id='+id">
          予約詳細
        </router-link>
      </div>  
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
    this.id = this.$route.query.id;
  },
  methods: {

  }
};
</script>

<style>

</style>