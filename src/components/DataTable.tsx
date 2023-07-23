// DataTable.js

import DataTable from 'react-data-table-component';

const columns = [
  { name: 'Value', selector: 'number', sortable: true },
  { name: 'Modulo 3', selector: 'mod3', sortable: true },
  { name: 'Modulo 4', selector: 'mod4', sortable: true },
  { name: 'Modulo 5', selector: 'mod5', sortable: true },
  { name: 'Modulo 6', selector: 'mod6', sortable: true },
];

const DataTableComponent = ({ data }) => {
    return (  
        <DataTable 
            columns={columns}  
            data={data} 
            pagination 

        />
    );
};

export default DataTableComponent;