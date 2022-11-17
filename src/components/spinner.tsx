import React, { CSSProperties } from 'react'
import BounceLoader from "react-spinners/BounceLoader";

export default function Spinner() {
  return (
    <BounceLoader color="#36d7b7" size={'20'} className={'inlie-block'} />
  )
}
