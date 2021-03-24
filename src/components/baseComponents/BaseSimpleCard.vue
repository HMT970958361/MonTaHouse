<template>
  <div class="base-simple-card">
    <div class="house-photo">
      <a href="">
        <img
          :src="'../../assets/images'+card.photourl"
          :alt="card.community"
          class="hot-icon"
        />
      </a>
    </div>
    <div class="house-addr">
      <p>{{ card.cities }}·{{ card.districts }}</p>
      <p>{{ card.community }}</p>
    </div>
    <div class="house-msg">
      <span>{{ card.area }}</span>
      <span>{{ card.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:['card','showMap'],
  data() {
    return {
    };
  },
};
</script>

<style lang="less">
.base-simple-card {
  width: 220px;
}
.house-photo {
  width: 220px;
  height: 200px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgb(121, 121, 121);
  img {
    width: 220px;
    height:200px;
    transition: all 1s;
    &:hover {
      transform: scale(1.2);
      transition: all 1s;
    }
  }
}
.hot-icon {
  color: red;
  //待完成
}
.house-addr {
  font-weight: bold;
  margin-top:10px;
}
.house-msg {
  margin-top:10px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  span:last-child {
    color: rgb(0, 119, 255);
    font-size: 18px;
  }
}
</style>