sortTable = function (table, col, reverse) {
    var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
        tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
        i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        return reverse // `-1 *` if want opposite order
            * (
                compare(a.cells[col].textContent.trim(), b.cells[col].textContent.trim())
            );
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
};


makeSortable = function (table) {
    var th = table.tHead, i;
    th && (th = th.rows[0]) && (th = th.cells);
    if (th) i = th.length;
    else return; // if no `<thead>` then do nothing
    while (--i >= 0) (function (i) {
        var dir = 1;
        th[i].addEventListener('click', function () {
            sortTable(table, i, (dir = 1 - dir))
        });
    }(i));
};

makeAllSortable = function (parent) {
    parent = parent || document.body;
    var t = parent.getElementsByClassName('averagetable'), i = t.length;
    while (--i >= 0) makeSortable(t[i]);
};

compare = function (var1, var2) {
    if (isNaN(parseFloat(var1))) {                      //Compare String
        return var1.localeCompare(var2);
    }
    else {
        if (parseFloat(var1) > parseFloat(var2)) {      //Compare Float
            return 1;
        }
        else {
            return -1;
        }
    }


};