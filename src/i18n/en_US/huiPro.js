import deepmerge from 'deepmerge';
import empty from '@hui-pro/empty/lang/en_US';
import errorDialog from '@hui-pro/error-dialog/lang/en_US';
import locale from '@hui-pro/locale/lang/en_US';
import selectTreeOption from '@hui-pro/select-tree-option/lang/en_US';
import tableTransfer from '@hui-pro/table-transfer/lang/en_US';
import vehicleNumberInput from '@hui-pro/vehicle-number-input/lang/en_US';
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
