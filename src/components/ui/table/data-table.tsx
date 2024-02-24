"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sorting?: SortingState;
  setSorting?: Dispatch<SetStateAction<SortingState>>;
  loading?: boolean;
  pagination?: Pagination;
  height?: number;
  onRowClick?: (record: TData) => void;
  debounceDuration?: number;
  className?: string;
  headerClassname?: string;
  rowClassName?: string;
  noDataMessage?: ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  sorting,
  setSorting,
  loading,
  pagination,
  // height,
  // onRowClick,
  // debounceDuration = 400,
  className,
  headerClassname,
}: // noDataMessage,
// rowClassName,
DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    manualSorting: true,
    pageCount: pagination?.total || data?.length,

    state: {
      sorting,
      pagination: {
        pageSize: pagination?.pageSize ? pagination?.pageSize : 15,
        pageIndex: pagination?.page ? pagination?.page - 1 : 0,
      },
    },
  });

  return (
    <div className="border rounded-md">
      <Table
        className={cn(pagination?.fetching || (loading && "opacity-50"))}
        containerClassName={className}
      >
        <TableHeader className={cn(headerClassname)}>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
