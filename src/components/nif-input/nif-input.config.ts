import { PluginContract } from '@nintex/form-plugin-contract';

export const config: PluginContract = {
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