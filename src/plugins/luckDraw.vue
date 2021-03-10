<template>
  <div class="hello">
    <ul class="cj_box">
      <li
        v-for="prizesItem in renderList"
        :key="prizesItem.id"
        :class="{ active: activeIndex === prizesItem.index }"
        @click="prizeBtn(prizesItem)"
      >
        <slot
          name="prize"
          :itemData="prizesItem"
          v-if="prizesItem.id !== 'btn'"
        ></slot>
        <Button v-else :disabled="isdisabled" type="info">{{
          buttonText
        }}</Button>
      </li>
    </ul>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "luckDraw",
  props: {
    // 奖品列表
    prizeList: Array,
    // 控制中奖号码
    isLucky: {
      type: Number,
      default: 0,
    },
    // 按钮内容
    buttonText: {
      type: String,
      default: "点击抽奖",
    },
    // 转动速度
    speed: {
      type: String,
      default: "middle",
    },
  },
  components: {
    Button,
  },
  data() {
    return {
      activeIndex: -1, // 高亮标识
      isLuckyCode: this.isLucky, // 中奖号
      isdisabled: false,
    };
  },
  methods: {
    // 按钮点击事件
    prizeBtn(item) {
      if (item.id !== "btn") return; // 如果点击的不是中间抽奖按钮 直接返回
      if (this.timer) return; // 定时器是否完成
      if (!this.isLucky || this.isLucky > 8) {
        // 判断是否 内定奖品 否则随机奖品
        this.isLuckyCode = Math.floor(Math.random() * 8) + 1; // 随机中奖号 1-8
      }
      let time =
        this.speed === "middle"
          ? 50
          : this.speed === "small"
          ? 100
          : this.speed === "large"
          ? 10
          : 50;
      this.move(time); // 开始转圈
    },
    // 开始转圈
    move(time) {
      if (time > 600) {
        if (this.activeIndex + 1 !== this.isLuckyCode) {
          // 中奖号是否是自定义号码
          this.timer = setTimeout(() => {
            this.activeIndex = (this.activeIndex + 1) % 8; // 0-7
            this.move(time * 1.05);
          }, time);
        } else {
          clearTimeout(this.timer);
          this.timer = null;
          this.showLog();
          this.isdisabled = false;
        }
      } else {
        this.timer = setTimeout(() => {
          this.activeIndex = (this.activeIndex + 1) % 8; // 0-7
          this.move(time * 1.1);
        }, time);
        this.isdisabled = true;
      }
    },
    // 通知抽奖结果
    showLog() {
      this.$emit("prizeInfo", this.isLuckyCode);
    },
  },
  computed: {
    // 数据改造
    renderList() {
      let ary = this.prizeList.map((item, index) => {
        switch (index) {
          case 3:
            return {
              ...this.prizeList[7],
              index: 7,
            };
          case 4:
            return {
              ...this.prizeList[3],
              index: 3,
            };
          case 5:
            return {
              ...this.prizeList[6],
              index: 6,
            };
          case 6:
            return {
              ...this.prizeList[5],
              index: 5,
            };
          case 7:
            return {
              ...this.prizeList[4],
              index: 4,
            };
          default:
            return {
              ...item,
              index: index,
            };
        }
      });
      return ary
        .slice(0, 4)
        .concat({ id: "btn", text: "抽奖按钮" })
        .concat(ary.slice(4));
    },
  },
};
</script>

<style scoped lang="less">
.cj_box {
  width: 85vw;
  height: 85vw;
  margin: auto;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  li {
    width: 25vw;
    height: 25vw;
    background: #eee;
    border-radius: 2vw;
  }
  li.active {
    background-color: #2ba245;
    color: #fff;
  }
  .van-button--normal {
    padding: 0 15px;
    font-size: 6vw;
    width: 100%;
    height: 100%;
    border-radius: 2vw;
  }
}
</style>
