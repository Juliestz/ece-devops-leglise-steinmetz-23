app.get('/', (req, res) => {
    appState.status = 'running';
    appState.uptime = process.uptime();

    // Update the Prometheus gauge with the new app state
    appStateGauge.set(1);

    res.type('yaml').send(yaml.dump(appState));
});
