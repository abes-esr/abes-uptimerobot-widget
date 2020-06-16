import axios from 'axios';

export default class AbesUptimerobotWidget {

  constructor(options) {
    this.api_url = options.api_url;
    this.api_key = options.api_key;
    this.onLOADING = options.onLOADING;
    this.onUP = options.onUP;
    this.onDOWN = options.onDOWN;

    this._checkUptimeRobotApi();
  }

  _checkUptimeRobotApi() {
    const self = this;

    var upApiParams = {
        api_url: this.api_url,
        api_key: this.api_key,
        format: 'json',
        logs: 1
    };
    // 50 is the max allowed by the uptimerobot api
    var upApiMonitorPerPage = 50;

    // request a first time to know how many monitors exists
    // so it's possible to calculate how many pages should be requested
    self.onLOADING();
    axios.post(upApiParams.api_url, {
        api_key: upApiParams.api_key,
        format: upApiParams.api_format,
        logs: upApiParams.log,
        limit: 1
    })
    .then(function (response) {
        // loop over all the monitors pages
        var monitors_nb_pages = Math.floor(response.data.pagination.total/upApiMonitorPerPage) + 1;
        var monitors_axios_requests = [];
        for (var page = 0; page < monitors_nb_pages; page++) {
            monitors_axios_requests.push(
                axios.post(upApiParams.api_url, {
                    api_key: upApiParams.api_key,
                    format: upApiParams.api_format,
                    logs: upApiParams.log,
                    offset: page * upApiMonitorPerPage,
                    limit: upApiMonitorPerPage
                })
            );
        }
        axios.all(monitors_axios_requests).then(axios.spread(function () {
            // we have all the monitors, so we can display the global UP (sun) or DOWN (sun with coulds)
            var ok = true;
            var monitorsMerged = [];
            //console.log(arguments, arguments.length, arguments[0]);
            for (var page = 0; page < arguments.length; page++) {
                monitorsMerged = monitorsMerged.concat(arguments[page].data.monitors);
            };
            for (var i = 0; i < monitorsMerged.length; i++) {
                //console.log(monitorsMerged[i].friendly_name, monitorsMerged[i].status);
                if (monitorsMerged[i].status != 2 && monitorsMerged[i].status != 0) ok = false;
            }
            if (ok) {
              self.onUP();
            } else {
              self.onDOWN();
            }
        }));
    })
    .catch(console.error);

  }

}
