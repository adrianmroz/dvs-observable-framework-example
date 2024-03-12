---
toc: false
---

<style>

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--sans-serif);
  margin: 4rem 0 8rem;
  text-wrap: balance;
  text-align: center;
}

.hero h1 {
  margin: 2rem 0;
  max-width: none;
  font-size: 14vw;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(30deg, var(--theme-foreground-focus), currentColor);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero h2 {
  margin: 0;
  max-width: 34em;
  font-size: 20px;
  font-style: initial;
  font-weight: 500;
  line-height: 1.5;
  color: var(--theme-foreground-muted);
}

@media (min-width: 640px) {
  .hero h1 {
    font-size: 90px;
  }
}

</style>

<div class="hero">
  <h1>Constituencies</h1>
  <h2>More descriptions...</h2>
</div>

<div class="grid grid-cols-2" style="grid-auto-rows: 504px;">
    <div class="card">
        ${resize((width, height) => 
            Inputs.table(constituencies, {height }))}
    </div>
    <div class="card">
        ${resize(width => Plot.plot({
            width,
            grid: true,
            marks: [
                Plot.dot(constituencies, { 
                    x: "Seats", 
                    y: "Population", 
                    channels: {Country: "Country", Constituency: "Cons"}, 
                    tip: true 
                })
            ]
        }))}
    </div>
</div>

<div class="card">${
    resize(width => renderMap(constituencies, polygons, width))
}</div>

```js
const constituencies = FileAttachment("data/constituencies.csv").csv({typed: true});
const polygons = FileAttachment("data/polygons.json").json();
```

```js
import { renderMap } from "./components/map.js";
```