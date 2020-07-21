import {createGlobalStyle} from 'styled-components';

export const GlobalStyle =  createGlobalStyle`
body{
    font-family: 'Open Sans Condensed', sans-serif;
    padding: 20px 60px;
}

a{
    color: #000000;
    text-decoration: none;
}

*{
    box-sizing: border-box;
}
`;
