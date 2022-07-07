import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { Spin } from 'antd';


function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* test */}
      <div style={{color: theme.colors.darkBlue}}> 
        <Spin spinning={true}>
        Wasabi
        </Spin>
      </div>
    </ThemeProvider>
  );
}

export default App;
