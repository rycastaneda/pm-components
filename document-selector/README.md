# Document Selector

Table type component that allows searcher to select documents organized by Group

This component has 2 modes: 

## Simple Document Selector
This contains all documents organized by Group that has toggle for selection. Selecting a document will put it in a hidden field for forms

### How to test
 - Change the `quote-id` in `index.html` to any quote ID that the default searcher has. 
 - Set the custom attribute `data-all-items=all` to the data-component tag in `index.html`
 - Set the custom attribute `data-field=item-documents` to change the hidden field in which the documents would be save
 - Run `npm install` and `npm start` then go to http://pm.local.dev:5050 

## Grid matrix 
This contains all requested items with their corresponding checkboxes if the searcher would want to include their uploaded documents from the document-uploader

### How to test 
 - Change the `quote-id` in `index.html` to any quote ID that the default searcher has. 
 - Remove the custom attribute `data-all-items` to the data-component tag in `index.html`
 - Run `npm install` and `npm start` then go to http://pm.local.dev:5050 
