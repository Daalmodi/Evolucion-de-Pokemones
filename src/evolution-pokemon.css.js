import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:host {
  display: block;
  box-sizing: border-box;
}

:host([hidden]), [hidden] {
  display: none !important;
}

*, *::before, *::after {
  box-sizing: inherit;
}

.wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

.contenedor {
  display: grid;
  justify-content: center;
}

.tipos {
  font-size: 15px;
}
`;
