<template>
  <h-tree-select
    v-model="singleData"
    :tree-data="baseData"
    filter
    show-checkbox
    simple-data
    :props="defaultProp"
    node-key="indexCode"
    parent-key="parentIndexCode"
    :clearable="false"
    check-strictly
    @check-change="checkChange"
  ></h-tree-select>
</template>

<script>
import OrgApi from '@/api/org.js';
export default {
  props: {
    defaultId: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      singleData: [],
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
    // nodeClick(val) {
    //   this.$emit('input', this.singleData, val.name);
    // },
    checkChange() {
      this.$nextTick(() => {
        this.$emit('changeData', this.singleData);
      });
    },
    // setValue(val) {
    //   this.singleData = val;
    // },
    // 获取key和对应的label
    async getValue() {
      const arr = [];
      await this.$nextTick(() => {
        (this.singleData || []).map(item => {
          this.baseData.some(one => {
            if (one.indexCode === item) {
              arr.push({
                indexCode: one.indexCode,
                name: one.name
              });
            }
          });
        });
      });
      return arr;
    },
    // 查询组织树
    queryOrgTree() {
      OrgApi.syncTree({}).then(res => {
        if (res.code === '0') {
          this.baseData = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
