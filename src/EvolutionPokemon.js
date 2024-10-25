import { LitElement, html } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import'@bbva-web-components/bbva-core-image/bbva-core-image.js';
import '@bbva-web-components/bbva-foundations-grid-default-layout';
import styles from './evolution-pokemon.css.js';

/**
 * ![LitElement component](https://img.shields.io/badge/litElement-component-blue.svg)
 *
 * This component ...
 *
 * Example:
 *
 * ```html
 *   <evolution-pokemon></evolution-pokemon>
 * ```
 */
export class EvolutionPokemon extends LitElement {
  static get properties() {
    return {
      /**
       * Description for property
       */
      name: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.pokemoEvolutions = [];
    this.evolution = [];
    //this.pokemonId = parseInt(this.getCurrentRoute().params.id);
    this.pokemonId = 1;// El pokemon id establece  sus evoluciones y es el parametro dado desde la lista de pokemones.
    this.getSpecies();
    this.urlEvolutionChain = null;
    this.datos = [];
    this.ids = [];

  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('evolution-pokemon-shared-styles'),
    ];
  }

  getSpecies() {

      console.log("eNTRO");
      
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${this.pokemonId}`)
      .then((response)=> response.json())
      .then((data)=>this.getEvolutionChain(data));

  }

  getEvolutionChain(chain) {
    this.urlEvolutionChain = chain.evolution_chain.url;


    fetch(this.urlEvolutionChain)
      .then((response)=> response.json())
      .then((data)=>this.pokemonRenders(data));


  }

  pokemonRenders(pokemones) {

    const chain = pokemones.chain;
    const queue = [ chain ];

    while (queue.length > 0) {
      const species = queue.shift();
      const urlParts = species.species.url.split('/');
      const id = parseInt(urlParts[urlParts.length - 2]);
      this.datos.push({ nombre: species.species.name, url: species.species.url });
      this.ids.push(id);
      if (species.evolves_to) {
        queue.push(...species.evolves_to);
      }
    }

    this.getEvolution();

  }

  getEvolution() {

    this.ids.forEach((id) => {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then((response) => response.json())
        .then((data) => this.renderPokemons(data));
    });

  }


  renderPokemons(pokemon) {

    this.pokemoEvolutions = [...this.pokemoEvolutions, pokemon];
    this.requestUpdate();

  }



  render() {
    return html`
      <bbva-foundations-grid-default-layout layout="[{
  slot: 'pokemon-row',
  cols: {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12
  }
}]">
    <div class="wrap" slot="pokemon-row">
      ${this.pokemoEvolutions.map((pokemon) => html`
      <div class="contenedor">
        <bbva-web-panel-outstanding-opportunity-item
          heading=${pokemon.name}
          
          slot="main"
          
        >
          <bbva-core-image style="width:400px; height:400px; " sizing="cover; object-fit: contain" preload fade src=${pokemon.sprites.other.dream_world.front_default}></bbva-core-image>
          <div>
            Tipos : ${pokemon.types.map((type) => html` ${type.type.name} `)}
          </div>
          <div>
             id : ${pokemon.id}
          </div>
          
                 

        </bbva-web-panel-outstanding-opportunity-item>
        
      </div>
 
      `)}
    </div>
    </bbva-foundations-grid-default-layout>
    `;
  }
}
