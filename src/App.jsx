import { useState } from 'react';
import {
  ThemeProvider, createTheme, Box,
  FormControl, InputLabel, Button, Select, MenuItem, Typography, TextField
} from '@mui/material';
import RTL from './components/RTL';
import Card from './components/Card'
import consumation from './res/consumation.json'
import {
  getLastYearCost,
  vhToKvh,
  vibrate
} from './utils'


const theme = createTheme({
  direction: 'rtl',
  textAlign: 'right',
  typography: {
    fontFamily: [
      'Assistant',
      'sans-serif'
    ].join(','),
  },
});


function App() {
  const [kvh, setKvh] = useState('')
  const [consumeType, setConsumeType] = useState('kvh')
  const [result, setResult] = useState({ hour: '-', month: '-', year: '-' })

  function handleSelect(e) {
    setConsumeType(e.target.value)
    if (kvh !== '') {
      handleCalculate(e.target.value)
    }
  }

  function handleCalculate(consumeType) {
    vibrate(50)
    const kvhCost = getLastYearCost().cost
    const kvhValue = consumeType === 'vh'
      ? vhToKvh(kvh)
      : kvh

    setResult({
      hour: kvhCost * kvhValue,
      month: kvhCost * kvhValue * 24 * 30,
      year: kvhCost * kvhValue * 24 * 360
    })

  }

  return (
    <RTL>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            backgroundColor: 'white', width: { xs: '90%', md: '50%' },
            minHeight: { xs: '70vh', md: '75vh' }, margin: 'auto', marginTop: '70px',
            padding: '20px', borderRadius: '25px', boxShadow: '0 0 1px 1px'
          }}
        >
          <Typography
            fontSize='3.5em' textAlign='center' fontWeight='200'
            sx={{ fontSize: { xs: '2em', md: '3.2em' } }}
          >
            חישוב צריכת חשמל
          </Typography>
          <Box
            sx={{
              display: 'flex', width: { sm: '80%', sx: '100%' },
              margin: 'auto',
              marginTop: { xs: '35px', md: '0' },
              alignItems: 'center', gap: '10px', paddingTop: '30px'
            }}
          >
            <FormControl style={{ width: '50%' }} size="small">
              <InputLabel id="demo-simple-select-label">סוג צריכה</InputLabel>
              <Select
                defaultValue='kvh'
                dir='rtl'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={consumeType}
                label="Age"
                onChange={handleSelect}
                InputLabelProps={{ style: { fontSize: 40 } }}
              >
                {
                  consumation.map((c) =>
                    <MenuItem key={c.value} value={c.value}>{c.name}</MenuItem>
                  )
                }
              </Select>
            </FormControl>
            <TextField
              value={kvh} autoComplete='off' onChange={e => setKvh(e.target.value)}
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              dir='rtl' id="standard-basic"
              label='כמות צריכה' variant="standard"
              style={{ width: '50%', marginTop: '-10px' }}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
            <Button
              disabled={kvh === ''} onClick={() => handleCalculate(consumeType)} variant='contained'
              style={{ margin: 'auto', fontWeight: 'bold', fontSize: '1.8em', height: '1.6em', width: '4em' }}>
              חשב
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: '15px', width: '100%', justifyContent: 'center', paddingTop: '20px' }}>
            <Card title='שעה' cost={result.hour} />
            <Card title='חודש' cost={result.month} />
            <Card title='שנה' cost={result.year} />
          </Box>
          <Typography fontSize='1.2em' textAlign='center' fontWeight='200' paddingTop='3px'>
            חושב לפי {getLastYearCost().cost} קוט"ש נכון לשנת {getLastYearCost().year}
          </Typography>
        </Box>
      </ThemeProvider>
    </RTL>
  );
}

export default App;
