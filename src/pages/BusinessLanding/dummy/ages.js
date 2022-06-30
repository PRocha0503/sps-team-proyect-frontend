const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['0-10', '10-25', '25-35', '35-50', '60+'];

const dataAges = {
  labels,
  datasets: [
    {
      label: 'Customers Age',
      data: labels.map(() => Math.floor(Math.random() * 1000)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    
  ],
};

export default dataAges;