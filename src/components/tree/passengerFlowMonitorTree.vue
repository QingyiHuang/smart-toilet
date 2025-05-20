<template>
  <!-- 左侧区域树，右侧客流设备 -->
  <h-select-tree-option
    v-model="checked"
    style="width: 100%"
    is-broad
    type="radio"
    :data="treeData"
    :has-contain="false"
    :has-footer="false"
    :has-header="false"
    :option-data="optionData"
    :option="option"
    :option-search-fn="searchFn"
    placeholder="请选择"
    @tree-search="treeSearch"
  >
    <template slot="tree">
      <el-tree
        :ref="treeConfig.ref"
        :node-key="treeConfig.nodeKey"
        :parent-key="treeConfig.parentKey"
        :props="defaultProps"
        simple-data
        :data.sync="treeData"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ data }" style="vertical-align: middle">
          <h-highlight color="#2080F7" :highlight-key="highlightKey">
            {{ data.label }}
          </h-highlight>
        </span>
      </el-tree>
    </template>
    <!-- <template slot="pagination">
      <el-pagination
        :current-page="pager.pageNo"
        :page-size="pager.pageSize"
        :total="total"
        small
        layout="first, prev, miniPager, next, last"
        @current-change="pageNoChange"
      ></el-pagination>
    </template> -->
  </h-select-tree-option>
</template>
<script>
import OrgApi from '@/api/org.js';
export default {
  props: {
    defaultChecked: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      pager: {
        IndexCode: '',
        pageNo: 1,
        pageSize: 20
      },
      total: 0,
      checked: {
        values: '',
        datas: {}
      },
      treeConfig: {
        nodeKey: 'id',
        parentKey: 'parentId',
        ref: 'deviceTree'
      },
      optionData: [],
      option: { name: 'name', value: 'code', disabled: 'disabled' },
      defaultProps: {
        label: 'label',
        svgIcon: 'svgIcon'
      },
      treeData: [],
      highlightKey: ''
    };
  },
  watch: {
    checked(val) {
      this.$emit('input', val.values, val.datas);
      this.$emit('change', val.datas);
    },
    defaultChecked: {
      immediate: true,
      handler(obj) {
        // 修改时传入选项数据
        if (obj && obj.code) {
          this.checked = {
            values: obj.code,
            datas: obj
          };
          this.optionData = [obj];
        }
      }
    }
  },
  created() {
    // 查询区域
    OrgApi.syncTree({}).then(res => {
      if (res.code === '0') {
        const { data } = res;
        this.treeData = (data || []).map(node => {
          return {
            id: node.indexCode,
            parentId: node.parentIndexCode,
            label: node.name,
            isLeaf: false,
            svgIcon: 'svg-organization'
          };
        });
      }
    });
  },
  methods: {
    // 根据组织节点查询设备
    handleNodeClick(data) {
      this.pager.IndexCode = data.id;
      this.queryData();
    },
    // 分页查询设备
    queryData() {
      OrgApi.cameraNormal({
        containChildRegion: true,
        indexCode: this.pager.IndexCode
      }).then(res => {
        if (res.code === '0') {
          this.optionData = (res.data || []).map(node => {
            return {
              parentId: node.orgIndexCode,
              name: node.name,
              code: node.indexCode,
              deviceCode: node.deviceIndexCode
            };
          });
        }
      });
    },
    // 根据名称关键字查询设备
    searchFn(val) {
      this.pager.companyName = val;
      this.queryData();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.includes(value);
    },
    treeSearch(value) {
      this.highlightKey = value;
      this.$refs[this.treeConfig.ref].filter(value, !value);
    },
    reset() {
      this.checked = {
        values: '',
        datas: {}
      };
    },
    pageNoChange() {}
  }
};
</script>
