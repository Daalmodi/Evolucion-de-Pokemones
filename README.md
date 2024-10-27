# @bbva-web-components/evolution-pokemon

## Package info

### Package installation

Installation using NPM

```bash
npm install @bbva-web-components/evolution-pokemon
```

### Entry points & exports

- (Default entry point)
  - EvolutionPokemon (Class)
- evolution-pokemon.js
  - evolution-pokemon (Custom Element)


## EvolutionPokemon (Class) evolution-pokemon (Custom Element) 

### Extends from

LitElement (lit-element package)

### Usage

Import and extend the class:

```js
import { EvolutionPokemon } from '@bbva-web-components/evolution-pokemon';

class ExampleElement extends EvolutionPokemon {
  ...
}
```

Use the custom element (defined globally):

```js
import '@bbva-web-components/evolution-pokemon/evolution-pokemon.js';
```

```html
<evolution-pokemon ...>
  ...
</evolution-pokemon>
```

### Description
Este es un componente UI que muestra las evouliciones de cada pokemon  escogido ,Obtiene la informacion de un componente de manejo de datos DM y recibe de otro componente ui de listado de pokemones el id del pokemon.
![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)

This component ...

Example:

```html
  <evolution-pokemon></evolution-pokemon>
```

### Properties

- **name**: string = "Cells" (attribute: name)
    Description for property
