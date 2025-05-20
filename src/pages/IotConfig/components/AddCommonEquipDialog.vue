<template>
  <el-dialog
    :title="baseForm.id ? '修改通用设备' : '增加通用设备'"
    :visible.sync="dialogVisible"
    size="small"
    :area="[640, 520]"
    @open="queryDict"
    @close="cleanValue"
  >
    <div class="formOuter">
      <el-form
        ref="baseForm"
        label-position="top"
        :model="baseForm"
        content-width="420px"
        :rules="rules"
      >
        <el-form-item
          label="设备类型"
          :required="!baseForm.id"
          :prop="baseForm.id ? '' : `type`"
        >
          <el-select
            v-model="baseForm.type"
            :disabled="baseForm.id !== ''"
            placeholder="请选择"
            @change="typeChange"
          >
            <el-option
              v-for="item in equipArr"
              :key="item.deviceType"
              :label="item.deviceTypeName"
              :value="item.deviceType"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称" required prop="name">
          <el-input
            v-model="baseForm.name"
            placeholder=""
            :disabled="
              baseForm.type === 'CAMERA' || baseForm.type === 'FLOW_STATISTIC'
            "
            :maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="baseForm.type === 'CAMERA'"
          label="设备编码"
          required
          prop="sn"
        >
          <!-- <el-input
            v-model="baseForm.sn"
            placeholder=""
            :maxlength="32"
          ></el-input> -->
          <PassengerFlowMonitorTree
            v-model="baseForm.sn"
            :default-checked="defaultCheckedMonitor"
            @input="revalid"
          />
          <!-- <el-input
            v-show="novalid"
            v-model="baseForm.sn"
            disabled
            placeholder="请输入"
          >
            <template slot="append">
              <el-button @click="novalid = false">
                选择设备
              </el-button>
            </template>
          </el-input> -->
        </el-form-item>
        <el-form-item
          v-else-if="baseForm.type === 'FLOW_STATISTIC'"
          label="设备编码"
          required
          prop="sn"
        >
          <PassengerFlowDeviceTree
            v-model="baseForm.sn"
            :default-checked="defaultCheckedMonitor"
            @input="revalid2"
          />
          <!-- <el-input
            v-show="novalid2"
            v-model="baseForm.sn"
            disabled
            placeholder="请输入"
          >
            <template slot="append">
              <el-button @click="novalid2 = false">
                选择设备
              </el-button>
            </template>
          </el-input> -->
        </el-form-item>
        <el-form-item v-else label="设备编码" required prop="sn">
          <el-input
            v-model="baseForm.sn"
            placeholder=""
            :maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="权属单位" prop="ownershipUnit">
          <el-input
            v-model="baseForm.ownershipUnit"
            placeholder=""
            :maxlength="32"
          ></el-input>
        </el-form-item>
        <!-- 网关增加厕所平面图上传 -->
        <el-form-item
          v-show="baseForm.type === 'BIG_SCREEN'"
          label="公厕平面图"
          prop="pictureData"
        >
          <ImgUpload ref="imgUploader" />
        </el-form-item>
        <!-- 男左女右 -->
        <el-form-item
          v-show="baseForm.type === 'BIG_SCREEN'"
          label="引导屏布局"
          prop="maleOnLeft"
        >
          <el-radio-group v-model="baseForm.maleOnLeft">
            <el-radio :label="1">男左女右</el-radio>
            <el-radio :label="0">男右女左</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit">确 定</el-button>
      <el-button @click="dialogVisible = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ImgUpload from './ImgUpload.vue';
import DeviceApi from '@/api/device';
import PassengerFlowMonitorTree from '@/components/tree/passengerFlowMonitorTree.vue';
import PassengerFlowDeviceTree from '@/components/tree/passengerFlowDeviceTree.vue';
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
    ImgUpload,
    PassengerFlowMonitorTree,
    PassengerFlowDeviceTree
  },
  data() {
    return {
      dialogVisible: false,
      baseForm: {
        name: '',
        ownershipUnit: '',
        sn: '',
        toiletId: '',
        type: '',
        id: '',
        positionPicData: '',
        deletePic: false,
        maleOnLeft: 1
      },
      rules: {
        type: [requireRule('请选择设备类型')],
        name: [requireRule('请输入设备名称')],
        sn: [requireRule('请输入设备编码')]
      },
      equipArr: [],
      novalid: true,
      novalid2: true,
      defaultCheckedMonitor: ''
    };
  },
  methods: {
    // 修改时初始化参数
    initValue(row) {
      this.baseForm = {
        name: row.name,
        ownershipUnit: row.ownershipUnit,
        sn: row.sn,
        toiletId: '',
        type: row.deviceType,
        id: row.id,
        positionPicData: '',
        deletePic: false,
        maleOnLeft: row.maleOnLeft === 0 ? 0 : 1
      };
      setTimeout(() => {
        if (row.positionPic) {
          this.$refs.imgUploader.base64 = row.positionPic;
        }
      }, 0);
      // 如果是camera 或者是CAMERA FLOW_STATISTIC，这两个时候我会将其给与默认值
      if (
        this.baseForm.type === 'CAMERA' ||
        this.baseForm.type === 'FLOW_STATISTIC'
      ) {
        this.defaultCheckedMonitor = {
          code: row.sn,
          name: row.name,
          deviceCode: '',
          parentId: ''
        };
      }
    },
    // 查询dict
    queryDict() {
      DeviceApi.commonDeviceTypes().then(res => {
        if (res.code === '0') {
          this.equipArr = (res.data || []).filter(item => {
            return item.addableFlag;
          });
        }
      });
      if (!this.baseForm.id) {
        setTimeout(() => {
          this.$refs.imgUploader.base64 = '';
        }, 0);
      }
    },
    submit() {
      this.$refs.baseForm.validate(valid => {
        if (valid) {
          this.baseForm.toiletId = JSON.parse(
            window.sessionStorage.getItem('editToilet')
          ).id;
          if (
            // 如果不是base64则不赋值因为未做修改
            this.$refs.imgUploader.base64.includes('/ptsa/')
          ) {
            this.baseForm.positionPicData = '';
          } else {
            this.baseForm.positionPicData = this.$refs.imgUploader.base64;
            if (
              this.baseForm.positionPicData === '' &&
              this.baseForm.type === 'BIG_SCREEN'
            ) {
              this.baseForm.deletePic = true;
            } else {
              this.baseForm.deletePic = false;
            }
          }
          // 如果有id则是修改
          if (this.baseForm.id) {
            DeviceApi.updateCommonDevice(this.baseForm).then(res => {
              if (res.code === '0') {
                this.$message.success('修改通用设备成功');
                this.$emit('commonSubmit');
                this.dialogVisible = false;
              }
            });
          } else {
            DeviceApi.addCommonDevice(this.baseForm).then(res => {
              if (res.code === '0') {
                this.$message.success('添加通用设备成功');
                this.$emit('commonSubmit');
                this.dialogVisible = false;
              }
            });
          }
        }
      });
    },
    cleanValue() {
      this.baseForm = {
        name: '',
        ownershipUnit: '',
        sn: '',
        toiletId: '',
        type: '',
        id: '',
        positionPicData: '',
        deletePic: false,
        maleOnLeft: 1
      };
      setTimeout(() => {
        this.$refs.imgUploader.base64 = '';
      }, 0);
      this.$refs.baseForm.resetFields();
      this.novalid = true;
      this.defaultCheckedMonitor = '';
    },
    revalid(val, val2) {
      this.$refs.baseForm.validateField('sn');
      this.baseForm.name = val2.name;
      this.novalid = true;
    },
    revalid2(val, val2) {
      this.$refs.baseForm.validateField('sn');
      this.baseForm.name = val2.name;
      this.novalid2 = true;
    },
    typeChange() {
      // this.baseForm.name = '';
      // this.baseForm.sn = '';
    }
  }
};
</script>

<style lang="scss" scoped>
.formOuter {
  position: relative;
  width: 430px;
  margin: auto;
  padding: 0;
}
</style>
