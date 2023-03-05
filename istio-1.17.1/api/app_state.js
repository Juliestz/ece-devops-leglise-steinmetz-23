const prometheus = require('prom-client');

const appStateGauge = new prometheus.Gauge({
    name: 'app_state',
    help: 'State of the app (0 = stopped, 1 = running)'
});
