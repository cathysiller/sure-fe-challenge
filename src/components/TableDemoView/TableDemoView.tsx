import InfoTable from '../InfoTable';
import { Box } from '@mui/material';

const testRows = Array(15)
  .fill(null)
  .map((_, i) => ({
    key: `KEY ${i}`,
    value: 'VALUE',
  }));

//console.log(testRows)

function TableDemoView() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <InfoTable header="Test Table" rows={testRows} />
    </Box>
  );
}

export default TableDemoView;
