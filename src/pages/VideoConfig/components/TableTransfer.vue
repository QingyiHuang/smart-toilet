<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    :area="[983, 532]"
    @opened="queryOrgTree"
    @close="clearVal"
  >
    <div class="boxOuter">
      <!-- 左侧树选择 -->
      <div class="leftTree">
        <p class="boxTitle">公厕所属组织</p>
        <el-input
          v-model="filterText"
          placeholder="输入关键字进行搜索"
          class="filter-tree-input"
        ></el-input>
        <ScrollbarWrapper class="diyWrapper">
          <div class="tree-wrap">
            <el-tree
              ref="tree2"
              :data="dataFilter"
              :props="defaultProps"
              :filter-node-method="filterNode"
              :default-expanded-keys="defaultExpandedKeys"
              :render-content="highlightRender"
              simple-data
              node-key="indexCode"
              parent-key="parentIndexCode"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </ScrollbarWrapper>
      </div>
      <h-table-transfer
        ref="tableTransfer"
        :left-table-data="tableTreeLeft"
        :right-table-data="tableTreeRight"
        row-key="id"
        parent-key="orgCode"
        name-key="name"
        tree-node-id="root"
        :is-show-check-box="false"
        :load-num="30"
        left-table-title="待选择公厕"
        right-table-title="已选择公厕"
        right-table-input-ph="公厕名称"
        left-table-input-ph="公厕名称"
      >
        <template slot="leftTableColumn">
          <el-table-column
            label="名称"
            prop="name"
            :show-overflow-title="true"
          ></el-table-column>
        </template>
        <template slot="rightTableColumn">
          <el-table-column
            label="名称"
            prop="name"
            :show-overflow-title="true"
          ></el-table-column>
        </template>
        <template slot="empty">
          <p>暂无数据</p>
        </template>
      </h-table-transfer>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="linkToilet">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
import OrgApi from '@/api/org.js';
import ToiletApi from '@/api/index';
import MaterialApi from '@/api/material.js';
export default {
  components: {
    ScrollbarWrapper
  },
  data() {
    return {
      dialogVisible: false,
      tableTreeLeft: [],
      tableTreeRight: [],
      filterText: '',
      dataFilter: [],
      defaultExpandedKeys: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      bigTestData2: [],
      mid: '',
      initData: []
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val, !this.filterText);
    }
  },
  methods: {
    // 查询组织树
    queryOrgTree() {
      if (this.initData && this.initData.length) {
        this.tableTreeRight = this.initData;
        this.tableTreeRight.map(item => {
          item.belongArea = 'root';
        });
      } else {
        this.tableTreeRight = [];
      }

      OrgApi.syncTree({}).then(res => {
        if (res.code === '0') {
          this.dataFilter = res.data;
          this.defaultExpandedKeys = [
            res.data.length ? res.data[0].indexCode : ''
          ];
        }
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(node) {
      // 左侧组织树点击后
      ToiletApi.toiletList({
        orgCode: node.indexCode
      }).then(res => {
        if (res.code === '0') {
          // 左侧表格赋值
          this.tableTreeLeft = res.data;
        }
      });
    },
    highlightRender(h, { node }) {
      const name = node.label;
      if (this.filterText) {
        // 支持大小写模糊搜索
        // specialCharts：特殊字符集合，这些字符不能直接塞进正则里，需要先转译
        const specialCharts = [
          '(',
          ')',
          "'",
          '\\',
          '$',
          '*',
          '+',
          '[',
          ']',
          '?',
          '^',
          '{',
          '}',
          '|',
          '.'
        ];
        let wordStr = '';
        for (let i = 0, len = this.filterText.length; i < len; i++) {
          if (specialCharts.includes(this.filterText[i])) {
            wordStr += '\\' + this.filterText[i];
          } else {
            wordStr += this.filterText[i];
          }
        }
        const wordReg = new RegExp(wordStr, 'ig');
        const keyWordArr = name.match(wordReg);
        const vNodeArr = name.split(wordReg).reduce((all, item, index, arr) => {
          item && all.push(h('span', {}, item));
          if (index !== arr.length - 1) {
            all.push(
              h(
                'span',
                {
                  class: 'el-tree-node_highlight'
                },
                keyWordArr.shift()
              )
            );
          }
          return all;
        }, []);
        return h('span', { class: 'el-tree-node__label' }, vNodeArr);
      } else {
        return h('span', { class: 'el-tree-node__label' }, name);
      }
    },
    // 素材链接公厕
    linkToilet() {
      const rightData =
        this.$refs.tableTransfer.getCacheData().rightTableCacheData;
      const toiletIds = [];
      rightData.map(item => {
        toiletIds.push(item.id);
      });

      setTimeout(() => {
        MaterialApi.linkToilet({
          materialId: this.mid,
          materialIds: [],
          toiletId: '',
          toiletIds: toiletIds
        }).then(res => {
          if (res.code === '0') {
            this.$message.success('设置成功');
            this.dialogVisible = false;
            this.$emit('connectSuccess');
          }
        });
      }, 0);
    },
    clearVal() {
      this.dataFilter = [];
      this.tableTreeLeft = [];
      this.tableTreeRight = [];
      this.initData = [];
      this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.boxOuter {
  width: 944px;
  height: 400px;
  position: relative;
  margin: 0 auto;
  .leftTree {
    position: absolute;
    left: 0;
    top: 0;
    width: 240px;
    height: 400px;
    border: 1px solid #e5e5e5;
    border-right: none;
    padding: 14px 16px;
  }
  .h-table-transfer {
    width: 704px;
    margin-left: 240px;
  }
  .diyWrapper {
    height: calc(100% - 53px);
  }
}
.boxTitle {
  font-family: MicrosoftYaHeiUI;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  letter-spacing: 0;
  line-height: 20px;
  font-weight: 400;
  margin-bottom: 14px;
}
</style>
