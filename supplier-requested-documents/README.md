# Supplier Details - Requested Documents

Component that handles different required items that contains dropzones for files to be uploaded. Mainly used for Supplier Details 

# How to run

 - Change the `quote-id` in `index.html` to any quote ID that the default searcher has.
 - Change the `matched-item-id` to the selected matched item in the ui 
 - Run `npm install` and `npm start` then go to http://pm.local.dev:8000 


# TODO
Currently in pm-web this is part of a form which is handled in jquery; It needs to sendback the uploaded documents mapping in <input type="hidden" name="requestedDocuments"> which is not really ideal in terms of standard. The proposed solution would be to put it in the component container as one of data-attributes then change the code in pm-web to pick it up via jquery/javascript.