"use client"
import { Input } from "@/components/ui/input"
import { columns, Account } from "./columns"
import { DataTable } from "../../components/data-table"
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { Table } from "@/components/ui/table";
import { getCoreRowModel, useReactTable, getPaginationRowModel } from "@tanstack/react-table";
import { useEffect, useState } from "react";


async function getData(): Promise<Account[]> {
  // // Fetch data from your API here.
  const resp = await fetch("https://cms.ite4108m.com/api/users");
  const data = await resp.json();
  return data;
}


export default function DemoPage() {
  const [data, setData] = useState<Account[]>([]);
  
  useEffect(()=>{
    const fetchData = async () =>{

      const resp = await getData();
      setData(resp);
      console.log(data);
    }
    fetchData();
  },[])


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    initialState: {
      pagination: {
        pageSize: 10, // Default page size
      },
    },
  });
  
  return (
    <div className="container mx-auto py-10">
      <Input type="text" placeholder="please enter something"/>
      <DataTable columns={columns} data={data} />
      <DataTablePagination table={table} />
    </div>
  )
}