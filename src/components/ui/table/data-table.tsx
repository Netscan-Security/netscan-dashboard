"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import type { ColumnDef, SortingState } from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

// Local imports
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
  rowClassName,
  noDataMessage,
}: DataTableProps<TData, TValue>) {
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
    <div className="relative w-full min-h-[200px]">
      {!table?.getRowModel()?.rows?.length &&
        !(loading || pagination?.fetching) && (
          <div className="absolute w-full h-full min-h-48">
            <div
              className={cn(
                "w-[100%] h-full absolute flex justify-center items-center"
              )}
            >
              {noDataMessage ?? (
                <div className="flex flex-col items-center justify-center">
                  <h3 className="mt-4 text-lg font-bold text-center text-slate-400">
                    No data Found
                  </h3>
                </div>
              )}
            </div>
          </div>
        )}
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
          {loading ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="mx-auto animate-spin"
                >
                  <path d="M10.1 2.182a10 10 0 0 1 3.8 0" />
                  <path d="M13.9 21.818a10 10 0 0 1-3.8 0" />
                  <path d="M17.609 3.721a10 10 0 0 1 2.69 2.7" />
                  <path d="M2.182 13.9a10 10 0 0 1 0-3.8" />
                  <path d="M20.279 17.609a10 10 0 0 1-2.7 2.69" />
                  <path d="M21.818 10.1a10 10 0 0 1 0 3.8" />
                  <path d="M3.721 6.391a10 10 0 0 1 2.7-2.69" />
                  <path d="M6.391 20.279a10 10 0 0 1-2.69-2.7" />
                </svg>
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(rowClassName)}
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
