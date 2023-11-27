import React from 'react';
import {
  Cell,
  CellPropGetter,
  Column,
  HeaderPropGetter,
  TableHeaderProps,
  useBlockLayout,
  useFlexLayout,
  useTable,
} from 'react-table';
import styles from './styles.module.scss';
import { Align } from 'common/enums/enums';

type StringRecord = Record<string, string>;

type Props = {
  columns: Column[];
  data: unknown[];
  isStretch: boolean;
  title: string;
};

const Table: React.FC<Props> = ({ columns, data, isStretch }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columns as Column<StringRecord>[],
        data: data as StringRecord[],
      },
      isStretch ? useFlexLayout : useBlockLayout,
    );

  const headerProps = (
    props: Partial<TableHeaderProps>,
    { column }: { column: Column },
  ): HeaderPropGetter<StringRecord> =>
    getStyles(
      props,
      column.headerAlign as Align,
    ) as HeaderPropGetter<StringRecord>;

  const cellProps = (
    props: Partial<TableHeaderProps>,
    { cell }: { cell: Cell },
  ): CellPropGetter<StringRecord> =>
    getStyles(
      props,
      cell.column.cellAlign as Align,
    ) as CellPropGetter<StringRecord>;

  const getStyles = (
    props: Partial<TableHeaderProps>,
    align: Align,
  ): HeaderPropGetter<StringRecord> | CellPropGetter<StringRecord> => [
    props,
    {
      style: {
        justifyContent:
          align === Align.CENTER
            ? 'center'
            : align === Align.RIGHT
            ? 'flex-end'
            : 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
      },
    },
  ];

  return (
    <table {...getTableProps()} className={styles.table}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(
                  headerProps as HeaderPropGetter<StringRecord>,
                )}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps(
                    cellProps as CellPropGetter<StringRecord>,
                  )}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export { Table };
