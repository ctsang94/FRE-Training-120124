const data = [
    {region: 'US', model: 'A', sales: 150},
    {region: 'US', model: 'B', sales: 120},
    {region: 'US', model: 'C', sales: 350},
    {region: 'EU', model: 'A', sales: 200},
    {region: 'EU', model: 'B', sales: 100},
    {region: 'EU', model: 'C', sales: 250},
    {region: 'CA', model: 'A', sales: 200},
    {region: 'CA', model: 'B', sales: 100},
    {region: 'CA', model: 'C', sales: 230},
    {region: 'CA', model: 'D', sales: 400},
];

function createTableWithFilters(data) {
    const container = document.getElementById("table-container");
    container.innerHTML = ""; 

    const filtersContainer = document.createElement("div");
    filtersContainer.style.marginBottom = "20px";

    const regionFilter = document.createElement("select");
    regionFilter.id = "region-filter";
    regionFilter.innerHTML = `<option value="">All Regions</option>`;
    [...new Set(data.map(row => row.region))].forEach(region => {
        const option = document.createElement("option");
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });

    const modelFilter = document.createElement("select");
    modelFilter.id = "model-filter";
    modelFilter.innerHTML = `<option value="">All Models</option>`;
    [...new Set(data.map(row => row.model))].forEach(model => {
        const option = document.createElement("option");
        option.value = model;
        option.textContent = model;
        modelFilter.appendChild(option);
    });

    filtersContainer.appendChild(regionFilter);
    filtersContainer.appendChild(modelFilter);
    container.appendChild(filtersContainer);

    function renderTable(filteredData) {
        const existingTable = document.querySelector("table");
        if (existingTable) existingTable.remove();

        const table = document.createElement("table");
        const headers = ["Region", "Model", "Sales"];

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");
        headers.forEach(header => {
            const th = document.createElement("th");
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        let currentRegion = null;
        const regionSums = {};

        filteredData.forEach(row => {
            if (!regionSums[row.region]) {
                regionSums[row.region] = 0;
            }
            regionSums[row.region] += row.sales;

            if (row.region !== currentRegion) {
                const summaryRow = document.createElement("tr");

                const regionCell = document.createElement("td");
                regionCell.textContent = row.region;

                const modelCell = document.createElement("td");
                modelCell.textContent = "SUM";

                const sumCell = document.createElement("td");
                sumCell.textContent = regionSums[row.region];

                summaryRow.appendChild(regionCell);
                summaryRow.appendChild(modelCell);
                summaryRow.appendChild(sumCell);
                tbody.appendChild(summaryRow);

                currentRegion = row.region;
            }

            const dataRow = document.createElement("tr");
            const values = [row.region, row.model, row.sales];
            values.forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                dataRow.appendChild(td);
            });
            tbody.appendChild(dataRow);
        });

        table.appendChild(tbody);
        container.appendChild(table);
    }

    renderTable(data);

    regionFilter.addEventListener("change", () => applyFilters());
    modelFilter.addEventListener("change", () => applyFilters());

    function applyFilters() {
        const selectedRegion = regionFilter.value;
        const selectedModel = modelFilter.value;

        const filteredData = data.filter(row => {
            const regionMatch = selectedRegion ? row.region === selectedRegion : true;
            const modelMatch = selectedModel ? row.model === selectedModel : true;
            return regionMatch && modelMatch;
        });

        renderTable(filteredData);
    }
}

createTableWithFilters(data);
