Category Selector Component
============================

## To run component independently

- Run command below from inside `category-selector` folder

    ```
    npm start
    ```
    
- Go to `localhost:5050`


## Limitations

- `Quote Id` is not available inside the react component context, this is why a hidden field is used to transfer the value from
php page to the component `<input type="hidden" id="quote_id" value="" />`

- `Category Id` is the value which `Category Selector` component needs to 'give back' to php page. In order to achieve it, 
there is a `triggerDomChanges` function which looks for a hidden input `<input type="hidden" id="qr_category_id" value="" />` 
and populates it with the selected category id.

- As part of the component flow, there is a need to obtain `Item Id` upfront. This is why, there is an api call 
to `createItem` or `updateItem` when user selected the category. The response value is then populated to hidden input value
`<input type="hidden" id="item_id" value="" />`.