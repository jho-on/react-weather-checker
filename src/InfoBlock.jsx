import PropTypes from 'prop-types';

function InfoBlock(props){
    return(
        <div>
            <h4>{props.title}</h4>
            <p>{props.info}</p>
        </div>
    );
}

InfoBlock.propTypes ={
    title: PropTypes.string,
    info: PropTypes.string
}

export default InfoBlock;