import * as d3 from "npm:d3";

export function renderMap(data, polygons, width) {

  // Calculate the median "Seat/Pop" value for setting the diverging scale's midpoint
  const medianSeatPop = d3.median(data, (d) => d["Seat/Pop"]);

  // Define a diverging color scale using the median as the center point
  const colorScaleDiverging = d3
    .scaleDiverging(d3.interpolateViridis)
    .domain([
      d3.min(data, (d) => d["Seat/Pop"]),
      medianSeatPop,
      d3.max(data, (d) => d["Seat/Pop"])
    ]);

  const svg = d3
    .create("svg")
    .attr("width", width)
    .attr("height", width * 10/12)
    .attr("viewBox", "0 0 7633.13 6044.61");

  svg
    .selectAll("polygon") // Correctly select SVG polygons
    .data(polygons) // Bind the combined dataset
    .join("polygon") // Correct usage of join for entering/updating/removing elements
    .attr("points", (d) => d.points) // Set the points attribute for each polygon
    .attr("fill", (d) => {
      // Find the corresponding data entry using the cons property
      const dataEntry = data.find((data) => data.Cons === d.cons);
      // Determine the fill color using the color scale based on "Seat/Pop"
      return dataEntry ? colorScaleDiverging(dataEntry["Seat/Pop"]) : "grey"; // Fallback color if no data found
    })
    .attr("stroke", "white") // Set the stroke color to white
    .attr("stroke-width", 1); // Set the stroke width (adjust as needed)

  return svg.node(); // Return the modified SVG node
}