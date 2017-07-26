import classNames from 'classnames';
import React from 'react';
const AddGroupMenuRenderer = ({
	focusedOption,
	instancePrefix,
	onFocus,
	onSelect,
	optionClassName,
	optionComponent,
	optionRenderer,
	options,
	valueArray,
	valueKey,
	onOptionRef
}) => {
    let Option = optionComponent;
    if (options[0].className === 'Select-create-option-placeholder') {
        // if proposed item is the only item available add 'no suggestion available'
        if (options.length === 1) {
            options.push({ label:'No suggestions available', value:null, disabled:true });
        }
    // the default iterater addes new item to first, push it to last.
        let firstItem = options.shift();
        options.push(firstItem);
    }
    let optionsTag = options.map((option, i) => {
        let isSelected = (valueArray && (valueArray.indexOf(option) > -1));
        let isFocused = (option === focusedOption);
        let optionClass = classNames(optionClassName, {
            'Select-option': true,
            'is-selected': isSelected,
            'is-focused': isFocused,
            'is-disabled': option.disabled
        });
        let containerClassName = null;
        let className = null;
        let title = '';
        let titleTag = null;

        if (i === 0) {
            containerClassName = 'suggestionsGroup';
            className ='selectMenuTitle';
            title ='Suggestion';
        }

        if (option.className === 'Select-create-option-placeholder') {
            containerClassName = 'newOptionGroup';
            className = 'selectMenuTitle';
            title = 'Create new';
        }

        if (title.length) {
            titleTag = <label className={className}>{title}</label>;
        }

        return (
         <div className={containerClassName} key={`option-container-${i}-${option[valueKey]}`}>
            {titleTag}
            <Option
                className={optionClass}
                instancePrefix={instancePrefix}
                isDisabled={option.disabled}
                isFocused={isFocused}
                isSelected={isSelected}
                key={`option-${i}-${option[valueKey]}`}
                onFocus={onFocus}
                onSelect={onSelect}
                option={option}
                optionIndex={i}
                ref={(ref) => {
                    onOptionRef(ref, isFocused);
                }}
              >
                {optionRenderer(option, i)}
              </Option>
				</div>
			);
    });
    return optionsTag;
};

export default AddGroupMenuRenderer;
