import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs-2';
import randomColor from 'randomcolor';

const Report = ({ questions }) => {
    let labels = [],
        datasets = [],
        staffComments = {};
    questions.map((question, index) => {
        if (question.comments.length) {
            labels.push({
                title: question.questionTitle,
                text: `Q${index + 1}`
            });
        }

        question.comments.map(comment => {
            if (staffComments[comment.staff]) {
                staffComments[comment.staff].push(comment.score);
            } else {
                staffComments[comment.staff] = [comment.score];
            }
        });
    });

    datasets = Object.keys(staffComments).map(staff => {
        let color = randomColor({
            luminosity: 'dark',
            format: 'rgba',
            alpha: 0.7
        });
        return {
            label: staff,
            fill: false,
            backgroundColor: color,
            borderColor: color,
            data: staffComments[staff]
        };
    });

    const data = {
        labels: labels.map(label => label.text),
        questions: labels.map(label => label.title),
        datasets
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
        },
        tooltips: {
            mode: 'index',
            axis: 'y',
            callbacks: {
                title: function(tooltips, data) {
                    let tipIndex = tooltips.pop().index;
                    return data.questions[tipIndex];
                }
            }
        }
    };

    return <Line data={data} options={options} />;
};

Report.propTypes = {
    questions: PropTypes.array
};

export default Report; // adds dispatch prop
