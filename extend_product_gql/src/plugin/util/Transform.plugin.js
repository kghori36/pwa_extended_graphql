import { 
    getAttributesWithValues
} from 'SourceUtil/Product';
import { getProductInStock } from 'SourceUtil/Product/Extract'
import { 
    bundleOptionToLabel,
    getEncodedBundleUid
} from 'SourceUtil/Product/Transform';

const bundleOptionsToSelectTransform = (_args, _callback, _instance) => {
    const [ options ] = _args;
    const  quantity = _args[2] || {};
    const  currencyCode = _args[1] || 'USD';

    return options.reduce((result = [], option) => {
        const {
            uid: sourceUid = '',
            quantity: defaultQuantity = 1,
            position,
            product,
            is_default
        } = option;

        const attribute = getAttributesWithValues(product);
        const isAvailable = getProductInStock(product);

        const {
            priceLabel,
            baseLabel
        } = bundleOptionToLabel(option, currencyCode);

        const { [sourceUid]: currentQty = defaultQuantity } = quantity;
        const uid = getEncodedBundleUid(sourceUid, currentQty);

        result.push({
            id: sourceUid,
            name: sourceUid,
            value: uid,
            label: baseLabel,
            subLabel: priceLabel,
            sort_order: position,
            isAvailable,
            isDefault: is_default,
            color: attribute['Color'] ?  attribute['Color'].attribute_color : null
        });

        return result;
    }, [])
};

export default {
    'Util/Product/Transform/bundleOptionsToSelectTransform': {
        function: {
            position: 101,
            implementation: bundleOptionsToSelectTransform
        }
    }
}