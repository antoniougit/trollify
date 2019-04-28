import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, you have trollified `}<span className="f1">{`${entries}`}</span>
        {
          (entries === '1') ? ' image!' : ' images!'
        }
      </div>
    </div>
  );
}

export default Rank;