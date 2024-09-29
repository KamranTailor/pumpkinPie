// Listening Trends Line Chart
const ctxLine = document.getElementById('listeningTrendsChart').getContext('2d');
const listeningTrendsChart = new Chart(ctxLine, {
  type: 'line',
  data: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [{
      label: 'Plays',
      data: [30, 40, 35, 50, 60, 55, 70],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to expand
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#444'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#444'
        }
      }
    }
  }
});

// Genres Bar Chart
const ctxBar = document.getElementById('genresChart').getContext('2d');
const genresChart = new Chart(ctxBar, {
  type: 'bar',
  data: {
    labels: ['Rock', 'Pop', 'Hip-Hop', 'Jazz', 'Classical'],
    datasets: [{
      label: 'Plays by Genre',
      data: [150, 200, 120, 80, 60],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to expand
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: '#444'
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: '#444'
        }
      }
    }
  }
});