import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f3edf2",
          color: "#1f1f1f",
          padding: "60px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            marginBottom: 24,
            fontWeight: 600,
          }}
        >
          Wanky
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 700,
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          Internal systems and cloud software for modern businesses.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 28,
            maxWidth: 850,
            color: "#444",
          }}
        >
          Admin dashboards, internal tools, and automation systems.
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}