import deepmerge from 'deepmerge';
import empty from '@hui-pro/empty/lang/zh_CN';
import errorDialog from '@hui-pro/error-dialog/lang/zh_CN';
import locale from '@hui-pro/locale/lang/zh_CN';
import selectTreeOption from '@hui-pro/select-tree-option/lang/zh_CN';
import tableTransfer from '@hui-pro/table-transfer/lang/zh_CN';
import vehicleNumberInput from '@hui-pro/vehicle-number-input/lang/zh_CN';
const h = deepmerge.all([
  {},
  empty,
  errorDialog,
  locale,
  selectTreeOption,
  tableTransfer,
  vehicleNumberInput
]);
export default h;
