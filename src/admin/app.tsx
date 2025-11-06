import { MediaListener } from "./components/test";

export default {
  bootstrap(app: any) {
    app.injectContentManagerComponent("editView", "informations", {
      name: "media_listener",
      Component: MediaListener,
    });
  },
};
