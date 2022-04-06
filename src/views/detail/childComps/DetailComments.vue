<template>
  <div class="comments" v-if="Object.keys(commentsInfo).length !== 0">
    <div class="comments-title">
      <span>用户评价</span>
      <span>更多</span>
    </div>
    <div class="user-comments" v-for="(item, index) in commentsInfo.list" :key="index">
      <div class="user-info">
        <img :src="item.user.avatar" alt="" />
        <span>{{ item.user.uname }}</span>
      </div>
      <div class="info-detail">
        <p>{{ item.content }}</p>
        <div class="info-other">
          <span class="date">{{ item.created | showDate }}</span>
          <span>{{ item.style }}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" v-for="(item, index) in item.images" :key="index" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/common/utils.js'

export default {
  name: 'DetailComments',
  props: {
    commentsInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate: function(value) {
      const date = new Date(value * 1000)
      return formatDate(date)
    }
  }
}
</script>

<style scoped>
.comments {
  border-bottom: 5px solid #f2f5f8;
}

.comments-title {
  padding: 15px 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f2f5f8;
}

.user-comments {
  padding: 10px 0 5px;
}

.user-info img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  vertical-align: middle;
}

.user-info span {
  font-size: 15px;
  margin-left: 10px;
}

.info-detail {
  padding: 0 5px 15px;
}

.info-detail p {
  font-size: 14px;
  color: #777;
  line-height: 1.5;
}

.info-detail .info-other {
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}

.info-other .date {
  margin-right: 8px;
}

.info-imgs {
  margin-top: 10px;
}

.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>
