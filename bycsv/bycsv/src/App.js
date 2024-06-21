import React, { useState, useEffect } from 'react';
import mysql from 'mysql';
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const db = mysql.createConnection({
    
      user:"root",
      host:"localhost",
      password:"Extromile@03",
      database:"crudmysql"
    });

    db.connect((err) => {
      if (err) {
        console.error('error connecting:', err);
        return;
      }
      console.log('connected as id ' + db.threadId);

      const query = 'SELECT * FROM your_table';
      db.query(query, (err, rows) => {
        if (err) {
          console.error('error running query:', err);
          return;
        }
        setData(rows);
      });
    });
  }, []);

  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'your_file_name.xlsx');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Excel</button>
    </div>
  );
};

export default App;