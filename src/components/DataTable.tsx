import DataTable, { TableColumn } from 'react-data-table-component';

// Define the type for your data items
interface DataItem {
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
}

const columns: TableColumn<DataItem>[] = [
    { name: 'Value', selector: (row: DataItem) => row.number, sortable: true },
    { name: 'Modulo 3', selector: (row: DataItem) => row.mod3, sortable: true },
    { name: 'Modulo 4', selector: (row: DataItem) => row.mod4, sortable: true },
    { name: 'Modulo 5', selector: (row: DataItem) => row.mod5, sortable: true },
    { name: 'Modulo 6', selector: (row: DataItem) => row.mod6, sortable: true },
];

const DataTableComponent = ({ data }: { data: DataItem[] }) => {
  return <DataTable columns={columns} data={data} pagination />;
};

export default DataTableComponent;
