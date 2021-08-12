<template>
  <el-popover
      placement="top"
      width="400"
      trigger="click">
      <p class="m4"><span class="red">[]</span>: 空间信息,表示该位置至少出现一个标准特征（除负信息外的关键词、词性或标点符号任一）</p>
      <p class="m4"><span class="red">/</span>: 每个特征中存在选择、或的关系</p>
      <p class="m4"><span class="red">&</span>: 每个特征中存在并、和的关系</p>
      <p class="m4"><span class="red">()</span>: 表示一个特征可有可无</p>
      <p class="m4"><span class="red">-</span>: 位置负信息,以-开头，后紧跟限制条件，限制两个特征中间不能出现一些特征</p>
      <p class="m4"><span class="red">=关键词1+关键词2</span>: 连续关键词错误负信息+,限制后面的词性信息不能是关键词1且关键词1后面不能是关键词2</p>
      <p class="m4"><span class="red">=关键词1$关键词2</span>: 连续关键词错误负信息$,限制后面的词性信息不能是关键词1且关键词1后面不能是关键词2</p>
      <p class="m4"><span class="red">=</span>: 错误负信息,以=开头，限制某特征不能由该符号后的特征信息充当，该错误负信息一般标注在该特征前紧挨的位置</p>
      <p class="m4"><span class="red">=[&</span>: 左错误负信息,以=[&开头，限制在一段开头或者某特征紧跟的位置不能是某些特征</p>
      <p class="m4"><span class="red">=]&</span>: 右错误负信息,以=]&开头，限制在一段的结尾或某特征前紧挨的位置不能是某些特征</p>
      <span slot="reference" class="icon" title="点击查看语义特征说明"><i class="el-icon-info"></i></span>
      <!-- <el-button slot="reference" size="mini" circle style="font-size: 12px;"><i class="el-icon-info"></i></el-button> -->
    </el-popover>
</template>

<script>
</script>

<style scoped>
  p.m4{
    margin: 4px 0;
  }
  .red{
    color: #f00;
  }
  span.icon{
    display: inline-block;
    font-size: 20px;
    margin-left: 3px;
    cursor: pointer;
  }
</style>
