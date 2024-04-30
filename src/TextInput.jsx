import PropTypes from 'prop-types';

function TextInput(props){
    return(
        <>
            <label>{props.label + ": "}</label>
            <input id={props.id} type="text" placeholder={props.placeholderText}/>
        </>
    );
}

TextInput.propTypes ={
    label: PropTypes.string,
    id: PropTypes.string,
    placeholderText: PropTypes.string
}

export default TextInput;