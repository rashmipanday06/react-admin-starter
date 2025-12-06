import type { FC, ReactElement } from "react";


interface order{
    id:number;
    productName:string;
    customerEmail:string;
    status:"Pending" | "Accepted" | "Canceled" | "Edited";
    amount:number;
}

const EditOrder:FC<order> = ():ReactElement => {
  return (
    <div>EditOrder</div>
  )
}

export default EditOrder