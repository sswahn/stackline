import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3'

const StackedLineChart = ({ data }) => {
  const chartRef = useRef()

  useEffect(() => {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const width = 600 - margin.left - margin.right
    const height = 400 - margin.top - margin.bottom

    const svg = d3
      .select(chartRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    const keys = ['retailSales', 'wholesaleSales', 'unitsSold', 'retailerMargin']

    const stack = d3.stack().keys(keys)(data)

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.weekEnding))
      .range([0, width])
      .padding(0.1)

    const y = d3.scaleLinear().domain([0, d3.max(stack[stack.length - 1], (d) => d[1])]).range([height, 0])

    const color = d3.scaleOrdinal().domain(keys).range(['#44A8F6', '#9AA5BF', '#F69244', '#Eb44F6'])

    svg
      .append('g')
      .selectAll('g')
      .data(stack)
      .join('g')
      .attr('fill', (d) => color(d.key))
      .selectAll('rect')
      .data((d) => d)
      .join('rect')
      .attr('x', (d) => x(d.data.weekEnding))
      .attr('y', (d) => y(d[1]))
      .attr('height', (d) => y(d[0]) - y(d[1]))
      .attr('width', x.bandwidth())

    // Add X Axis
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))

    // Add Y Axis
    svg.append('g').call(d3.axisLeft(y))
  }, [data])

  return <svg ref={chartRef}></svg>
}

export default StackedLineChart
