import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const ralewayMedium = await readFile(
    join(process.cwd(), "src/app/fonts/Raleway-Medium.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#ffebb5",
          fontSize: 20,
          fontFamily: "Raleway",
          fontWeight: 500,
        }}
      >
        T
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Raleway",
          data: ralewayMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
