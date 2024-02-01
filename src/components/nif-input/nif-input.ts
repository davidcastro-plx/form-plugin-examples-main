import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { PluginContract } from '@nintex/form-plugin-contract';

@customElement('identity-card-textfield')
export class IdentityCardTextfield extends LitElement {
  static styles = css`
  .form-control {
    color: var(--ntx-form-theme-color-secondary);
    background-color: var(
      --ntx-form-theme-color-input-background,
      transparent
    );
    font-size: var(--ntx-form-theme-text-input-size);
    font-family: var(--ntx-form-theme-font-family);
    border: 1px solid var(--ntx-form-theme-color-border);
    border-radius: var(--ntx-form-theme-border-radius);
  }

  .form-control:focus {
    outline: none;
    border-color: var(--ntx-form-theme-color-primary);
  }
  `;

  @property()
  label!: string;
  @property()
  description!: string;
  @property()
  value!: string;
  @property()
  identityCardType!: string;
  @property({ type: Boolean })
  readOnly: boolean = false;   //Add a read-only mode. See https://help.nintex.com/en-US/formplugins/Reference/ReadOnly.htm
  @property({ type: Boolean })
  required: boolean = false;
  @property({ type: Boolean })
  visibility: boolean = false;

  static getMetaConfig(): Promise<PluginContract> | PluginContract {
    return {
        controlName: 'Identity Card Text field',
        pluginVersion: '1.0',
        description: 'Text field with identity card validation',
        groupName: 'Custom',
        fallbackDisableSubmit: false,
        iconUrl: 'one-line-text',
        version: '1.0',
        properties: { //A custom configuration field. See https://help.nintex.com/en-US/formplugins/Reference/CustomField.htm
            value: {  //A field to pass a value to the workflow as a variable. See https://help.nintex.com/en-US/formplugins/Reference/StoreValue.htm
                title: 'Value',
                type: 'string',
                // this is to mark the field as value field. it should only be defined once in the list of properties
                isValueField: true,
                defaultValue: '',
                required: true,
                description: 'Identity card number'
            },
            identityCardType: {
                title: 'Identity card type',
                type: 'string',
                enum: [ 'D.N.I (N.I.F.)', 'Nº de C.U.R.P', 'Pasaporte', 'Tarjeta de Residente Comunitaria', 'Permiso de residencia y Trabajo', 'Nº de Identificación de Extranjero', 'Nº Cédula Dominicana', 'Emp. Global - ID Local' ],
                defaultValue: 'D.N.I (N.I.F.)',
                required: true,
                description: 'Identity card type'
            }
        },
        standardProperties: {
            fieldLabel: true,
            description: true,
            defaultValue: true,
            readOnly: true,
            required: true,
            visibility: true   //Add a read-only mode. See https://help.nintex.com/en-US/formplugins/Reference/ReadOnly.htm
        }
    };
  }

  // Render the UI as a function of component state
  render() {
    return html`<input
      class="form-control"
      class="form-control"
      .label="${this.label}"
      .helper="${this.description}"
      ?readOnly="${this.readOnly}"
      ?required="${this.required}"
      @change="${(e: any) => this.onChange(e)}"
      .value="${this.value}"
    />`;
  }

  private onChange(e: any) {
    const value = e.target?.value;
    const args = {
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: value,
    };
    const event = new CustomEvent('ntx-value-change', args);
    this.dispatchEvent(event);

    if(this.validate(value, this.identityCardType) === false) {
      e.target?.setCustomValidity("This identity card is invalid.");
    }
    else {
      e.target?.setCustomValidity("");
    }
  }

  private validate(identityCardNumber : string, identityCardType: string) : boolean | null {      
    switch(identityCardType) {
      case "D.N.I (N.I.F.)":
        return this.validateDni(identityCardNumber);
      case "Nº de C.U.R.P":
        return null;
      case "Pasaporte":
        return null;
      case "Tarjeta de Residente Comunitaria":
        return null;
      case "Permiso de residencia y Trabajo":
        return null;
      case "Nº de Identificación de Extranjero":
        return this.validateNie(identityCardNumber);
      case "Nº Cédula Dominicana":
        return null;
      case "Emp. Global - ID Local":
        return null;
      default:
        return null;
    }
  }

  private validateDni(documentNumber : string) : boolean {
    const REGEX = /(^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]{1}$)/;
    const CONTROL = 'TRWAGMYFPDXBNJZSQVHLCKE';

    documentNumber = documentNumber.toUpperCase();
    
	if (REGEX.test(documentNumber)) {
	    let controlNumber = parseInt(documentNumber.substring(0, 8)) % 23;
	    
		if (documentNumber.charAt(8) == CONTROL.substring(controlNumber, controlNumber + 1)) {
		    return true;
		}
	}

    return false;
  }

  private validateNie(documentNumber : string) : boolean {
    const REGEX = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]{1}/;
    const CONTROL = 'TRWAGMYFPDXBNJZSQVHLCKE';

    documentNumber = documentNumber.toUpperCase();
    
    if (REGEX.test(documentNumber)) {
	    let modifiedNumber = documentNumber.replace('X', '0').replace('Y', '1').replace('Z', '2');
	    let controlNumber = parseInt(modifiedNumber.substring(0, 8)) % 23;
	    
		if (documentNumber.charAt(8) == CONTROL.substring(controlNumber, controlNumber + 1)) {
            return true;
		}
	}

    return false;
  }
}