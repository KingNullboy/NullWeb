//Import Mixpanel SDK
import mixpanel from "mixpanel-browser";

mixpanel.init("45db01d66f2e8e5f6e61fd4a87e6a08e", {
  debug: true,
  track_pageview: true,
  persistence: "localStorage",
});