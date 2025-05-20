<template>
  <h-tree-select
    v-model="singleData"
    :tree-data="baseData"
    filter
    simple-data
    :props="defaultProp"
    node-key="indexCode"
    parent-key="parentIndexCode"
    :clearable="false"
    @node-click="nodeClick"
  ></h-tree-select>
</template>

<script>
import OrgApi from '@/api/org.js';
export default {
  props: {
    defaultId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      singleData: '',
      baseData: [],
      defaultProp: {
        label: 'name'
      }
    };
  },
  watch: {
    defaultId: {
      immediate: true,
      handler(id) {
        // 树渲染延迟100ms
        setTimeout(() => {
          this.singleData = id;
          this.$forceUpdate();
        }, 500);
      }
    }
  },
  created() {
    this.queryOrgTree();
  },
  methods: {
    nodeClick(val) {
      this.$emit('input', this.singleData, val.name, val.path);
    },
    // 查询组织树
    queryOrgTree() {
      OrgApi.syncTree({}).then(res => {
        if (res.code === '0') {
          this.baseData = res.data;
        }
      });
    },
    reset() {
      this.singleData = '';
    }
  }
};
</script>

<style lang="scss" scoped></style>
