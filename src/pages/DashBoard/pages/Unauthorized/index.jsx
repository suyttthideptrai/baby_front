import React from 'react';
import UnauthorizedIcon from '../../../../assets/symbols/unauthorized.svg'

const Unauthorized = () => {
  return (
    <div className='flex place-content-center items-center h-[50%]'>
      <div className={'text-center flex-col place-content-between'}>
        <div className='flex place-content-center'>
          <img src={UnauthorizedIcon} alt="." className='w-[15%] self-center' />
        </div>
         <h1 className='text-red-500 font-alata text-xl'>Unauthorized</h1>
         <p className='font-alata'>You don&apos;t have permission to access this page.</p>
      </div>
    </div>
  );
};

export default Unauthorized;
