/** 
 * Class representing an exchange tracker. 
 * It was quite a challange to build and update the table 
 * withot using jQuery or something like this, but i did it.
 * */
class ExchangeTracker {
  /**
 * Creates an exchange tracker.
 * @param {string}   baseURL        - Base API URL.
 * @param {object[]} symbols        - Company names to fetch.
 * @param {object[]} staticFilters  - Static fields to fetch.
 * @param {object[]} dynamicFilters - Dynamic fieelds to fetch.
 * @param {string}   token          - API acess token.
 */
  constructor(baseURL, symbols, staticFilters, dynamicFilters, token) {
    this.baseURL = baseURL;
    this.symbols = symbols;
    this.static = staticFilters;
    this.dynamic = dynamicFilters;
    this.token = token;
    // Time field will be constantly overwrittn by one async function,
    // and read by another. 
    //  And, as I understand, since JS is single threaded,
    // I don't need a mutex lock/unlock in this kind of a situation.
    this.time = Date.now();
  }

  /**
  * Returns url with required query.
  * @param {bool} isStatic - If true - returns the URL for recieving all fields in the table, 
  * returns URL only for dynamic fields otherwise.
  * @return {string} URL with required query.
  */
  getUrl(isStatic = false) {
    const smb = this.getQuery(this.symbols, "symbols");
    const flt = this.getFilters(isStatic); // get query for all/only dynamic fields

    return `${this.baseURL}?${smb}&${flt}&types=quote&token=${this.token}`
  }

  /**
   * Builds query from given array of properties and property name.
   * @param {string[]} args - Array of query properties. 
   * @param {string} name   - Name of query property. 
   * @return {string} URL query.
   */
  getQuery(args, name) {
    let query = name + "=";

    for (const arg of args) {
      query += arg + ',';
    }

    return query.substring(0, query.length - 1); // Remove trailing comma.
  }

  /**
   * Returns URL query for recieving all or only dynamic fields in the table.
   * @param {bool} isStatic - If true - returns the URL for recieving all fields in the table, 
   * returns URL only for dynamic fields otherwise. 
   * @return {string} URL query for table fields.
   */
  getFilters(isStatic) {
    if (isStatic) {
      return this.getQuery(this.static.concat(this.dynamic), "filter")
    }
    return this.getQuery(this.dynamic, "filter")
  }

  /**
   * Receives data from giben URL, and parses it.
   * @param {string} fetchUrl - URL to fetch. 
   * @return {object[]} processed data array.
   */
  async getData(fetchUrl) {
    let data = await this.fetchData(fetchUrl);
    return this.parseData(data);
  }

  /**
   * Parses data recieved from API to more convenient format for 
   * building/updating a table.
   * @param {object[]} data - API url. 
   * @return {object[]} processed data array.
   */
  parseData(data) {
    let dataArray = [];

    for (var key in data) {
      let quote = data[key]["quote"];
      // Calculates the difference between yesterday and today's price.
      quote.previousClose = (quote.previousClose - quote.latestPrice).toFixed(2)
      dataArray.push(quote);
    }

    return dataArray;
  }

  /**
   * Retrieves data from given URL.
   * @param {string} url - API url. 
   * @return {object} promise with the json retrieved from API.
   */
  async fetchData(url) {
    let response = await fetch(url);

    if (!response.ok) {
      console.log("Error HTTP code: " + response.status);
      return "";
    }

    return response.json();
  }

  /**
   * Updates table with given data.
   * @param {object[]} data - Data for page updating. 
   */
  updateTable(data) {
    let tableData = [];
    const keys = Object.keys(data[0]) // Get passed data keys.

    // Get all table cells whouse class that === data key.
    for (const key of keys) {
      tableData.push(document.getElementsByClassName(key));
    }

    // Iterate over all received objects .
    for (let i = 0; i < data.length; i++) {
      let values = Object.values(data[i]) // Get their values.
      // Iterate over values elements. 
      for (let j = 0; j < values.length; j++) {
        // Since table cells and recieved values organised in the same order,
        // and have same length,
        // get required cell, and update it with passed value
        tableData[j][i].innerHTML = values[j];
      }
    }

    this.time = Date.now(); // Update "last update" time.
  }

  /** Updates page timer.*/
  updateTimeWorker() {
    let timeDiff = (Date.now() - this.time) / 1000 // milliseconds to seconds 
    document.getElementById('time').textContent = timeDiff.toFixed(1);
  }

  /**
   * Updates table with data fetched from given URL.
   * @param {string} partialUrl - URL for dynamic fields. 
   */
  async updateTableWorker(partialUrl) {
    let data = await this.getData(partialUrl);
    this.updateTable(data);
  }

  /**
   * Build table from data recieved from given URL.
   * @param {string} partialUrl - URL for all table fields. 
   */
  async createTable(fullUrl, columnNames) {
    let data = await this.getData(fullUrl);
    this.buildTable(data, columnNames);
  }

  /**
   * Builds table from given data in html .
   * @param {Object[]} rows        - Data from which the table will be built. 
   * @param {Object[]} columnNames - Names of the table columns. 
   */
  buildTable(rows, columnNames) {
    let html = '<table id="data-table">';
    html += '<tr>';

    for (let j of columnNames) {
      html += '<th>' + j + '</th>';
    }

    html += '</tr>';
    for (let i = 0; i < rows.length; i++) {
      html += '<tr>';
      for (let j in rows[i]) {
        // Adding classes for fields with the same type of information for the possibility of future updates.
        html += `<td class="${j}">` + rows[i][j] + '</td>';
      }
      html += '</tr>';
    }
    html += '</table>';

    document.getElementById('container').innerHTML = html;
  }

  /**
   * Runs the exchange tracker object.
   */
  run() {
    const fullURL = this.getUrl(true); // Get URL for all table columns.
    const partialURL = this.getUrl(); // Fet URL for only dynamic columns.

    let columnNames = ["Company name", "Position name", "Latest prise", "Latest prise diff"];
    this.createTable(fullURL, columnNames) // Build table with given column names.

    // Run worker wich will update the timer on the page every 0.1 second.
    rxjs.interval(100)
      .subscribe(() => {
        this.updateTimeWorker();
      });

    // Run worker wich will update the table every 20 seconds.
    rxjs.interval(20000)
      .subscribe(() => {
        this.updateTableWorker(partialURL);
      });
  }
}

// Company symbols. 
// Used in URL query to receive data about specific company.
companies = [
  "AAPL",
  "FB",
  "TSLA",
  "AMZN",
  "MSFT",
  "KO",
  "SPOT",
  "NFLX",
  "NOK",
  "SNE"
]

// Fields that won't be dynamicly updated.
staticFilters = ["symbol", "companyName"]
// Fields that will be dynamicly updated.
dynamicFilters = ["latestPrice", "previousClose"]

new ExchangeTracker("https://cloud.iexapis.com/v1/stock/market/batch",
  companies,
  staticFilters,
  dynamicFilters,
  "").run();