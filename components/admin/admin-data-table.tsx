import { ReactNode } from "react";
import { Table, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/table";

export const AdminDataTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) => (
  <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-soft">
    <Table>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeaderCell key={header}>{header}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{cell}</TableCell>
            ))}
          </TableRow>
        ))}
      </tbody>
    </Table>
  </div>
);
