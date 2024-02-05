import { PluginContract } from '@nintex/form-plugin-contract';
import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

@customElement('plx-nif-textfield')
export class PlxNifTextfield extends LitElement {
  static override styles = css`
    p { color: blue }

    input:invalid {
      border-color: red;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(233,175,102,.6);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(233,175,102,.6);
    }

    input:valid {
      border-color: green;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 4px rgba(102,233,102,.6);
      box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 4px rgba(102,233,102,.6);
    }
  `;

  @property()
  documentNumber!: string;

  @property()
  documentType!: string;

  @property()
  placeholder!: string;

  @property({ type: Boolean })
  readOnly = false;

  static getMetaConfig(): PluginContract {
    return {  
        version: '1.0.0',
        controlName: 'NIF Textfield',
        groupName: 'Custom',
        pluginVersion: '1.0',
        description: 'Text field with NIF validation',
        iconUrl: 'one-line-text',
        fallbackDisableSubmit: false,
        standardProperties: {
          fieldLabel: true,
          description: true,
          defaultValue: true,
          placeholder: true,
          toolTip: true,
          readOnly: true,
          required: true,
          visibility: true
        },
        properties: {
          documentNumber: {
            title: 'Document Number',
            description: 'Identity Card Number',
            type: 'string',
            isValueField: true
          }
        },
        events: [ 'ntx-value-change' ]
      }
  }

  override render() {
    return html`
      <p>Hello, ${this.documentNumber}</p>
      <input @input=${this.onChange} placeholder=${this.placeholder} ?readonly="${this.readOnly}">
    `;
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.documentNumber = input.value;

    const args = {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: input.value
    };
    const customEvent = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(customEvent);

    const validation = this.validateDocument(this.documentType, this.documentNumber);
    this.setValidity(input, validation);
  }

  setValidity(input: HTMLInputElement, isValid: boolean | null) {
    if (isValid === false) {
        input.setCustomValidity('This identity card is invalid.');
    }
    else {
        input.setCustomValidity('');
    }
  }

  validateDocument(documentType: string, documentNumber: string) {
    switch(documentType) {
        case 'D.N.I (N.I.F.)':
            return this.validateDni(documentNumber);
        case 'Nº de C.U.R.P':
          return null;
        case 'Pasaporte':
            return null;
        case 'Tarjeta de Residente Comunitaria':
            return null;
        case 'Permiso de residencia y Trabajo':
            return null;
        case 'Nº de Identificación de Extranjero':
            return this.validateNie(documentNumber);
        case 'Nº Cédula Dominicana':
            return null;
        case 'Emp. Global - ID Local':
            return null;
        default:
            return null;
      }
  }

  validateDni(documentNumber: string) {
    const REGEX = /(^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$)/;
    const CONTROL = 'TRWAGMYFPDXBNJZSQVHLCKE';
    
    documentNumber = documentNumber.toUpperCase();
    
    if (REGEX.test(documentNumber)) {
        const controlNumber = parseInt(documentNumber.substring(0, 8)) % 23;
        
        if (documentNumber.charAt(8) == CONTROL.substring(controlNumber, controlNumber + 1)) {
            return true;
        }
	}
    
    return false;
  }

  validateNie(documentNumber: string) {
    const REGEX = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}/;
    const CONTROL = 'TRWAGMYFPDXBNJZSQVHLCKE';
    
    documentNumber = documentNumber.toUpperCase();
    
    if (REGEX.test(documentNumber)) {
        const modifiedNumber = documentNumber.replace('X', '0').replace('Y', '1').replace('Z', '2');
        const controlNumber = parseInt(modifiedNumber.substring(0, 8)) % 23;
        
        if (documentNumber.charAt(8) == CONTROL.substring(controlNumber, controlNumber + 1)) {
            return true;
        }
    }
    
    return false;
  }
}
