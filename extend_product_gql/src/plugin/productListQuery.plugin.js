
const _getAttributeFields = (_args, _callback, _instance) => {

    return [
        ..._callback.apply(_instance, _args),
        'attribute_color'
    ];
}

const _getProductBundleOptionFields = (_args, _callback, _instance) => { 

    return [
        ..._callback.apply(_instance, _args),
        _instance. _getAttributesField()
    ];
}

 export default {
    'Query/ProductList/Query': {
        'member-function': {
            _getAttributeFields,
            _getProductBundleOptionFields
        }
    }
}