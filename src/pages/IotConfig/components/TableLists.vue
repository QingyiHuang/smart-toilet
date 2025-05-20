<template>
  <div class="tables">
    <ScrollbarWrapper>
      <div class="TablesHeader">
        <h-page-group>
          <h-page-detail>
            <h-page-detail-item label="公厕名称">
              <p class="itemP">{{ toiletInfo.name }}</p>
            </h-page-detail-item>
            <h-page-detail-item label="设备地址">
              <p class="itemP">{{ toiletInfo.address }}</p>
            </h-page-detail-item>
            <h-page-detail-item label="厕位配置">
              <p class="itemP">{{ toiletInfo.toiletAllocation }}</p>
            </h-page-detail-item>
            <h-page-detail-item label="物联感知">
              <p class="itemP">{{ toiletInfo.deviceAllocation }}</p>
            </h-page-detail-item>
            <h-page-detail-item label="更新时间">
              <p class="itemP">{{ toiletInfo.updateTime }}</p>
            </h-page-detail-item>
            <h-page-detail-item label="通用设备类型">
              <div>
                <span
                  :class="{
                    toiletDeviceBox: true,
                    toiletDeviceBoxActive: toiletInfo.screenFlag
                  }"
                >
                  有信息屏
                </span>
                <span
                  :class="{
                    toiletDeviceBox: true,
                    toiletDeviceBoxActive: toiletInfo.gatewayFlag
                  }"
                >
                  有网关
                </span>
              </div>
            </h-page-detail-item>
          </h-page-detail>
        </h-page-group>
      </div>
      <div class="oneTable">
        <div class="tableTitle">
          <div class="leftTitle">通用设备</div>
          <div class="rightBtn">
            <el-button icon="h-icon-add" @click="addCommonEquip">
              添加通用设备
            </el-button>
          </div>
        </div>
        <div class="tableContent">
          <el-table :data="tableData1" style="width: 100%">
            <h-empty slot="empty" :img="require('@/assets/empty.png')" />
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="deviceTypeName" label="设备类型" />
            <el-table-column prop="sn" label="设备编码" />
            <el-table-column prop="ownershipUnit" label="权属单位" />
            <el-table-column prop="onlineStatusName" label="在线状态">
              <template v-slot="scope">
                <p
                  :style="{
                    color:
                      scope.row.onlineStatus === 1
                        ? 'rgba(0,0,0,.7)'
                        : '#FA3239'
                  }"
                >
                  {{ scope.row.onlineStatusName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="注册日期" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  icon="h-icon-details"
                  size="mini"
                  @click="handleDetail('common', scope.row)"
                />

                <el-button
                  icon="h-icon-edit"
                  size="mini"
                  @click="handleEdit('common', scope.row)"
                />
                <el-button
                  icon="h-icon-delete"
                  size="mini"
                  @click="handleDelete('common', scope.row)"
                />
                <el-button
                  v-if="scope.row.deviceType === 'BIG_SCREEN'"
                  icon="h-icon-location"
                  size="mini"
                  title="坑位配置"
                  :disabled="!scope.row.positionPic"
                  @click="handleMark(scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="oneTable">
        <div class="tableTitle">
          <div class="leftTitle">男厕</div>
          <div class="rightBtn">
            <el-button icon="h-icon-add" @click="addOtherEquip(1)">
              添加设备
            </el-button>
          </div>
        </div>
        <div class="tableContent">
          <el-table :data="tableData2" style="width: 100%">
            <h-empty slot="empty" :img="require('@/assets/empty.png')" />
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="deviceTypeName" label="设备类型" />
            <el-table-column prop="sn" label="设备编码" />
            <el-table-column prop="ownershipUnit" label="权属单位" />
            <!-- <el-table-column prop="name" label="安装厕位" /> -->
            <el-table-column prop="onlineStatusName" label="在线状态">
              <template v-slot="scope">
                <p
                  :style="{
                    color:
                      scope.row.onlineStatus === 1
                        ? 'rgba(0,0,0,.7)'
                        : '#FA3239'
                  }"
                >
                  {{ scope.row.onlineStatusName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="abnormalStatusName" label="异常状态">
              <template v-slot="scope">
                <p
                  :style="{
                    color: scope.row.abnormalStatusName
                      ? 'red'
                      : 'rgba(0,0,0,0.7)'
                  }"
                >
                  {{ scope.row.abnormalStatusName || '--' }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="注册日期" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  icon="h-icon-details"
                  size="mini"
                  @click="handleDetail('toilet', scope.row)"
                />
                <el-button
                  icon="h-icon-edit"
                  size="mini"
                  @click="handleEdit('toilet', scope.row)"
                />
                <el-button
                  icon="h-icon-delete"
                  size="mini"
                  @click="handleDelete('toilet', scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="oneTable">
        <div class="tableTitle">
          <div class="leftTitle">女厕</div>
          <div class="rightBtn">
            <el-button icon="h-icon-add" @click="addOtherEquip(2)">
              添加设备
            </el-button>
          </div>
        </div>
        <div class="tableContent">
          <el-table :data="tableData3" style="width: 100%">
            <h-empty slot="empty" :img="require('@/assets/empty.png')" />
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="deviceTypeName" label="设备类型" />
            <el-table-column prop="sn" label="设备编码" />
            <el-table-column prop="ownershipUnit" label="权属单位" />
            <!-- <el-table-column prop="name" label="安装厕位" /> -->
            <el-table-column prop="onlineStatusName" label="在线状态">
              <template v-slot="scope">
                <p
                  :style="{
                    color:
                      scope.row.onlineStatus === 1
                        ? 'rgba(0,0,0,.7)'
                        : '#FA3239'
                  }"
                >
                  {{ scope.row.onlineStatusName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="abnormalStatusName" label="异常状态">
              <template v-slot="scope">
                <p
                  :style="{
                    color: scope.row.abnormalStatusName
                      ? 'red'
                      : 'rgba(0,0,0,0.7)'
                  }"
                >
                  {{ scope.row.abnormalStatusName || '--' }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="注册日期" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  icon="h-icon-details"
                  size="mini"
                  @click="handleDetail('toilet', scope.row)"
                />
                <el-button
                  icon="h-icon-edit"
                  size="mini"
                  @click="handleEdit('toilet', scope.row)"
                />
                <el-button
                  icon="h-icon-delete"
                  size="mini"
                  @click="handleDelete('toilet', scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="toiletInfo.pitNumOfThird" class="oneTable">
        <!-- 在第三厕没有的时候要做隐藏操作 -->
        <div class="tableTitle">
          <div class="leftTitle">第三厕</div>
          <div class="rightBtn">
            <el-button icon="h-icon-add" @click="addOtherEquip(3)">
              添加设备
            </el-button>
          </div>
        </div>
        <div class="tableContent">
          <el-table :data="tableData4" style="width: 100%">
            <h-empty slot="empty" :img="require('@/assets/empty.png')" />
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="deviceTypeName" label="设备类型" />
            <el-table-column prop="sn" label="设备编码" />
            <el-table-column prop="ownershipUnit" label="权属单位" />
            <!-- <el-table-column prop="name" label="安装厕位" /> -->
            <el-table-column prop="onlineStatusName" label="在线状态">
              <template v-slot="scope">
                <p
                  :style="{
                    color:
                      scope.row.onlineStatus === 1
                        ? 'rgba(0,0,0,.7)'
                        : '#FA3239'
                  }"
                >
                  {{ scope.row.onlineStatusName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="abnormalStatusName" label="异常状态">
              <template v-slot="scope">
                <p
                  :style="{
                    color: scope.row.abnormalStatusName
                      ? 'red'
                      : 'rgba(0,0,0,0.7)'
                  }"
                >
                  {{ scope.row.abnormalStatusName || '--' }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" label="注册日期" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  icon="h-icon-details"
                  size="mini"
                  @click="handleDetail('toilet', scope.row)"
                />
                <el-button
                  icon="h-icon-edit"
                  size="mini"
                  @click="handleEdit('toilet', scope.row)"
                />
                <el-button
                  icon="h-icon-delete"
                  size="mini"
                  @click="handleDelete('toilet', scope.row)"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <AddOtherEquipDialog
        ref="equipOtherAdd"
        @toiletDeviceSubmit="toiletDeviceSubmit"
      />
      <AddCommonEquipDialog
        ref="equipCommonAdd"
        @commonSubmit="queryAllDevice"
      />
    </ScrollbarWrapper>
    <DragDialog :id="toiletInfo.id" ref="dragDialog" />
  </div>
</template>

<script>
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
import AddOtherEquipDialog from './AddOtherEquipDialog.vue';
import AddCommonEquipDialog from './AddCommonEquipDialog.vue';
import DeviceApi from '@/api/device';
import Api from '@/api/index';
import DragDialog from '@/components/dialog/DragDialog.vue';
export default {
  components: {
    ScrollbarWrapper,
    AddOtherEquipDialog,
    AddCommonEquipDialog,
    DragDialog
  },
  data() {
    return {
      toiletInfo: {},
      tableData1: [],
      tableData2: [],
      tableData3: [],
      tableData4: []
    };
  },
  methods: {
    // 所有table执行search
    queryTableAll() {
      this.initToiletInfo();
    },
    // 初始化公厕信息
    initToiletInfo() {
      if (window.sessionStorage.getItem('editToilet')) {
        this.toiletInfo = JSON.parse(
          window.sessionStorage.getItem('editToilet')
        );
        this.queryAllDevice();
      }
    },
    // 查询所有设备
    queryAllDevice() {
      this.queryToiletInfo();
      this.queryCommonDevices();
      this.queryGetFemaleDevices();
      this.queryGetMaleDevices();
      this.queryGetThirdDevices();
    },
    // 查询公厕信息
    queryToiletInfo() {
      Api.getToilet({
        id: this.toiletInfo.id
      }).then(res => {
        if (res.code === '0') {
          this.toiletInfo = res.data;
        }
      });
    },
    // id查通用设备
    queryCommonDevices() {
      DeviceApi.getCommonDevices({
        toiletId: this.toiletInfo.id
      }).then(res => {
        if (res.code === '0') {
          this.tableData1 = res.data;
        }
      });
    },
    // id查男厕
    queryGetMaleDevices() {
      DeviceApi.getMaleDevices({
        toiletId: this.toiletInfo.id
      }).then(res => {
        if (res.code === '0') {
          this.tableData2 = res.data;
        }
      });
    },
    // id查女厕
    queryGetFemaleDevices() {
      DeviceApi.getFemaleDevices({
        toiletId: this.toiletInfo.id
      }).then(res => {
        if (res.code === '0') {
          this.tableData3 = res.data;
        }
      });
    },

    // id查第三厕所
    queryGetThirdDevices() {
      // 在有第三厕时执行查询没有不执行
      if (this.toiletInfo.pitNumOfThird) {
        DeviceApi.getThirdDevices({
          toiletId: this.toiletInfo.id
        }).then(res => {
          if (res.code === '0') {
            this.tableData4 = res.data;
          }
        });
      }
    },
    addOtherEquip(val) {
      this.$refs.equipOtherAdd.baseForm.toiletType =
        val === 1 ? 'MALE' : val === 2 ? 'FEMALE' : 'THIRD';
      this.$refs.equipOtherAdd.dialogVisible = true;
    },
    addCommonEquip() {
      this.$refs.equipCommonAdd.dialogVisible = true;
    },
    // 修改一个设备
    handleEdit(type, row) {
      if (type === 'common') {
        this.$refs.equipCommonAdd.dialogVisible = true;
        this.$refs.equipCommonAdd.initValue(row);
      } else if (type === 'toilet') {
        this.$refs.equipOtherAdd.dialogVisible = true;
        this.$refs.equipOtherAdd.initValue(row);
      }
    },
    // 删除一个设备
    handleDelete(type, row) {
      if (type === 'common') {
        this.$confirm(`此操作将永久删除${row.name}, 是否继续?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          onConfirm: () => {
            DeviceApi.removeCommonDevice({
              id: row.id
            }).then(res => {
              if (res.code === '0') {
                this.$message.success(`删除成功`);
                this.queryAllDevice();
              }
            });
          }
        });
      } else if (type === 'toilet') {
        this.$confirm(`此操作将永久删除${row.name}, 是否继续?`, {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          onConfirm: () => {
            DeviceApi.removeToiletDevice({
              id: row.id
            }).then(res => {
              if (res.code === '0') {
                this.$message.success(`删除成功`);
                this.queryToiletInfo();
                if (row.toiletType === 'MALE') {
                  this.queryGetMaleDevices();
                } else if (row.toiletType === 'FEMALE') {
                  this.queryGetFemaleDevices();
                } else {
                  this.queryGetThirdDevices();
                }
              }
            });
          }
        });
      }
    },
    handleDetail(type, row) {
      if (type === 'common') {
        this.$router.push({
          path: '/IotCommonConfigDetail',
          query: { id: row.id }
        });
      } else if (type === 'toilet') {
        this.$router.push({
          path: '/FiveInOneDetail',
          query: { id: row.id }
        });
      }
    },
    toiletDeviceSubmit(val) {
      this.queryToiletInfo();
      if (val === 'MALE') {
        this.queryGetMaleDevices();
      } else if (val === 'FEMALE') {
        this.queryGetFemaleDevices();
      } else {
        this.queryGetThirdDevices();
      }
    },
    // 坑位标注功能
    handleMark(row) {
      this.$refs.dragDialog.dialogFormVisible = true;
      this.$refs.dragDialog.setBackGround(row.positionPic);
    }
  }
};
</script>

<style lang="scss" scoped>
.tables {
  height: 100%;
  .TablesHeader {
    background-color: rgb(245, 245, 245);
    padding: 40px 40px 0 40px;
    overflow: hidden;
    .h-page-group {
      margin-bottom: 0;
    }
  }
  .oneTable {
    background-color: rgb(245, 245, 245);
    padding: 12px;
    .tableTitle {
      height: 48px;
      position: relative;
      border-bottom: 1px solid rgb(223, 223, 223);
      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        width: 170px;
        height: 48px;
        background: url('~@/assets/images/card-设备标题底板.png') no-repeat;
        background-size: 100% 100%;
      }
      .leftTitle {
        font-family: MicrosoftYaHeiUI;
        font-size: 16px;
        color: #ffffff;
        letter-spacing: 0;
        line-height: 48px;
        position: absolute;
        left: 16px;
        top: 0;
      }
      .rightBtn {
        position: absolute;
        right: 14px;
        top: 2px;
      }
    }
    .tableContent {
      padding: 14px;
      background-color: #ffffff;
      .el-table {
        min-height: 200px;
        .h-empty {
          margin-top: 106px;
        }
      }
    }
  }
}
.itemP {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.9);
  letter-spacing: 0;
  font-weight: 550;
}
.toiletDeviceBox {
  border: 1px solid rgb(172, 172, 172);
  color: rgb(172, 172, 172);
  background-color: rgb(247, 247, 247);
  padding: 1px 4px;
  display: inline-block;
  margin-right: 8px;
  border-radius: 2px;
  margin-top: 8px;
  font-size: 12px;
  margin-bottom: 16px;
}
.toiletDeviceBoxActive {
  border: 1px solid #2196f3;
  color: #2196f3;
  background-color: rgb(238, 247, 255);
}
.css {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>
