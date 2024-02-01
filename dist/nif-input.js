import { _ as _decorate, s, i, e, x, a as e$1 } from './query-assigned-elements-13a05a37.js';

let IdentityCardTextfield = _decorate([e$1('identity-card-textfield')], function (_initialize, _LitElement) {
  class IdentityCardTextfield extends _LitElement {
    constructor(...args) {
      super(...args);
      _initialize(this);
    }
  }
  return {
    F: IdentityCardTextfield,
    d: [{
      kind: "field",
      static: true,
      key: "styles",
      value() {
        return i`
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
      }
    }, {
      kind: "field",
      decorators: [e()],
      key: "label",
      value: void 0
    }, {
      kind: "field",
      decorators: [e()],
      key: "description",
      value: void 0
    }, {
      kind: "field",
      decorators: [e()],
      key: "value",
      value: void 0
    }, {
      kind: "field",
      decorators: [e()],
      key: "identityCardType",
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
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "required",
      value() {
        return false;
      }
    }, {
      kind: "field",
      decorators: [e({
        type: Boolean
      })],
      key: "visibility",
      value() {
        return false;
      }
    }, {
      kind: "method",
      static: true,
      key: "getMetaConfig",
      value:
      //Add a read-only mode. See https://help.nintex.com/en-US/formplugins/Reference/ReadOnly.htm

      function getMetaConfig() {
        return {
          controlName: 'Identity Card Text field',
          pluginVersion: '1.0',
          description: 'Text field with identity card validation',
          groupName: 'Custom',
          fallbackDisableSubmit: false,
          iconUrl: 'one-line-text',
          version: '1.0',
          properties: {
            //A custom configuration field. See https://help.nintex.com/en-US/formplugins/Reference/CustomField.htm
            value: {
              //A field to pass a value to the workflow as a variable. See https://help.nintex.com/en-US/formplugins/Reference/StoreValue.htm
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
              enum: ['D.N.I (N.I.F.)', 'Nº de C.U.R.P', 'Pasaporte', 'Tarjeta de Residente Comunitaria', 'Permiso de residencia y Trabajo', 'Nº de Identificación de Extranjero', 'Nº Cédula Dominicana', 'Emp. Global - ID Local'],
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
            visibility: true //Add a read-only mode. See https://help.nintex.com/en-US/formplugins/Reference/ReadOnly.htm
          }
        };
      }

      // Render the UI as a function of component state
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        return x`<input
      class="form-control"
      class="form-control"
      .label="${this.label}"
      .helper="${this.description}"
      ?readOnly="${this.readOnly}"
      ?required="${this.required}"
      @change="${e => this.onChange(e)}"
      .value="${this.value}"
    />`;
      }
    }, {
      kind: "method",
      key: "onChange",
      value: function onChange(e) {
        var _e$target;
        const value = (_e$target = e.target) === null || _e$target === void 0 ? void 0 : _e$target.value;
        const args = {
          bubbles: true,
          cancelable: false,
          composed: true,
          detail: value
        };
        const event = new CustomEvent('ntx-value-change', args);
        this.dispatchEvent(event);
        if (this.validate(value, this.identityCardType) === false) {
          var _e$target2;
          (_e$target2 = e.target) === null || _e$target2 === void 0 ? void 0 : _e$target2.setCustomValidity("This identity card is invalid.");
        } else {
          var _e$target3;
          (_e$target3 = e.target) === null || _e$target3 === void 0 ? void 0 : _e$target3.setCustomValidity("");
        }
      }
    }, {
      kind: "method",
      key: "validate",
      value: function validate(identityCardNumber, identityCardType) {
        switch (identityCardType) {
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
    }, {
      kind: "method",
      key: "validateDni",
      value: function validateDni(documentNumber) {
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
    }, {
      kind: "method",
      key: "validateNie",
      value: function validateNie(documentNumber) {
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
    }]
  };
}, s);

export { IdentityCardTextfield };
