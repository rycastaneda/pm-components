import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs';

const Report = ({ reportData }) => {
    const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: reportData.map(report => {
            return {
                label: report.staff,
                data: report.scores
            };
        })
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }
    };

    return <Line data={data} options={options} />;
};

Report.propTypes = {
    reportData: PropTypes.array
};

export default Report; // adds dispatch prop
