import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        { 'Please enter a valid image URL with a face to trollify.' }
      </p>
      <div className='center'>
        <div className='form center pa4 br3 shadow-5'>
          <input className='f4 pa2 w-70 center' type='text' onChange={ onInputChange }/>
          <button
            className='w-20 grow f4 link ph3 pv2 br3 dib white bg-purple'
            onClick={ onButtonSubmit }
          >Go!</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;