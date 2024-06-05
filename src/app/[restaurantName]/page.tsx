'use client'
import { useParams } from "next/navigation";

export default function HelloWorld() {
  const restaurantName : any = useParams().restaurantName;

  return <h1>Hello, {restaurantName}</h1>;
}

