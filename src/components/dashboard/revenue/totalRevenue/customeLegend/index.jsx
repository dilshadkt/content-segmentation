const CustomLegend = (props) => {
  const { payload } = props;
  return (
    <ul
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        listStyle: "none",
        padding: 0,
      }}
    >
      {payload.map((entry, index) => (
        <li
          key={`legend-item-${index}`}
          style={{
            marginRight: 20,
            display: "flex",
            alignItems: "center",
            fontSize: "14px",
            color: entry.color,
          }}
        >
          {/* Square color indicator */}
          <div
            style={{
              width: 8,
              height: 8,
              backgroundColor: entry.color,
              borderRadius: "100%",
              marginRight: 8,
            }}
          ></div>
          {entry.value} {/* Legend text */}
        </li>
      ))}
    </ul>
  );
};

export default CustomLegend;
