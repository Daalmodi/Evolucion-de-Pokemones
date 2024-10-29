import { LitElement, html } from 'lit-element';
import { CellsPageMixin as cellsPage } from '@cells/cells-page-mixin';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import '@bbva-web-components/bbva-web-panel-outstanding-opportunity/bbva-web-panel-outstanding-opportunity.js';
import'@bbva-web-components/bbva-core-image/bbva-core-image.js';
import '@bbva-web-components/bbva-foundations-grid-default-layout';
import '@pokemondex/pokemon-dm/pokemon-dm.js';
import styles from './evolution-pokemon.css.js';

export class EvolutionPokemon extends cellsPage(LitElement) {


  constructor() {
    super();
    this.pokemoEvolutions = [];
    // El pokemon id se modifica segun  la informacion enviada desde el componente UI de la lista de pokemones
    this.pokemonId =parseInt(this.getCurrentRoute().params.id); 
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('evolution-pokemon-shared-styles'),
    ];
  }

  async connectedCallback() {
    super.connectedCallback();
    await this._handleConnections();
  }

  async _handleConnections() {
    this.subscribe('canal_1', async (id) => {
      this.pokemonId = id;
      await this._resetComponent();
    });
  }

  async _resetComponent() {
    this.pokemoEvolutions = [];
    await this.firstUpdated();
    this.requestUpdate();
  }


  async firstUpdated(){
    await this.updateComplete;
    const evolucion = this.shadowRoot.querySelector('pokemon-dm');
    await evolucion.fetchPokemonData(this.pokemonId);
    this.pokemoEvolutions = evolucion.evolutioData;
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
          <div class="tipos">
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
    <pokemon-dm></pokemon-dm>
    `;
  }
}
