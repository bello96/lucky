<template>
  <div class="luckbox">
    <luckDraw
      :buttonText="buttonText"
      :prizeList="prizeList"
      :speed="speed"
      @prizeInfo="getMsg"
      :isLucky="isLucky"
    >
      <template #prize="prize">
        <!-- 用户自定义显示内容 -->
        <h2>{{ prize.itemData.text }}</h2>
      </template>
    </luckDraw>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      buttonText: "开始", // 抽奖按钮显示内容
      isLucky: 0, // 自定义中奖号码 (1-8) 若不填则随机
      speed: "middle", // 转速(small->慢  middle->中 large->快)
      // 奖品列表
      prizeList: [
        {
          id: 1,
          text: "冰箱",
        },
        {
          id: 2,
          text: "水壶",
        },
        {
          id: 3,
          text: "风扇",
        },
        {
          id: 4,
          text: "耳机",
        },
        {
          id: 5,
          text: "手机",
        },
        {
          id: 6,
          text: "空调",
        },
        {
          id: 7,
          text: "手表",
        },
        {
          id: 8,
          text: "电脑",
        },
      ],
    };
  },
  methods: {
    getMsg(value) {
      let luckvalue = this.prizeList.filter((item) => item.id === value)[0]
        .text;
      Dialog.alert({
        message: `${luckvalue}`,
      });
    },
  },
};
</script>

<style lang="less">
.luckbox {
  padding-top: 16vh;
}
h2 {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 6vw;
}
</style>
