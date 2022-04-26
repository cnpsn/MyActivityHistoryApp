import React from 'react'
import MainRouter from './src/MainRouter'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary:"#4a69bd",
    surface:"#FFF",
    black:"#4A4453",
    gray:"#7B7485",
    white:"#f1f2f6",
    LightGrey:"#7f8c8d",
    danger:"#B1000E",
    orange:"#ffa502"
  },
};

export default function App() {
  return(
    <PaperProvider theme={theme}>
        <MainRouter/>
    </PaperProvider>
  )
}