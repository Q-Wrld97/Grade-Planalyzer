// Pie chart for column 1

new Chart(document.getElementById('pieChartInfo'), {
  type: 'pie',
  data: {
    labels: ["SWE", "MAT", "COT", "CEN", "CNT"],
    datasets: [{
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
      data: [10, 60, 30, 20, 80]
    }]
    

  },
  options: {
    title: {
      display: true,
      text: 'Pie Chart'
    },
    reponsive: true,
    legend: {
      position: 'bottom'
    },
  }
});

//Line chart for column

const ctx = document.getElementById('barChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['SWE', 'LAN', 'DES', 'COS', 'TOC', '8001Y'],
    datasets: [{
      label: 'Classes',
      data: [12, 19, 3, 5, 2, 33],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});