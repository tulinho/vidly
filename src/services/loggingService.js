import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
	if (process.env.NODE_ENV === "development") return;
	Sentry.init({
		dsn: process.env.REACT_APP_SENTRY_DSN,
		integrations: [new Integrations.BrowserTracing()],
		environment: process.env.NODE_ENV,
		tracesSampleRate: 1.0,
	});
}

let error, log;
if (process.env.NODE_ENV === "development") error = log = console.log;

const Logging = {
	init,
	error: error || Sentry.captureException,
	log: log || Sentry.captureMessage,
};

export default Logging;
