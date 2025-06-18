// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://cae3d2f1a33c3b7a09351cb00c6a0ff3@o4509508165566464.ingest.us.sentry.io/4509508169826304",
  
    integrations: [Sentry.mongooseIntegration()],
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
Sentry.profiler.startProfiler();
Sentry.startSpan({
  name:"My first transaction",
}, () => {

});
Sentry.profiler.stopProfiler();