import { ImageResponse } from "next/og";

export const alt = "Topunex — Top Up Game Instan";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "#FF6A00",
            filter: "blur(120px)",
            opacity: 0.25,
            top: -200,
            left: -100,
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            zIndex: 1,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#FF6A00",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A0A0A">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
            </svg>
          </div>
          <span
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: -1,
            }}
          >
            topunex
            <span style={{ color: "#FF6A00" }}>.</span>com
          </span>
        </div>
        <h1
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.1,
            marginTop: 32,
            zIndex: 1,
            letterSpacing: -2,
          }}
        >
          Isi diamond,
          <br />
          <span style={{ color: "#FF6A00" }}>langsung main.</span>
        </h1>
        <p
          style={{
            fontSize: 20,
            color: "#9C9791",
            marginTop: 16,
            zIndex: 1,
          }}
        >
          Top up game favoritmu. Cepat, aman, tanpa ribet.
        </p>
      </div>
    ),
    { ...size }
  );
}
