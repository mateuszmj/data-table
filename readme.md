
<h2>Responsive table system with data fetch</h2>
<h3>Project description</h3>

The system retrieves data from provided API, processes it and renders a responsive table.
<br>Additional system functions are:
- selecting number of records on a single page,
- filtering records,
- sorting table,
- pagination and displaying current number of records.

<br>
<h3>Live example</h3>

You can test working system on the website **[www.mateusz.nanoq.pl/table](http://mateusz.nanoq.pl/table "www.mateusz.nanoq.pl/table")**

<br>
<h3>Technologies</h3>

Project was made using the following technologies:
- JavaScript ES6+
- SCSS with BEM
- HTML

<br>
<h3>Features</h3>

**1. Number of records on a single page**
<br>The system allows to select 20, 50 or 100 records that will be displayed on single page of the table.

![Number of records on page](http://mateusz.nanoq.pl/table/imgs/num-records.png "Number of records on page")

**2. Instant search of records in the table**
<br>The system allows to quickly filter all records, by any field in the table.

![Filter records in the table](http://mateusz.nanoq.pl/table/imgs/filter.png "Filter records in the table")

**3. Sorting table records by any column**
<br>By default, table shows the latest records, sorting it descending by ID.
By clicking on the selected field of the upper table bar, you can change the sorting according to any column.
Clicking once enables ascending sorting (ASC), clicking the second time activates descending sorting (DESC).

![Sorting table records](http://mateusz.nanoq.pl/table/imgs/sort.png "Sorting table records")

**4. Pagination**
<br>The system allows to change table pages by clicking the Previous and Next buttons or selecting a page.

![Pagination](http://mateusz.nanoq.pl/table/imgs/pagination.png "Pagination")

**5. Current number of records in the table**
<br>Current number of records on the page and the number of all records in the table are displayed at the bottom of the table.

![Number of records in table](http://mateusz.nanoq.pl/table/imgs/entries.png "Number of records in table")

**6. Responsive web design (RWD)**
<br>The table is correctly displayed on desktop computers, tablets and smartphones.
If the screen of the mobile device is small and the table does not fit completely, you can easily slide it with one finger.

![Responsive web design](http://mateusz.nanoq.pl/table/imgs/rwd.png "Responsive web design")

<br>
<h3>System installation</h3>

To run the table system on your computer or server, copy the **index.html** file with **JS** and **CSS** folders. Then run the **index.html** file in your browser.

Supported browsers are the latest versions of Google Chrome, Mozilla Firefox, Opera, Safari and Microsoft Edge.

The **SCSS** folder is not necessary to start the system, but there are styling files that determine the appearance of the system. If you want to change the look of the table system, you must edit files from the **SCSS** folder in a text editor with SCSS compiler installed.

<br>
<h3>Project files</h3>

```
index.html
readme.md
js
	/ main.js
css
	/ main.css
	/ main.css.map
scss
	/ _normalize.scss
	/ _variables.scss
	/ main.scss
```
