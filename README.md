# ActiveCampaign Contacts App

This is an app that uses the ActiveCampaign API to build out a table based on given specs. The table includes Contact Name, Total Value from deals, Location and Tags. Styling was based on a provided Styleguide.

## Assumptions

1. API Data

- The overall data is incorporated from the all contacts path (/contacts)
- All monetary values are to be converted and displayed in USD
- If no values or deals are given, a zero is used for representation
- The values that are given will be converted to a dollar ammount by multiplying 0.01
- There is only 1 contact in the provided API with a specific address. This contact will be used for all deals

2. Table Styling

- Font style of Verdana will be universal. It's a similar non-serif font.
- Table alternate color differentiation will be #f7f7fd

3. Table Functionality

- No table functionality included

## Overall

This project brought a few challenges. One challange was making sure that all of the synchronous API calls were continuing to build on the contact object to return. I decided to do most of the functionality on the Back End and make it easier to display on the Front.

The only extra functionality that was added on the front was to convert the value integer into a formatted usd amount.
