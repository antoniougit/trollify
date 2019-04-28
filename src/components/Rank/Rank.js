import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, you have already trollified `}<span className="f1">{`${entries}`}</span>{` images!`}
      </div>
    </div>
  );
}

export default Rank;