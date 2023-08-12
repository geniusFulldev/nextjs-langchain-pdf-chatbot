
const Spinner = ({
    width=50,
    radius=20
}: {
    width?: number,
    radius?: number
}) => {

    return (
        <svg className="spinner" viewBox={`0 0 ${width} ${width}`}>
            <circle className="path" cx={`${width/2}`} cy={`${width/2}`} r={`${radius}`} fill="none" strokeWidth="5"></circle>
        </svg>        
    );
}

export default Spinner;