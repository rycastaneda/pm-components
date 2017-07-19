import classNames from 'classnames';
import React from 'react';
import Highlighter from 'react-highlight-words';
function menuRenderer ({
	focusedOption,
	instancePrefix,
	labelKey,
	onFocus,
	onSelect,
	optionClassName,
	optionComponent,
	optionRenderer,
	options,
	valueArray,
	valueKey,
	onOptionRef
}) {
	let Option = optionComponent;
    if(options[0].className==='Select-create-option-placeholder'){
        //if proposed item is the only item available add 'no suggestion available'
        if(options.length==1){
            options.push({label:'No suggestions available',value:null,disabled:true});
        }
        //the default iterater addes new item to first, push it to last.
        var firstItem = options.shift();
        options.push(firstItem);
    }
	var optionsTag= options.map((option, i) => {
		let isSelected = valueArray && valueArray.indexOf(option) > -1;
		let isFocused = option === focusedOption;
		let optionClass = classNames(optionClassName, {
			'Select-option': true,
			'is-selected': isSelected,
			'is-focused': isFocused,
			'is-disabled': option.disabled,
		});
        if(i===0){
            return(
                <div className="suggestionsGroup">
                <label className="selectMenuTitle">Suggestion</label>
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
                        ref={ref => { onOptionRef(ref, isFocused); }}
                    >
                        {optionRenderer(option, i)}
                    </Option>
                </div>);
        }
        if(option.className==='Select-create-option-placeholder'){

            return(
                <div className="newOptionGroup">
                <label className="selectMenuTitle">Create new</label>
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
                        ref={ref => { onOptionRef(ref, isFocused); }}
                    >
                        {optionRenderer(option, i)}
                    </Option>
                    </div>
                );

            }
		return (
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
                ref={ref => { onOptionRef(ref, isFocused); }}
            >
                {optionRenderer(option, i)}
            </Option>
		);
	});

    return optionsTag;
}

module.exports = menuRenderer;
