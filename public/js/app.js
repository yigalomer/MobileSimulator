var indigoPatches = angular.module('indigoPatches', ["angularGrid"]);

function mainController($scope, $http) {
    $scope.formData = {};

    var columnDefs = [
     { displayName: "Patch ID", field: "_id", filter: 'number' },
     { displayName: "Version", field: "version", filter: CustomStringFilter },
     { displayName: "Developer", field: "developer", filter: 'string' },
     { displayName: "Date", field: "date", filter: CustomDateFilter },
     { displayName: "Patch", field: "text" },
     { displayName: "Status", field: "status", 
         cellClassRules: {
         'rag-green': function (params) { return params.value === "approved" },
         'rag-yellow': function (params) { return params.value === "pending" },
         'rag-red': function(params) { return params.value === "rejected"}
         },
         cellValueChanged: function (params) { $scope.updatePatch(params.data); },
         cellRenderer: customEditorNoAngular,
     },
     { displayName: "Files", field: "folder", cellRenderer: function (params) { return '<a href="' + params.value + '" >Patch Files</a>'; } },
     { displayName: "Delete", template: '<span style="color:red">Delete</span>', cellClicked: function (params) { console.log(params.data._id); $scope.deletePatch(params.data._id); } },
    ];

    var setSelectionOptions = {};
    setSelectionOptions["status"] = ['', 'approved', 'pending', 'rejected'];
    function customEditorNoAngular(params) {

        var editing = false;

        var eCell = document.createElement('span');
        var eLabel = document.createTextNode(params.value);
        eCell.appendChild(eLabel);

        var eSelect = document.createElement("select");
        console.log(setSelectionOptions);
        setSelectionOptions[params.colDef.field].forEach(function (item) {
            var eOption = document.createElement("option");
            eOption.setAttribute("value", item);
            eOption.innerHTML = item;
            eSelect.appendChild(eOption);
        });

        eCell.addEventListener('click', function () {
            if (!editing) {
                eCell.removeChild(eLabel);
                eCell.appendChild(eSelect);
                eSelect.focus();
                editing = true;
            }
        });

        eSelect.addEventListener('blur', function () {
            if (editing) {
                editing = false;
                eCell.removeChild(eSelect);
                eCell.appendChild(eLabel);
            }
        });

        eSelect.addEventListener('change', function () {
            if (editing) {
                editing = false;
                var newValue = eSelect.value;
                params.data[params.colDef.field] = newValue;
                $scope.updatePatch(params.data);
                eLabel.innerHTML = newValue;
                eCell.removeChild(eSelect);
                eCell.appendChild(eLabel);
            }
        });

        return eCell;
    }    
    function CustomStringFilter(params) {
        console.log(params);
        this.$scope = params.$scope;
        this.$scope.columnName = params.colDef.displayName
        this.$scope.onFilterChanged = function () {
            params.filterChangedCallback();
        };
    }

    CustomStringFilter.prototype.getGui = function () {
        return '<div style="padding: 4px; width: 200px;">' +
            '<div style="font-weight: bold;">' + this.$scope.columnName + ' Filter</div>' +
            '<div><input style="margin: 4px 0px 4px 0px;" type="text" ng-model="filterText" ng-change="onFilterChanged()" placeholder="Partial ' + this.$scope.columnName + ' search..."/></div>' +
            '</div>';
    };

    CustomStringFilter.prototype.doesFilterPass = function (node) {
        var filterText = this.$scope.filterText;
        if (!filterText) {
            return true;
        }
        // make sure each word passes separately, ie search for firstname, lastname
        var passed = true;
        filterText.toLowerCase().split(" ").forEach(function (filterWord) {
            if (node.value.toString().toLowerCase().indexOf(filterWord) < 0) {
                passed = false;
            }
        });

        return passed;
    };

    CustomStringFilter.prototype.isFilterActive = function () {
        var value = this.$scope.filterText;
        return value !== null && value !== undefined && value !== '';
    };    function CustomDateFilter(params) {
        this.$scope = params.$scope;
        this.$scope.columnName = params.colDef.displayName
        this.$scope.onFilterChanged = function () {
            params.filterChangedCallback();
        };
    }

    // Source: http://stackoverflow.com/questions/497790
    var dates = {
        convert: function (d) {
            // Converts the date in d to a date-object. The input can be:
            //   a date object: returned without modification
            //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
            //   a number     : Interpreted as number of milliseconds
            //                  since 1 Jan 1970 (a timestamp) 
            //   a string     : Any format supported by the javascript engine, like
            //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
            //  an object     : Interpreted as an object with year, month and date
            //                  attributes.  **NOTE** month is 0-11.
            return (
                d.constructor === Date ? d :
                d.constructor === Array ? new Date(d[0], d[1], d[2]) :
                d.constructor === Number ? new Date(d) :
                d.constructor === String ? new Date(d) :
                typeof d === "object" ? new Date(d.year, d.month, d.date) :
                NaN
            );
        },
        compare: function (a, b) {
            // Compare two dates (could be of any type supported by the convert
            // function above) and returns:
            //  -1 : if a < b
            //   0 : if a = b
            //   1 : if a > b
            // NaN : if a or b is an illegal date
            // NOTE: The code inside isFinite does an assignment (=).
            return (
                isFinite(a = this.convert(a).valueOf()) &&
                isFinite(b = this.convert(b).valueOf()) ?
                (a > b) - (a < b) :
                NaN
            );
        },
        inRange: function (d, start, end) {
            // Checks if date in d is between dates in start and end.
            // Returns a boolean or NaN:
            //    true  : if d is between start and end (inclusive)
            //    false : if d is before start or after end
            //    NaN   : if one or more of the dates is illegal.
            // NOTE: The code inside isFinite does an assignment (=).
            return (
                 isFinite(d = this.convert(d).valueOf()) &&
                 isFinite(start = this.convert(start).valueOf()) &&
                 isFinite(end = this.convert(end).valueOf()) ?
                 start <= d && d <= end :
                 NaN
             );
        }
    }
    CustomDateFilter.prototype.getGui = function () {
        return '<div style="padding: 4px; width: 250px;">' +
            '<div style="font-weight: bold;">' + this.$scope.columnName + ' Filter</div>' +
            '<div>From Date: <input style="margin: 4px 0px 4px 0px;" type="date" ng-model="filterFromDate" ng-change="onFilterChanged()" placeholder="Partial ' + this.$scope.columnName + ' search..."/></div>' +
            '<div>To Date&nbsp;&nbsp;&nbsp;&nbsp;: <input style="margin: 4px 0px 4px 0px;" type="date" ng-model="filterToDate" ng-change="onFilterChanged()" placeholder="Partial ' + this.$scope.columnName + ' search..."/></div>' +
            '</div>';
    };

    CustomDateFilter.prototype.doesFilterPass = function (node) {
        var filterFromDate = this.$scope.filterFromDate;
        var filterToDate = this.$scope.filterToDate;
        if (!filterToDate && !filterFromDate) {
            return true;
        }

        // filterFromDate
        if (filterFromDate) {
            filterFromDate = filterFromDate.toString().replace(/-/g, '/');
        } else {
            filterFromDate = new Date("1/1/2014");
            
        }

        // filterToDate
        if (filterToDate) {
            filterToDate = filterToDate.toString().replace(/-/g, '/');
        }
        else {
            filterToDate = Date.now();
        }

        // nodeDate
        var parts = node.value.toString().split("/");
        if(parts.length != 3)
            parts = node.value.toString().split("-");
        var nodeDate = new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));

        console.log(filterFromDate);

        return dates.inRange(nodeDate, filterFromDate, filterToDate) == true;

    };

    CustomDateFilter.prototype.isFilterActive = function () {
        var value1 = this.$scope.filterFromDate;
        var value2 = this.$scope.filterToDate;
        return (value1 !== null && value1 !== undefined && value1 !== '')
            ||
            (value2 !== null && value2 !== undefined && value2 !== '');
    };
    $scope.patches = {};
    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: null,
        dontUseScrolls: false ,// because so little data, no need to use scroll bars
        enableFilter: true,        angularCompileFilters: true,
        enableColResize: true,
        enableSorting: true,
        colWidth : 100,
};

 // when landing on the page, get all patches and show them
    $http.get('/api/patches')
        .success(function(data) {
            $scope.gridOptions.rowData = $scope.patches = data;
            $scope.gridOptions.api.onNewRows();
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createPatch = function() {
        $http.post('/api/patches', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.gridOptions.rowData = $scope.patches = data;
                $scope.gridOptions.api.onNewRows();
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.createManyPatchs = function () {
        for (i = 0; i < 1000; i++) {
            $http.post('/api/patches');
        }
        $http.get('/api/patches')
               .success(function (data) {
                   $scope.gridOptions.rowData = $scope.patches = data;
                   $scope.gridOptions.api.onNewRows();
                   console.log(data);
               })
               .error(function (data) {
                   console.log('Error: ' + data);
               });
    };

    // delete a patch after checking it
    $scope.deletePatch = function(id) {
        $http.delete('/api/patches/' + id)
            .success(function(data) {
                $scope.gridOptions.rowData = $scope.patches = data;
                console.log(data);
                $scope.gridOptions.api.onNewRows();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.updatePatch = function (patch) {
        $http.put('/api/patches/' + patch._id,patch)
            .success(function (data) {
                $scope.gridOptions.rowData = $scope.patches = data;
                console.log(data);
                $scope.gridOptions.api.onNewRows();
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


}