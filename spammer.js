const spammer = (config) => {
  const fieldDelimiter = delimeterForFileType[config.fileType];
  const columnLength = config.columns.length;
  let data = [];
  for (let i = 0; i < config.rows; i++) {
    let rowObj = {};
    for (let j = 0; j < columnLength; j++) {
      rowObj[config.columns[j].title] = '';
      for (let k = 0; k < config.columns[j].size; k++) {
        if (config.columns[j].type === 'alphabets') {
          rowObj[config.columns[j].title] += dataSource[config.columns[j].type][Math.floor(Math.random() * 52)];
        }
      }
    }
    data.push(rowObj);
  }
  console.log(data);
  downloadCSV({
    data,
    columnDelimiter: fieldDelimiter.delimiter,
    filename: `spam.${fieldDelimiter.extension}`
  });
};


const dataSource = Object.freeze({
  alphabets: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
  numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  alphaNumeric: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
});

const delimeterForFileType = Object.freeze({
  csv: { delimiter: ',', extension: 'csv' },
  tsv: { delimiter: '\t', extension: 'tsv' },
  psv: { delimiter: '|', extension: 'txt' },
});

spammer({
  fileType: 'csv',
  rows: 10,
  columns: [
    {
      title: 'First Column',
      type: 'alphabets',
      size: 10,
    },
  ],
});

function convertArrayOfObjectsToCSV(args) {
  let result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
    return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}

function downloadCSV(args) {
  let data, filename, link;

  let csv = convertArrayOfObjectsToCSV(args);
  if (csv === null) return;

  filename = args.filename || 'spam.txt';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
