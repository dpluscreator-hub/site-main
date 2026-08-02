export const ogSize = { width: 1200, height: 630 };
export const ogAlt = "DPLUS Creator - Creative Digital Agency";
export const ogContentType = "image/png";

export function OgFrame() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#1A1A1A",
        backgroundImage:
          "radial-gradient(ellipse 60% 60% at 75% 35%, rgba(245,166,35,0.18) 0%, rgba(26,26,26,0) 70%)",
        padding: "96px",
        color: "#FFFFFF",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "30px",
          letterSpacing: "0.32em",
          color: "#F5A623",
          fontWeight: 600,
        }}
      >
        <div style={{ width: "56px", height: "4px", backgroundColor: "#F5A623" }} />
        DIGITAL AGENCY
      </div>
      <div
        style={{
          marginTop: "28px",
          fontSize: "118px",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        DPLUS CREATOR
      </div>
      <div
        style={{
          marginTop: "32px",
          fontSize: "36px",
          color: "rgba(255,255,255,0.7)",
          maxWidth: "780px",
          lineHeight: 1.3,
        }}
      >
        Helping brands grow and stand out online.
      </div>
    </div>
  );
}
