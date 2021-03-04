export const labelStylingProps = {
    style: {
        fontSize: 4,
        fill: 'white'
    },
    centerOffset: {
        y: 5
    },
    cornerRadius: 0,
    flyoutPadding: 4,
    flyoutStyle: {
        strokeWidth: 0,
        fill: 'black'
    }
}

export const axisStyle = {
    axisLabel: { fontSize: 7, padding: 22 },
    ticks: { size: 5 },
    tickLabels: { fontSize: 5, padding: 2 }
};

export const disabledAxisProps = {
    style: {
        axis: { stroke: 'transparent' },
        ticks: { stroke: 'transparent' },
        tickLabels: { fill: 'transparent' }
    }
};