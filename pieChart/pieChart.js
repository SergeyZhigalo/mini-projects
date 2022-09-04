function pieChart(options) {
    let {width, height, cx, cy, r, lx, ly, data} = options
    let svg = "http://www.w3.org/2000/svg"
    let chart = document.createElementNS(svg, "svg")
    chart.setAttribute("width", width)
    chart.setAttribute("height", height)
    chart.setAttribute("viewBox", `0 0 ${width} ${height}`)
    chart.setAttribute("font-family", "sans-serif")
    chart.setAttribute("font-size", "18")
    let labels = Object.keys(data)
    let values = Object.values(data)
    let total = values.reduce((x,y) => x+y)
    let angles = [0]
    values.forEach((x, i) => angles.push(angles[i]+x/total*2*Math.PI))
    values.forEach((value, i) => {
        let x1 = cx + r * Math.sin(angles[i])
        let y1 = cy - r * Math.cos(angles[i])
        let x2 = cx + r * Math.sin(angles[i+1])
        let y2 = cy - r * Math.cos(angles[i+1])

        let big = (angles[i+1] - angles[i] > Math.PI) ? 1 : 0
        let path = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${big} 1 ${x2},${y2}Z`
        let color = `hsl(${(i*40)%360},${90-3*i}%,${50+2*i}%)`

        let slice = document.createElementNS(svg, "path")
        slice.setAttribute("d", path)
        slice.setAttribute("fill", color)
        slice.setAttribute("stroke", "black")
        slice.setAttribute("stroke-width", "1")
        chart.append(slice)

        let icon = document.createElementNS(svg, "rect")
        icon.setAttribute("x", lx)
        icon.setAttribute("y", ly + 30 * i)
        icon.setAttribute("width", 20)
        icon.setAttribute("height", 20)
        icon.setAttribute("fill", color)
        icon.setAttribute("stroke", "black")
        icon.setAttribute("stroke-width", "1")
        chart.append(icon)

        let label = document.createElementNS(svg, "text")
        label.setAttribute("x", lx+30)
        label.setAttribute("y", ly+30*i+16)
        label.append(`${labels[i]} ${value}`)
        chart.append(label)
    })
    return chart
}