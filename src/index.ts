import app from "./app";
import config from "./config";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
