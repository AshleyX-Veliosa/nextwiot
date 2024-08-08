import DataType from './DataType';
export default interface GroupedDataType {
  [date: string]: DataType[];
}