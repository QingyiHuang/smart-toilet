<template>
  <el-dialog
    :title="baseForm.id ? '修改公厕设备' : '增加公厕设备'"
    :visible.sync="dialogVisible"
    size="small"
    :area="[640, 540]"
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
          :required="!baseForm.id && baseForm.type !== 'INDICATOR'"
          :prop="!baseForm.id && baseForm.type !== 'INDICATOR' ? `type` : ''"
        >
          <el-select
            v-if="baseForm.id === ''"
            v-model="baseForm.type"
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
          <el-input
            v-if="baseForm.id"
            v-model="initTypeName"
            disabled
            placeholder=""
            :maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备名称" required prop="name">
          <el-input
            v-model="baseForm.name"
            placeholder=""
            :maxlength="32"
            :disabled="
              baseForm.type === 'CAMERA' || baseForm.type === 'FLOW_STATISTIC'
            "
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="baseForm.type !== 'FLOW_STATISTIC'"
          label="设备编码"
          required
          prop="sn"
        >
          <el-input
            v-model="baseForm.sn"
            placeholder=""
            :maxlength="32"
            :disabled="
              baseForm.type !== 'INDICATOR' &&
              baseForm.type !== 'ENVIRONMENT' &&
              baseForm.id !== ''
            "
          ></el-input>
        </el-form-item>
        <el-form-item v-else label="设备编码" required prop="sn">
          <PassengerFlowDeviceTree
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
        <el-form-item label="权属单位" prop="ownershipUnit">
          <el-input
            v-model="baseForm.ownershipUnit"
            placeholder=""
            :maxlength="32"
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="
            baseForm.type !== 'INDICATOR' &&
            baseForm.type !== 'ENVIRONMENT' &&
            baseForm.type !== 'FLOW_STATISTIC'
          "
          label="运营商"
          required
          prop="telcoType"
        >
          <el-select v-model="baseForm.telcoType" placeholder="请选择">
            <el-option
              v-for="item in telcoTypeArr"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </el-select>
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
import DeviceApi from '@/api/device';
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
    PassengerFlowDeviceTree
  },
  data() {
    return {
      dialogVisible: false,
      baseForm: {
        name: '',
        ownershipUnit: '',
        sn: '',
        telcoType: null,
        toiletId: '',
        toiletType: '',
        type: '',
        id: ''
      },
      rules: {
        type: [requireRule('请选择设备类型')],
        name: [requireRule('请输入设备名称')],
        sn: [requireRule('请输入设备编码')],
        telcoType: [requireRule('请选择运营商')]
      },
      equipArr: [],
      telcoTypeArr: [],
      initTypeName: '',
      defaultChecked: {},
      novalid: true,
      defaultCheckedMonitor: ''
    };
  },
  methods: {
    initValue(row) {
      this.baseForm = {
        name: row.name,
        ownershipUnit: row.ownershipUnit,
        sn: row.sn,
        telcoType: row.telcoType || null,
        toiletId: '',
        toiletType: row.toiletType,
        type: row.deviceType,
        id: row.id
      };
      this.initTypeName = row.deviceTypeName;
      // 如果是客流类型,则对tree进行初始化
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
    setToiletType(type) {
      this.baseForm.toiletType = type;
    },
    // 查询dict
    queryDict() {
      DeviceApi.toiletDeviceTypes().then(res => {
        if (res.code === '0') {
          this.equipArr = (res.data || []).filter(item => {
            return item.addableFlag;
          });
        }
      });
      DeviceApi.telcoTypes().then(res => {
        if (res.code === '0') {
          this.telcoTypeArr = res.data || [];
        }
      });
    },
    submit() {
      this.$refs.baseForm.validate(valid => {
        if (valid) {
          this.baseForm.toiletId = JSON.parse(
            window.sessionStorage.getItem('editToilet')
          ).id;
          // 如果有id则是修改
          if (this.baseForm.id) {
            DeviceApi.updateToiletDevice(this.baseForm).then(res => {
              if (res.code === '0') {
                this.$message.success('修改公厕设备成功');
                this.$emit('toiletDeviceSubmit', this.baseForm.toiletType);
                this.dialogVisible = false;
              }
            });
          } else {
            DeviceApi.addToiletDevice(this.baseForm).then(res => {
              if (res.code === '0') {
                this.$message.success('添加公厕设备成功');
                this.$emit('toiletDeviceSubmit', this.baseForm.toiletType);
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
        telcoType: null,
        toiletId: '',
        toiletType: '',
        type: '',
        id: ''
      };
      this.$refs.baseForm.resetFields();
      this.novalid = true;
      this.defaultCheckedMonitor = '';
    },
    typeChange() {
      // this.baseForm.name = '';
      // this.baseForm.sn = '';
    },
    revalid(val, val2) {
      this.$refs.baseForm.validateField('sn');
      this.baseForm.name = val2.name;
      this.novalid = true;
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
