Quote Requirements Component
============================

## To run component independently

- Checkout `feature/API-19` of API repo and run command below from inside `quote-requirements` folder

    ```
    npm start
    ```
    
- Go to `localhost:5050`


## To run as part of plantminer-web
 
- Checkout `plantminer-web` `feature/PM-1055` + `feature/API-19` of API

- Login as a searcher and start creating a new QR

- Proceed to the second step which is `Add services` and start adding a new service

- Quote Requirements section will be visible underneath Pricing Requirements section


## Limitations

- `Quote Id` is not available inside the react component context, this is why a hidden field is used to transfer the value from
php page to the component `<input type="hidden" id="quote_id" value="" />`


- Selected `Category Id` is not available inside component context but is required to make a request to API. As a work around
there is a hidden input value `<input type="hidden" id="qr_category_id" value="" />` which is added to the php page.


- `Category Id` is a dynamic value based on which category the user selected. In order to track the changes of category id, 
there is a `change event listener` added to the component `categoryIdField.addEventListener('change',  ...`

- `Item Id` is available only inside php page and is triggered by `Category Selector` component. The value is required to 
make api requests to save/update requirements.