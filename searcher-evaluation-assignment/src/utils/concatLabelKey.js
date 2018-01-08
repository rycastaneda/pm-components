export const concatLabelKey = (optionsList) => {
    return optionsList.map((optionItem) => {
        return {
            ...optionItem,
            fullName: `${optionItem.firstName} ${optionItem.lastName}`,
            value: `${optionItem.id}`
        };
    });
};