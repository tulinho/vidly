import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import config from "../config.json";

function init() {
	if (config.environment === "development") {
		return;
	}
	Sentry.init({
		dsn: config.SentryDsn,
		integrations: [new Integrations.BrowserTracing()],
		environment: config.environment,
		tracesSampleRate: 1.0,
	});
}

let error,
	log = null;
if (config.environment === "development") {
	error = console.log;
	log = console.log;
}

const Logging = {
	init,
	error: error || Sentry.captureException,
	log: log || Sentry.captureMessage,
};

export default Logging;
