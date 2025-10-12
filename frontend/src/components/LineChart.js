import Chart from 'chart.js/auto';
import {Line} from 'react-chartjs-2';

const labels = ['January','February','March','April','May','June'];

const data = {
    labels: labels,
    datasets: [
        {
            label: 'Student Attendance',
            backgroundColor: ["blue","red","green","purple","black","orange","cyan"],
            borderColor: ["gray","red","green","purple","black","orange","cyan"],
            data: [60, 58, 53, 52, 59, 50, 55],
        },
    ],
};


function LineChart(){

    return(
        <div className='bg-white border border-secondary'>
            <Line data={data}></Line>
        </div>
    )
}

export default LineChart;