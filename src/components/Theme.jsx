import { extendTheme } from "@chakra-ui/react";
import bgImage from "../image/color-smoke.jpg";

export const Theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        bgImage: `url(${bgImage})`,
        bgSize: "cover",
        bgPosition: "center",
        minHeight: "100vh",
      },
    },
  },
});
