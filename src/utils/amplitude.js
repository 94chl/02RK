import amplitude from "amplitude-js";

const INSTANCE_KEY = "2ef45bc5ea003c6f10c25a5f22440b0b";

const lastUpdated = "2022-06-06";

class Amplitude {
  constructor() {
    amplitude.getInstance().init(INSTANCE_KEY);
    this.ampl = amplitude.getInstance();
    this.ampl.setUserProperties({
      appName: "02RK",
      lastUpdated,
    });
    this.ampl.setVersionName(`02RK_${lastUpdated}`);
  }

  log(key, props) {
    if (process.env.NODE_ENV !== "development") {
      this.ampl.logEvent(key, props);
    }
  }
}

const ampl = new Amplitude();

export default ampl;
