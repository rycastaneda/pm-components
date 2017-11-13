# Standard User - Sign Offs

This component would contain the sections per supplier and also can see where the user is assigned to. User can approved/not approved the section its assigned to. 

# Data Attributes to specify from pm-web
`data-component="staff-sign-offs"` query selector
`data-read-only` true or false if component will render on read only
`data-preferred-supplier-id="57"`  PIT supplier
`data-organization-id="1"` Organization 
`data-user-id` user id of the pit supplier

# How to test

Run `npm install` then `npm start`

Login as PIT Staff - Standard User > Hover on Suppliers > Current Application and select a pending supplier > Compliance Questionnaire

