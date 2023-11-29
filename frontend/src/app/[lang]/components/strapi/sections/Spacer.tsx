interface SpacerProps {
  height: "0.5" | "1" | "2" | "4" | "6" | "8" | "16" | "32";
  background: "black" | "white" | "transparent";
}

export default function Spacer({ data }: { data: SpacerProps }) {
  const { height, background } = data;
  return (
    <div
      style={{
        height: height?.[0] ? `${height[0]}rem` : 0,
        backgroundColor: background?.[0] ?? "transparent",
      }}
    ></div>
  );
}
