<template>
  <van-cell class="article-item-container">
    <template #title>
      <div class="title">{{ article.title }}</div>
    </template>

    <!-- 底部信息部分 -->
    <template #label>
      <!-- 根据type数来确实是否显示3组图片的结构 -->
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(image, index) in article.cover.images"
          :key="index"
        >
          <van-image
            class="tripe-image"
            fit="cover"
            :src="image"
          />
        </div>
      </div>

      <!-- 文章信息 -->
      <div class="label-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }} 评论</span>
        <span>{{ article.pubdate | relativeTime}}</span>
      </div>
    </template>

    <!-- 如果只有一张图片，则放到右边 -->
    <template #default v-if="article.cover.type === 1">
      <van-image
        class="right-image"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped lang="less">
.article-item-container {
  .title {
    font-size: 36px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    padding-left: 24px;
    .right-image {
      width: 232px;
      height: 146px;
    }
  }

  .label-wrap {
    margin-top: 25px;
    span {
      margin-right: 16px;
    }
  }

  .cover-wrap {
    display: flex;

    .cover-item {
      flex: 1;

      &:not(:last-child) {
        padding-right: 6px;
      }

      .tripe-image {
        width: 100%;
        height: 146px;
      }
    }
  }

}
</style>
