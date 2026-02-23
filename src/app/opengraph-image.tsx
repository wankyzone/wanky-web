import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          background: "#FFF5FB",
          padding: "72px",
          fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 22, color: "#6B7280", marginBottom: 12 }}>
            Wanky Systems
          </div>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#222" }}>
            Cloud-first internal systems for modern businesses.
          </div>
          <div style={{ fontSize: 22, color: "#374151", marginTop: 18 }}>
            Admin dashboards · Internal tools · Automation
          </div>
        </div>

        <div
          style={{
            width: 210,
            height: 210,
            borderRadius: 56,
            background: "#FF7AC8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 18px 40px rgba(0,0,0,0.12)",
          }}
        >
          <div style={{ width: 130, height: 130, borderRadius: 40, background: "white" }} />
        </div>
      </div>
    ),
    size
  );
}