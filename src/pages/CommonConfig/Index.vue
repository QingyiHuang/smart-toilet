<template>
  <h-page-container v-loading.fullscreen.lock="diyLoading">
    <h-page-header
      slot="pageHeader"
      :breadcrumb="breadcrumb"
      :return-icon="false"
    />
    <ScrollbarWrapper class="diyWrapper">
      <h-page-content style="padding: 0">
        <div class="add-Config">
          <el-form
            ref="baseForm"
            label-position="top"
            :model="baseForm"
            content-width="720px"
            :rules="rules"
          >
            <h-page-group title="接入配置">
              <el-form-item label="萤石AppKey" required prop="appKey">
                <el-input
                  v-model="baseForm.appKey"
                  placeholder="0~32个字符，只允许输入字母、数字"
                  :maxlength="32"
                ></el-input>
              </el-form-item>
              <el-form-item label="萤石AppSecret" required prop="appSecret">
                <el-input
                  v-model="baseForm.appSecret"
                  placeholder="0~32个字符，只允许输入字母、数字"
                  :maxlength="32"
                ></el-input>
              </el-form-item>
            </h-page-group>
            <h-page-group title="阈值配置">
              <el-form-item
                label="离线阈值"
                required
                prop="offlineThresholdOfMinute"
              >
                <el-input
                  v-model="baseForm.offlineThresholdOfMinute"
                  placeholder="请输入离线阈值"
                  :maxlength="16"
                >
                  <span slot="suffix" style="padding-right: 6px">分钟</span>
                </el-input>
                <p class="tissue">
                  当环境监测、物联网关在设定时间内未收到报警，则视为离线。
                </p>
              </el-form-item>
              <el-form-item
                label="坑位占用超时阈值"
                required
                prop="pitUseThresholdOfMinute"
              >
                <el-input
                  v-model="baseForm.pitUseThresholdOfMinute"
                  placeholder="请输入超时阈值"
                  :maxlength="16"
                >
                  <span slot="suffix" style="padding-right: 6px">分钟</span>
                </el-input>
                <p class="tissue">当坑位占用时长达到阈值将产生报警事件。</p>
              </el-form-item>
            </h-page-group>
            <h-page-group title="环境报警阈值配置">
              <el-form-item label="阈值配置">
                <div class="threeRow">
                  <div class="titleBar">
                    <span>数据类型</span>
                    <span>数值范围</span>
                    <span>报警阈值</span>
                    <span>默认值</span>
                  </div>
                  <div class="oneRow">
                    <div>温度</div>
                    <div class="rowlimit">
                      <!-- 16℃-28℃ -->
                      <el-input-number
                        v-model="baseForm.minTemperature"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      ~
                      <el-input-number
                        v-model="baseForm.maxTemperature"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      ℃
                    </div>
                    <div class="numPart">
                      <el-input-number
                        v-model="baseForm.thresholdOfTemperature"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      <span class="unit">℃</span>
                    </div>
                    <div class="rowlimit">
                      <el-input
                        v-model="baseForm.defaultTemperature"
                        style="width: 100px"
                      ></el-input>
                      ℃
                    </div>
                  </div>
                  <div class="oneRow">
                    <div>湿度</div>
                    <div class="rowlimit">
                      <el-input-number
                        v-model="baseForm.minHumidity"
                        :step="1"
                        :precision="3"
                      ></el-input-number>
                      ~
                      <el-input-number
                        v-model="baseForm.maxHumidity"
                        :step="1"
                        :precision="3"
                      ></el-input-number>
                      %
                    </div>
                    <div class="numPart">
                      <el-input-number
                        v-model="baseForm.thresholdOfHumidity"
                        :step="1"
                        :precision="3"
                      ></el-input-number>
                      <span class="unit">%</span>
                    </div>
                    <div class="rowlimit">
                      <el-input
                        v-model="baseForm.defaultHumidity"
                        style="width: 100px"
                      ></el-input>
                      %
                    </div>
                  </div>
                  <div class="oneRow">
                    <div>氨气</div>
                    <div class="rowlimit">
                      <el-input-number
                        v-model="baseForm.minNH3"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      ~
                      <el-input-number
                        v-model="baseForm.maxNH3"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      ppm
                    </div>
                    <div class="numPart">
                      <el-input-number
                        v-model="baseForm.thresholdOfNH3"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      <span class="unit">ppm</span>
                    </div>
                    <div class="rowlimit">
                      <el-input
                        v-model="baseForm.defaultNH3"
                        style="width: 100px"
                      ></el-input>
                      ppm
                    </div>
                  </div>
                  <div class="oneRow">
                    <div>硫化氢</div>
                    <div class="rowlimit">
                      <el-input-number
                        v-model="baseForm.minH2S"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      ~
                      <el-input-number
                        v-model="baseForm.maxH2S"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      ppm
                    </div>
                    <div class="numPart">
                      <el-input-number
                        v-model="baseForm.thresholdOfH2S"
                        :step="0.1"
                        :precision="3"
                      ></el-input-number>
                      <span class="unit">ppm</span>
                    </div>
                    <div class="rowlimit">
                      <el-input
                        v-model="baseForm.defaultH2S"
                        style="width: 100px"
                      ></el-input>
                      ppm
                    </div>
                  </div>
                  <div class="oneRow">
                    <div>PM2.5</div>
                    <div class="rowlimit">
                      <el-input-number
                        v-model="baseForm.minPM25"
                        :step="1"
                        :precision="3"
                      ></el-input-number>
                      ~
                      <el-input-number
                        v-model="baseForm.maxPM25"
                        :step="1"
                        :precision="3"
                      ></el-input-number>
                      ug/m³
                    </div>
                    <div class="numPart">
                      <el-input-number
                        v-model="baseForm.thresholdOfPM25"
                        :step="1"
                        :precision="3"
                      ></el-input-number>
                      <span class="unit">ug/m³</span>
                    </div>
                    <div class="rowlimit">
                      <el-input
                        v-model="baseForm.defaultPM25"
                        style="width: 100px"
                      ></el-input>
                      ug/m³
                    </div>
                  </div>
                </div>
              </el-form-item>
            </h-page-group>
            <h-page-group title="目录配置">
              <el-form-item label="所属区划">
                <!-- <OrgTreeMultiSelect
                ref="orgMultiTree"
                :default-id="defaultArr"
                @changeData="areaCheckChange"
              /> -->
                <OrgTree
                  ref="orgMultiTree"
                  :default-id="defaultId"
                  @input="orgInput"
                />
              </el-form-item>
            </h-page-group>
          </el-form>
        </div>
        <!-- </anchor-scroll> -->
      </h-page-content>
    </ScrollbarWrapper>
    <h-page-footer inner-width="720px">
      <el-button type="primary" @click="submitHandle">保存</el-button>
      <!-- <el-button @click="back">取消</el-button> -->
    </h-page-footer>
  </h-page-container>
</template>

<script>
import Api from '@/api/index';
// import OrgTreeMultiSelect from '@/components/tree/orgTreeMultiSelect.vue';
import OrgTree from '@/components/tree/orgTreeSelect.vue';
import ScrollbarWrapper from '@/components/common/ScrollBarWrapper.vue';
const xiaoxieReg = /^[a-z0-9]*$/;
const daxiaoxieReg = /^[A-Za-z0-9]*$/;
const numLetterRule = () => {
  return {
    validator: (rule, value, callback) => {
      if (daxiaoxieReg.test(value) && xiaoxieReg.test(value)) {
        callback();
      } else {
        callback(new Error('请输入字母、数字'));
      }
    },
    trigger: 'change,blur'
  };
};
const NumRule = () => {
  return {
    validator: (rule, value, callback) => {
      if (!isNaN(parseFloat(value)) && isFinite(value) && Number(value > 0)) {
        callback();
      } else {
        callback(new Error('请输入大于0的数字'));
      }
    },
    trigger: 'change,blur'
  };
};

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
export default {
  components: {
    OrgTree,
    ScrollbarWrapper
  },
  data() {
    return {
      breadcrumb: ['系统管理', '应用配置中心', '智慧公厕监管应用', '通用配置'],
      baseForm: {
        appKey: 'string',
        appSecret: 'string',
        rootArea: {},
        offlineThresholdOfMinute: 'string',
        pitUseThresholdOfMinute: 15,
        thresholdOfH2S: 0,
        thresholdOfHumidity: 0,
        thresholdOfNH3: 0,
        thresholdOfPM25: 0,
        thresholdOfTemperature: 0,
        minTemperature: 0,
        maxTemperature: 0,
        minNH3: 0,
        maxNH3: 0,
        minPM25: 0,
        maxPM25: 0,
        minH2S: 0,
        maxH2S: 0,
        defaultTemperature: 0,
        defaultHumidity: 0,
        defaultNH3: 0,
        defaultH2S: 0,
        defaultPM25: 0
      },
      rules: {
        appKey: [requireRule('请输入appkey'), numLetterRule()],
        appSecret: [requireRule('请输入appsecret'), numLetterRule()],
        offlineThresholdOfMinute: [requireRule('请输入离线阈值'), NumRule()],
        pitUseThresholdOfMinute: [NumRule()]
      },
      diyLoading: false,
      defaultId: ''
    };
  },
  // 初始化查询配置
  mounted() {
    this.getConfig();
  },
  methods: {
    getConfig() {
      Api.getConfig().then(async res => {
        if (res.code === '0') {
          this.baseForm = res.data;
          if (res.data.rootArea && res.data.rootArea.indexCode) {
            this.defaultId = res.data.rootArea.indexCode;
          }
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    orgInput(id, name) {
      this.baseForm.rootArea = {
        indexCode: id,
        name: name
      };
    },
    submitHandle() {
      this.$refs.baseForm.validate(async valid => {
        if (valid) {
          this.diyLoading = true;
          const param = Object.assign({}, this.baseForm);
          param.defaultTemperature = Number(
            this.baseForm.defaultTemperature
              ? this.baseForm.defaultTemperature
              : 0
          );
          param.defaultHumidity = Number(
            this.baseForm.defaultHumidity ? this.baseForm.defaultHumidity : 0
          );
          param.defaultNH3 = Number(
            this.baseForm.defaultNH3 ? this.baseForm.defaultNH3 : 0
          );
          param.defaultH2S = Number(
            this.baseForm.defaultH2S ? this.baseForm.defaultH2S : 0
          );
          param.defaultPM25 = Number(
            this.baseForm.defaultPM25 ? this.baseForm.defaultPM25 : 0
          );
          Api.saveConfig(param)
            .then(res => {
              this.diyLoading = false;
              if (res.code === '0') {
                this.$message.success('保存成功');
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(() => {
              this.diyLoading = false;
            });
        }
      });
    },
    areaCheckChange(val) {
      this.baseForm.areaList = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.add-Config {
  position: relative;
  width: 720px;
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
    grid-template-columns: 13% 42% 24% 21%;
    background-color: rgb(235, 235, 235);
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    // grid-template-rows: 15% 53% 32%;
  }
  .oneRow {
    display: grid;
    grid-template-columns: 13% 42% 24% 21%;
    height: 40px;
    line-height: 40px;
    text-indent: 10px;
    .numPart {
      text-indent: 0;
      .unit {
        // float: left;
        margin-left: 2px;
      }
    }
    .rowlimit {
      text-indent: 0;
    }
  }
}
.diyWrapper {
  height: calc(100% - 112px);
}
</style>
