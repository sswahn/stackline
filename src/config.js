export const config = {
  months: [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ],
  sales: {
    wholesaleSales: 'Wholesale Sales',
    unitsSold: 'Units Sold',
    retailerMargin: 'Retailer Margin'
  },
  options: {
    scales: {
      x: {
        display: false,
        grid: {
          display: false
        },
      },
      y: {
        stacked: true,
        display: false,
        grid: {
          display: false
        }
      }
    },
    elements: {
      line: {
        cubicInterpolationMode: 'monotone'
      },
      point: {
        radius: 0
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      }
    },
    tooltips: {
      mode: 'index',
      intersect: false
    },
    layout: {
      padding: {
        left: 35,
        right: 35
      }
    }
  }
}
