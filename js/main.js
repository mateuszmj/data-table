"use strict";

// Variables

let apiCompanies = 'https://recruitment.hal.skygate.io/companies';
let apiIncomes = 'https://recruitment.hal.skygate.io/incomes/';

let tableInfo = document.querySelector('.table-info');
let pageTableHTML = document.querySelector('.table-main__tbody');
let paginationWrapper = document.querySelector('.pagination-wrapper');
let recordsPerPageInput = document.querySelector('.records-per-page__input');
let filterInput = document.querySelector('.filter__input');
let countRecordsWrapper = document.querySelector('.count-records-wrapper');
let sortBtns = document.querySelectorAll('.sort-btn');

let tableObject = [];
let activePage = 1;
let recordsPerPage = recordsPerPageInput.value;
let sortKey = 'id';
let sortDir = 'asc';


// Event Listeners

recordsPerPageInput.addEventListener("change", changeRecordsPerPage);
filterInput.addEventListener("keyup", function () { filterTable(); });

sortBtns.forEach(function (item) {
    item.addEventListener("click", function () { sortTable(item.dataset.idx); });
});


// Fetch Data

function getCompanies() {
    toggleLoading('show');
    fetch(apiCompanies).then(function (response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then(function (dataCompanies) {
        getIncomes(dataCompanies);
    }).catch(function (error) {
        console.warn(error);
    });
}

function getIncomes(dataCompanies) {
    for (let i = 0; i < dataCompanies.length; i++) {
        fetch(apiIncomes + dataCompanies[i].id)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(response);
                }
            })
            .then(function (dataIncome) {
                tableObject.push({
                    id: dataCompanies[i].id,
                    name: dataCompanies[i].name,
                    city: dataCompanies[i].city,
                    sumIncome: sumIncome(dataIncome.incomes),
                    avgIncome: avgIncome(sumIncome(dataIncome.incomes), dataIncome.incomes.length),
                    lastMonthtIncome: lastMonthtIncome(dataIncome)
                });
                if (tableObject.length == dataCompanies.length) {
                    sortTable(sortKey, sortDir);
                    toggleLoading('hide');
                }
            })
            .catch(function (error) {
                console.warn(error);
            });
    }
}


// Calc Incomes

function sumIncome(dataIncomes) {
    let sumIncomeValue = 0;
    for (let i = 0; i < dataIncomes.length; i++) {
        sumIncomeValue += parseFloat(dataIncomes[i].value);
    }
    return parseFloat(sumIncomeValue);
}

function avgIncome(sum, length) {
    return sum / length;
}

function lastMonthtIncome(dataIncome) {
    let lastMonth = dataIncome.incomes.map(function (date) { return date.date; }).sort().reverse()[0].substring(0, 7);
    let lastMonthSum = 0;
    for (let i = 0; i < dataIncome.incomes.length; i++) {
        let recordMonth = dataIncome.incomes[i].date.substring(0, 7);
        if (recordMonth == lastMonth) {
            lastMonthSum += parseFloat(dataIncome.incomes[i].value);
        }
    }
    return lastMonthSum;
}


// Sort

function sortTable(key = 'id', order = 'asc') {
    if (sortKey == key && sortDir == 'asc') {
        order = 'desc'
        sortDir = order;
    } else {
        sortKey = key;
        order = 'asc';
        sortDir = order;
    }
    tableObject.sort(compareSort(key, order));
    filterTable();
}

function compareSort(key, order) {
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
        }
        const varA = (typeof a[key] === 'string')
            ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
            ? b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}


// Filter

function filterTable(table = tableObject) {
    activePage = 1;
    let filterString = document.querySelector('.filter__input').value;
    if (filterString != '') {
        let filterResult = [];
        for (let i = 0; i < table.length; i++) {
            let toString = `${table[i].id} ${table[i].name} ${table[i].city} ${table[i].sumIncome} ${table[i].avgIncome} ${table[i].lastMonthtIncome}`;
            if (toString.toUpperCase().includes(filterString.toUpperCase())) {
                filterResult.push(table[i]);
            }
        }
        table = filterResult;
    }
    renderTable(table);
}


// Render

function renderTable(table) {
    let tableHTML = '';
    let startCounting = (recordsPerPage * (activePage - 1));
    let endCounting = (recordsPerPage * activePage);
    for (let i = startCounting; i < endCounting && i < table.length; i++) {
        tableHTML += `<tr>
        <td>${table[i].id}</td>
        <td>${table[i].name}</td>
        <td>${table[i].city}</td>
        <td>${table[i].sumIncome.toFixed(2)}</td>
        <td>${table[i].avgIncome.toFixed(2)}</td>
        <td>${table[i].lastMonthtIncome.toFixed(2)}</td>
        </tr>`;
    }
    pageTableHTML.innerHTML = tableHTML;
    renderCountRecord(startCounting, endCounting, table.length);
    renderPaginationBtns(table);
}

function renderPaginationBtns(table) {
    let paginationBtnsHTML = '';
    let activeBtnClass;
    let numberOfPages = Math.ceil(table.length / recordsPerPage);

    if (table.length > 0) {
        if (activePage <= 1) activeBtnClass = ` disabled`;
        paginationBtnsHTML += `<a class="change-page ${activeBtnClass}" data-idx="prev">Previous</a>`;
        for (let i = 1; i <= numberOfPages; i++) {
            if (i == activePage) { activeBtnClass = ` active`; } else { activeBtnClass = ``; }
            paginationBtnsHTML += `<a class="change-page ${activeBtnClass}" data-idx="${i}">${i}</a>`;
        }
        if (activePage >= numberOfPages) activeBtnClass = ` disabled`;
        paginationBtnsHTML += `<a class="change-page ${activeBtnClass}" data-idx="next">Next</a>`;
    } else {
        paginationBtnsHTML = `<a class="table-info">No records found</a>`;
    }
    paginationWrapper.innerHTML = paginationBtnsHTML;

    let changePageBtns = document.querySelectorAll('.change-page');
    for (let i = 0; i < changePageBtns.length; i++) {
        changePageBtns[i].addEventListener("click", function () {
            changePage(changePageBtns[i].dataset.idx, table);
        });
    }
}

function renderCountRecord(start, end, num) {
    if (num < end) end = num;
    countRecordsWrapper.innerHTML = `Showing ${start} to ${end} of ${num} entries`;
}


// Interface

function toggleLoading(status) {
    if (status == 'show') {
        tableInfo.style.display = "block";
    } else {
        tableInfo.style.display = "none";
    }
}

function changePage(status, table) {
    activePage = parseInt(activePage);
    let numberOfPages = Math.ceil(table.length / recordsPerPage);
    if (status == 'next' && activePage < numberOfPages) {
        activePage += 1;
    } else if (status == 'prev' && activePage > 1) {
        activePage -= 1;
    } else if (!isNaN(status)) {
        activePage = status;
    }
    renderTable(table);
}

function changeRecordsPerPage() {
    recordsPerPage = recordsPerPageInput.value;
    filterTable();
}


// Start

getCompanies();