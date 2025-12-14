import { useEffect, useRef } from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { datatableEs } from '../utils/datatable-es';
import '../styles/datatable-custom.css';

const DataTableComponent = ({ data, columns }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      data,
      columns,
      destroy: true,
      language: datatableEs,
      pageLength: 10
    });

    return () => {
      table.destroy();
    };
  }, [data, columns]);

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow bg-white dark:bg-gray-800 p-4">
        <table
          ref={tableRef}
          className="stripe hover w-full text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300 rounded-lg overflow-x-auto"
        >
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200" />
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700" />
        </table>
      </div>
    </>
  );
};

export default DataTableComponent;