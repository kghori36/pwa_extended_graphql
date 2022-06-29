const renderOption = (_args, _callback, _instance) => {
    const option = _args[0];
    const {
        id,
        label,
        subLabel,
        isPlaceholder = false,
        isHovered,
        isAvailable = true,
        color
    } = option;
    
    if(!color) {
        return _callback.apply(_instance, _args);
    }

    const {
        isExpanded,
        handleSelectListOptionClick
    } = _instance.props;

    return (
        <li
          block="FieldSelect"
          elem="Option"
          mods={ {
              isDisabled: !isAvailable,
              isExpanded,
              isPlaceholder,
              isHovered
          } }
          key={ id }
          /**
           * Added 'o' as querySelector does not work with
           * ids, that consist of numbers only
           */
          id={ `o${id}` }
          role="menuitem"
          // eslint-disable-next-line react/jsx-no-bind
          onMouseDown={ () => handleSelectListOptionClick(option) }
          // eslint-disable-next-line react/jsx-no-bind
          onTouchStart={ () => handleSelectListOptionClick(option) }
          // eslint-disable-next-line react/jsx-no-bind
          onKeyPress={ () => handleSelectListOptionClick(option) }
          tabIndex={ isExpanded ? '0' : '-1' }
        >
            { renderColorValue({ color, label }, _callback, _instance)}
            { label }
            { subLabel && (
                <strong>
                    { ` ${subLabel}` }
                </strong>
            ) }
        </li>
    );
}

const getIsColorLight = (_args,_callback,_instance) => {
    const hex = _args[0];

    const color = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB

    return ((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186;
}

const renderColorValue = (_args, _callback, _instance) => {
    const { color, label } = _args;
    const { isFormattedAsText, isSelected } = _instance.props;
        
    if(!color) {
        return _callback.apply( _instance, _args);
    }
    const isLight = getIsColorLight(color);

    if (isFormattedAsText) {
        return label || __('N/A');
    }

    const style = {
        '--option-background-color': color,
        '--option-border-color': isLight ? '#dddddd' : color,
        '--option-check-mark-background': isLight ? '#000' : '#fff',
        // stylelint-disable-next-line value-keyword-case
        '--option-is-selected': isSelected ? 1 : 0,
        'pointer-events': 'none'
    };

        return (
            <data
              block="ProductAttributeValue"
              elem="Color"
              value={ label }
              title={ label }
              style={ style }
            />
        );
}


const renderNativeSelect = (_args, _callback, _instance) => {
    const {
        setRef, 
        attr, 
        events, 
        isDisabled, 
        options, 
        handleSelectListOptionClick, 
        isSelectedOptionAvailable,
        selectedOptionIndex
    } = _instance.props;

    const selectedOption = options[selectedOptionIndex];
	const color = selectedOption && selectedOption.color ? selectedOption.color : null;

    if(!selectedOptionIndex > 0 && !color ) { 
        return _callback.apply(_instance, _args);
    }

    const { label } = selectedOption;
   
    return (
        <>
        { renderColorValue({ color, label }, _callback, _instance)}
        <select
          block="FieldSelect"
          elem="Select"
          mods={ { isDisabled: !isSelectedOptionAvailable } }
          ref={ (elem) => setRef(elem) }
          disabled={ isDisabled }
          // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
          { ...attr }
          // eslint-disable-next-line @scandipwa/scandipwa-guidelines/jsx-no-props-destruction
          { ...events }
          onChange={ handleSelectListOptionClick }
        >
            { options.map((option) => _instance.renderNativeOption(option, _callback, _instance)) }
        </select>
        </>
    );
}

const containerProps = (_args, _callback, _instance) => {
    const { selectedOptionIndex } = _instance.state;

    return {
        ..._callback.apply( _instance, _args),
        selectedOptionIndex
    }
}


export default {
    'Component/FieldSelect/Component': {
        'member-function': {
            renderNativeSelect,
            renderOption
        }
    },
    'Component/FieldSelect/Container': { 
        'member-function': { 
            containerProps
        }
    }
}