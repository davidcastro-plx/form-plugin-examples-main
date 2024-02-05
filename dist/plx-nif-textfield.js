import { _ as _decorate, s, i, e, x, a as e$1 } from './query-assigned-elements-13a05a37.js';

let PlxNifTextfield = _decorate([e$1('plx-nif-textfield')], function (_initialize, _LitElement) {
  class PlxNifTextfield extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: PlxNifTextfield,
    d: [{
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return i`
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
      }
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "documentNumber",
      value: void 0
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "documentType",
      value: void 0
    }, {
      kind: "field",
      decorators: [e({
        type: String
      })],
      key: "placeholder",
      value: void 0
    }, {
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "readOnly",
      value() {
        return false;
      }
    }, {
      kind: "method",
      static: true,
      key: "getMetaConfig",
      value: function getMetaConfig() {
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
            documentType: {
              title: 'Document Type',
              description: 'Identity Card Type',
              type: 'string',
              required: true
            },
            documentNumber: {
              title: 'Document Number',
              description: 'Identity Card Number',
              type: 'string',
              isValueField: true
            }
          },
          events: ['ntx-value-change']
        };
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return x`
      <p>Hello, ${this.documentNumber}</p>
      <input @input=${this.onChange} placeholder=${this.placeholder} ?readonly="${this.readOnly}">
    `;
      }
    }, {
      kind: "method",
      key: "onChange",
      value: function onChange(event) {
        const input = event.target;
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
    }, {
      kind: "method",
      key: "setValidity",
      value: function setValidity(input, isValid) {
        if (isValid === false) {
          input.setCustomValidity('This identity card is invalid.');
        } else {
          input.setCustomValidity('');
        }
      }
    }, {
      kind: "method",
      key: "validateDocument",
      value: function validateDocument(documentType, documentNumber) {
        switch (documentType) {
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
    }, {
      kind: "method",
      key: "validateDni",
      value: function validateDni(documentNumber) {
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
    }, {
      kind: "method",
      key: "validateNie",
      value: function validateNie(documentNumber) {
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
    }]
  };
}, s);

export { PlxNifTextfield };
