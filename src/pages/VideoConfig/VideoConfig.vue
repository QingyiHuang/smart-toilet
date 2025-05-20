<template>
  <h-page-container v-loading.fullscreen.lock="uploadLoading" class="opmanage">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" />
    <h-page-content>
      <h-layout>
        <h-layout-header>
          <h-page-action>
            <el-button type="iconButton" icon="h-icon-add" @click="addVideo">
              添加
            </el-button>
            <el-button
              type="iconButton"
              icon="h-icon-delete"
              :disabled="selectedId.length <= 0"
              @click="delVideo"
            >
              删除
            </el-button>
            <el-button
              type="iconButton"
              icon="h-icon-import"
              @click="batchAddVideo"
            >
              批量导入
            </el-button>
            <el-input
              v-model="search.name"
              class="inputArea"
              placeholder="素材名称"
              @keyup.enter.native="searchNative"
            ></el-input>
          </h-page-action>
        </h-layout-header>
        <h-layout-content overflow>
          <el-table
            ref="multipleTable"
            :data="tableData"
            force-scroll
            stripe
            @selection-change="handleSelectionChange"
          >
            <h-empty slot="empty" :img="require('@/assets/empty.png')" />
            <el-table-column type="selection" />
            <el-table-column prop="snCode" label="素材" width="200">
              <template v-slot="scope">
                <div class="thumbArea">
                  <el-popover
                    ref="popover4"
                    placement="right-start"
                    trigger="hover"
                    :popper-options="options1"
                    popper-class="img-popover"
                  >
                    <div slot="reference" class="img-wrapper">
                      <img :src="scope.row.thumbnail || noimg" alt="图片预览" />
                    </div>
                    <div class="preview-tips-img-wrapper">
                      <img
                        class="preview-tips-img"
                        :src="scope.row.thumbnail || noimg"
                        alt="图片预览"
                      />
                    </div>
                  </el-popover>

                  <!-- 如果是视频，则显示播放按钮 -->
                  <div
                    v-if="scope.row.type === 'VIDEO'"
                    class="playBtn"
                    @click="previewVideo(scope.row.url)"
                  ></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="素材名称" width="220" />
            <el-table-column prop="tolietNames" label="关联公厕">
              <template v-slot="scope">
                <div>
                  {{
                    scope.row.tolietNames ? scope.row.tolietNames.join() : '--'
                  }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  icon="h-icon-associate"
                  size="mini"
                  @click="handleConnect(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </h-layout-content>
        <h-layout-footer>
          <el-pagination
            :current-page="search.pageNo"
            :page-sizes="[20, 30, 40, 50]"
            :page-size="search.pageSize"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </h-layout-footer>
      </h-layout>
      <TableTransfer ref="tableTransfer" @connectSuccess="getPage" />
      <BatchImport ref="batchImport" @refresh="getPage" />
      <Previewer ref="previewer" />
    </h-page-content>
  </h-page-container>
</template>

<script>
// import moment from 'moment';
import TableTransfer from './components/TableTransfer.vue';
import BatchImport from './components/BatchImport.vue';
import MaterialApi from '@/api/material.js';
import Previewer from './components/Previewer.vue';
export default {
  components: {
    TableTransfer,
    BatchImport,
    Previewer
  },
  data() {
    return {
      breadcrumb: ['系统管理', '应用配置中心', '智慧公厕监管应用', '素材管理'],
      search: {
        name: '',
        pageSize: 20,
        pageNo: 1
      },
      tableData: [],
      total: 0,
      uploadLoading: false,
      options: [{ value: '', label: '全部' }],
      noimg: require('@/assets/images/nomater.png'),
      selectedId: []
    };
  },
  computed: {
    options1() {
      const paginationHeight = 56; // 这里根据实际情况，取得视窗下方要保留的距离，这里就是分页器的高度
      return {
        onUpdate(dataObj) {
          const instance = dataObj.instance;
          // 为了保证tooltip不遮挡分页器，这里计算视窗下方要保留的区域，在更新的回调中计算进去即可
          dataObj.boundaries.bottom -= paginationHeight;
          instance.runModifiers(dataObj, instance._options.modifiers);
        }
      };
    }
  },
  activated() {
    this.getPage();
  },
  methods: {
    addVideo() {
      this.$router.push({
        path: '/AddOneVideo'
      });
    },
    batchAddVideo() {
      this.$refs.batchImport.showImportDialog = true;
    },
    delVideo() {
      // 批量删除素材
      const arr = [];
      this.selectedId.map(item => {
        arr.push(item.id);
      });
      this.$confirm('此操作将永久删除该文件, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        onConfirm: () => {
          MaterialApi.deleteIds({
            ids: arr
          }).then(res => {
            if (res.code === '0') {
              this.$message.success('删除成功');
              this.getPage();
            }
          });
        }
      });
    },
    handleConnect(row) {
      this.$refs.tableTransfer.dialogVisible = true;
      this.$refs.tableTransfer.mid = row.id;
      this.$refs.tableTransfer.initData = row.tolietInfos || [];
    },
    searchNative() {
      this.search.pageNo = 1;
      this.getPage();
    },
    // 获取素材分页信息
    getPage() {
      this.uploadLoading = true;
      MaterialApi.queryPage({
        name: this.search.name,
        pageNo: this.search.pageNo,
        pageSize: this.search.pageSize
      })
        .then(res => {
          this.uploadLoading = false;
          if (res.code === '0') {
            this.tableData = res.data.list;
            this.total = Number(res.data.total);
          }
        })
        .catch(() => {
          this.uploadLoading = false;
        });
    },
    handleSizeChange(val) {
      this.search.pageSize = val;
      this.search.pageNo = 1;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.search.pageNo = val;
      this.getPage();
    },
    previewVideo(val) {
      this.$refs.previewer.videoSrc =
        process.env.NODE_ENV === 'production'
          ? val
          : `https://test${val}`;
      this.$refs.previewer.show = true;
    },
    handleSelectionChange(val) {
      this.selectedId = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.opmanage {
  min-width: 1100px;
}
.thumbArea {
  width: 78px;
  height: 44px;
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
  .playBtn {
    width: 24px;
    height: 24px;
    background: url('~@/assets/images/info-视频02.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -12px;
    margin-top: -12px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
    }
  }
}
.inputArea {
  width: 232px;
  height: 32px;
  position: absolute;
  right: 0px;
  top: 6px;
}
.img-popover {
  padding: 4px;
}
.preview-tips-img-wrapper {
  display: flex;
  width: 538px;
  height: 304px;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.04);
  .preview-tips-img {
    max-width: 538px;
    max-height: 304px;
  }
}
.img-wrapper {
  width: 100%;
  height: 100%;
  // padding: 8px 12px;
  box-sizing: content-box;

  img {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
}
</style>
