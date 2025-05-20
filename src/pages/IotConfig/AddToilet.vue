<template>
  <h-page-container v-loading.fullscreen.lock="diyLoading">
    <h-page-header slot="pageHeader" :breadcrumb="breadcrumb" return-icon />
    <ScrollbarWrapper class="diyWrapper">
      <h-page-content style="padding: 0">
        <div class="add-Config">
          <el-form
            ref="baseForm"
            label-position="top"
            :model="baseForm"
            content-width="480px"
            :rules="rules"
          >
            <el-form-item label="公厕图片" prop="pictureData">
              <ImgUpload ref="imgUploader" />
            </el-form-item>
            <el-form-item label="公厕名称" required prop="name">
              <el-input
                v-model="baseForm.name"
                placeholder=""
                :maxlength="32"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属组织" required prop="orgCode">
              <OrgTree
                ref="orgTree"
                v-model="baseForm.orgCode"
                :default-id="defaultOrgId"
                @input="orgInput"
              />
            </el-form-item>
            <el-form-item label="权属单位" required prop="ownershipUnit">
              <el-input
                v-model="baseForm.ownershipUnit"
                placeholder=""
                :maxlength="32"
              ></el-input>
            </el-form-item>
            <el-form-item label="地址" required prop="address">
              <el-input
                v-model="baseForm.address"
                placeholder=""
                :maxlength="32"
              ></el-input>
            </el-form-item>
            <el-form-item label="" class="timeItem">
              <div class="timeItemBox">
                <el-form-item
                  label="经度"
                  class="timeSelectItem"
                  style="width: calc(50% - 25px)"
                  prop="longitude"
                >
                  <el-input v-model="baseForm.longitude" :maxlength="18">
                    <template slot="append">
                      <span class="fontBorder">度</span>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item
                  label="纬度"
                  class="timeSelectItem"
                  style="width: calc(50% - 25px)"
                  prop="latitude"
                >
                  <el-input v-model="baseForm.latitude" :maxlength="18">
                    <template slot="append">
                      <span class="fontBorder">度</span>
                    </template>
                  </el-input>
                </el-form-item>
                <el-button
                  style="margin-top: 32px; padding: 0 4px; margin-left: 8px"
                  icon="h-icon-location"
                  @click="openMap"
                />
              </div>
            </el-form-item>
            <el-form-item label="男厕厕位" required prop="pitNumOfMale">
              <el-input
                v-model.number="baseForm.pitNumOfMale"
                placeholder=""
                :maxlength="32"
              ></el-input>
            </el-form-item>
            <el-form-item label="女厕厕位" required prop="pitNumOfFemale">
              <el-input
                v-model.number="baseForm.pitNumOfFemale"
                placeholder=""
                :maxlength="32"
              ></el-input>
            </el-form-item>
            <el-form-item label="第三厕位" prop="pitNumOfThird">
              <el-input
                v-model.number="baseForm.pitNumOfThird"
                placeholder=""
                :maxlength="32"
              ></el-input>
            </el-form-item>
            <el-form-item label="客流统计方式" prop="flowCountType">
              <el-radio-group v-model="baseForm.flowCountType">
                <el-radio
                  v-for="item in flowTypes"
                  :key="item.code"
                  :label="item.code"
                >
                  {{ item.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="客流超限报警阈值" prop="flowExceedingThreshold">
              <el-input
                v-model.number="baseForm.flowExceedingThreshold"
                placeholder="请输入客流超限报警阈值"
                :maxlength="10"
              >
                <template slot="append">
                  <span class="fontBorder">人次/天</span>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item label="负责人" prop="chargePerson">
              <el-input
                v-model="baseForm.chargePerson"
                placeholder=""
                :maxlength="32"
              ></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="chargePersonPhone">
              <el-input
                v-model="baseForm.chargePersonPhone"
                placeholder=""
                :maxlength="11"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- </anchor-scroll> -->
      </h-page-content>
    </ScrollbarWrapper>
    <h-page-footer inner-width="500px">
      <el-button type="primary" @click="submitHandle">保存</el-button>
      <el-button @click="back">取消</el-button>
    </h-page-footer>
    <el-dialog
      :area="[816, 510]"
      title="设置坐标"
      no-scrollbar
      :visible.sync="visibleMapDialog"
      custom-class="map-dialog dark-dialog"
      @close="closeMapDialog"
    >
      <div class="map-location-wrap full">
        <Location v-if="visibleMapDialog" ref="location" :lonlat="mapLonlat" />
      </div>
      <span slot="footer" class="map-dialog-footer">
        <el-button type="primary" @click="saveLocation">确 定</el-button>
        <el-button @click="closeMapDialog">取 消</el-button>
      </span>
    </el-dialog>
  </h-page-container>
</template>

<script>
// import MapLocation from '@/components/common/MapLocationHmap.vue';
import Location from '@/components/location';
import ImgUpload from './components/ImgUpload.vue';
import OrgTree from '@/components/tree/orgTreeSelect.vue';
import Api from '@/api/index';
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
const requireRule = (message, type) => {
  const rule = {
    required: true,
    message,
    trigger: 'change,blur'
  };
  if (type) {
    rule.type = type;
  }
  return rule;
};
const NumRule = () => {
  return {
    validator: (rule, value, callback) => {
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        callback();
      } else {
        callback(new Error('请输入数字'));
      }
    },
    trigger: 'change,blur'
  };
};
export default {
  components: {
    // MapLocation,
    Location,
    OrgTree,
    ImgUpload,
    ScrollbarWrapper
  },
  data() {
    return {
      breadcrumb: ['系统管理', '应用配置中心', '智慧公厕监管应用', '添加公厕'],
      editFlag: false,
      baseForm: {
        address: '',
        chargePerson: '',
        chargePersonPhone: '',
        latitude: '',
        longitude: '',
        name: '',
        orgCode: '',
        orgName: '',
        ownershipUnit: '',
        pitNumOfFemale: 0,
        pitNumOfMale: 0,
        pitNumOfThird: 0,
        pictureData: '',
        id: '',
        path: '',
        deletePic: false,
        flowCountType: 'COUNT_BY_FLOW_DEVICE',
        flowExceedingThreshold: 0
      },
      rules: {
        longitude: [requireRule('请选择经纬度', 'number')],
        name: [requireRule('请输入公厕名称')],
        orgCode: [requireRule('请输入所属组织')],
        ownershipUnit: [requireRule('请输入权属单位')],
        address: [requireRule('请输入地址')],
        pitNumOfMale: [requireRule('请输入男厕厕位', 'number'), NumRule()],
        pitNumOfFemale: [requireRule('请输入女厕厕位', 'number'), NumRule()],
        flowExceedingThreshold: [NumRule()]
      },
      diyLoading: false,
      defaultLonLat: [],
      defaultOrgId: '',
      flowTypes: [],
      visibleMapDialog: false
    };
  },
  computed: {
    mapLonlat() {
      const { longitude, latitude, storeAddress } = this.baseForm;
      return longitude && latitude
        ? { lon: longitude, lat: latitude, storeAddress }
        : {};
    }
  },
  created() {
    // 获取客流统计方式

    Api.getFlowCountTypes().then(res => {
      if (res.code === '0') {
        this.flowTypes = res.data;
      }
    });
  },
  mounted() {
    if (window.sessionStorage.getItem('editToilet')) {
      this.breadcrumb = [
        '系统管理',
        '应用配置中心',
        '智慧公厕监管应用',
        '修改公厕'
      ];
      this.editFlag = true;
      const row = JSON.parse(window.sessionStorage.getItem('editToilet'));
      // window.sessionStorage.removeItem('editToilet');
      this.baseForm = {
        address: row.address,
        chargePerson: row.chargePerson,
        chargePersonPhone: row.chargePersonPhone,
        latitude: Number(row.latitude),
        longitude: Number(row.longitude),
        name: row.name,
        orgCode: row.orgCode,
        orgName: row.orgName,
        ownershipUnit: row.ownershipUnit,
        pitNumOfFemale: row.pitNumOfFemale,
        pitNumOfMale: row.pitNumOfMale,
        pitNumOfThird: row.pitNumOfThird,
        pictureData: row.picUrl,
        id: row.id,
        path: row.path,
        deletePic: false,
        flowCountType: row.flowCountType,
        flowExceedingThreshold: row.flowExceedingThreshold
      };
      // this.$refs.orgTree.setValue(row.orgCode);
      this.defaultOrgId = row.orgCode;
      this.defaultLonLat = [Number(row.longitude), Number(row.latitude)];
      this.$refs.baseForm.validateField('longitude');
      if (row.picUrl) {
        this.$refs.imgUploader.base64 = row.picUrl;
      }
    }
  },
  methods: {
    openMap() {
      this.visibleMapDialog = true;
    },
    saveLocation() {
      const { lon, lat } = this.$refs.location.getLonlat();
      this.baseForm.longitude = Number(lon) || '';
      this.baseForm.latitude = Number(lat) || '';
      this.visibleMapDialog = false;
      this.$refs.baseForm.validateField('longitude');
    },
    closeMapDialog() {
      this.visibleMapDialog = false;
    },
    back() {
      this.$router.go(-1);
    },
    getImg(val) {
      if (val) {
        return process.env.NODE_ENV === 'production'
          ? val
          : `https://test:443${val}`;
      } else {
        return '';
      }
    },
    submitHandle() {
      if (this.editFlag) {
        this.$refs.baseForm.validate(valid => {
          if (valid) {
            if (
              // 如果不是base64则不赋值因为未做修改
              this.$refs.imgUploader.base64.includes('/ptsa/')
            ) {
              this.baseForm.pictureData = '';
            } else {
              this.baseForm.pictureData = this.$refs.imgUploader.base64;
              if (this.baseForm.pictureData === '') {
                this.baseForm.deletePic = true;
              }
            }
            this.diyLoading = true;
            Api.updateToilet(this.baseForm)
              .then(res => {
                this.diyLoading = false;
                if (res.code === '0') {
                  this.$message.success('保存成功');
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(() => {
                this.diyLoading = false;
              });
          }
        });
      } else {
        this.$refs.baseForm.validate(valid => {
          if (valid) {
            this.baseForm.pictureData = this.$refs.imgUploader.base64;
            this.diyLoading = true;
            Api.addToilet(this.baseForm)
              .then(res => {
                this.diyLoading = false;
                if (res.code === '0') {
                  this.$message.success('保存成功');
                  this.$router.go(-1);
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(() => {
                this.diyLoading = false;
              });
          }
        });
      }
    },
    orgInput(val, val2, path) {
      this.baseForm.orgName = val2;
      this.baseForm.path = path;
      this.$refs.baseForm.validateField('orgCode');
    }
  }
};
</script>

<style lang="scss" scoped>
.add-Config {
  position: relative;
  width: 500px;
  margin: auto;
  padding: 40px 0 56px;
  .bxd-form {
    position: relative;
    padding: 12px 12px 0;
    margin-bottom: 12px;
    width: 760px;
    background-color: rgb(242, 242, 242);
    border: 1px solid rgb(228, 228, 228);
    .bxd-form-btn {
      position: absolute;
      right: 8px;
      top: 8px;
      z-index: 2;
    }
  }
  .add-btn {
    margin-top: 12px;
    width: 760px;
    height: 32px;
    line-height: 30px;
    border: 1px dashed #ccc;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.04);
    text-align: center;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
}
.tissue {
  font-family: MicrosoftYaHei, 微软雅黑, sans-serif;
  font-weight: 400;
  font-style: normal;
  color: rgba(0, 0, 0, 0.349);
  border-width: 0px;
}
.threeRow {
  .titleBar {
    display: grid;
    grid-template-columns: 26% 34% 40%;
    background-color: rgb(235, 235, 235);
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    // grid-template-rows: 26% 34% 40%;
  }
  .oneRow {
    display: grid;
    grid-template-columns: 26% 34% 40%;
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    .numPart {
      text-indent: 0;
      .unit {
        float: right;
        margin-right: 10px;
      }
    }
  }
}
.diyWrapper {
  height: calc(100% - 112px);
}
::v-deep.timeItem {
  .timeItemBox {
    display: flex;
    // align-items: center;

    .timeSelectItem {
      width: 50%;
      margin-bottom: 5px;

      .el-form-item__content {
        width: 100% !important;
      }

      &:first-of-type {
        margin-right: 10px;
      }
    }

    .h-icon-location {
      // font-size: 2rem;
      // margin-top: 1.5rem;
      cursor: pointer;
    }
  }
}
.map-location-wrap {
  height: 406px;
  width: 100%;
}
</style>
