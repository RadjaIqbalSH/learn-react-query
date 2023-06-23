import React from 'react'
import { CrossIcon } from '../Icons/Cross'
import { SpinnerIcon } from '../Icons/Spinner';

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

export const CardProduct = (props) => {
  return (
    <div className="w-[300px] h-auto min-h-[400px] mx-auto bg-red-50 shadow-dark-100 shadow-lg rounded-2xl px-8 pt-12 pb-8">
      {
        props.isError ? (
          <CrossIcon/>
        ) : (
          !props.isLoading ? (
            <>
              <img className="rounded-full w-40 h-40 bg-gray-300 mx-auto" src={props.imageUrl}/>
              <p className="mx-auto w-fit mt-8 text-xl text-center"><strong>{props.name}</strong></p>
              <p className="mt-8 text-sm"><strong>Category : </strong>{props.category}</p>
              <p className="mt-2 text-sm"><strong>Price : </strong> {formatter.format(props.price)}</p>
              <p className="mt-2 text-sm"><strong>Stock : </strong> {props.stock}</p>
            </>
          ) : (
            <SpinnerIcon/>
          )
        )
      }
    </div>  
  )
}
