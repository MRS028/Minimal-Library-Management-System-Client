import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { Skeleton } from '../../components/ui/skeleton';
import { useGetBorrowSummaryQuery } from '../../redux/api/borrowApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { InfoIcon } from 'lucide-react';

type ApiBorrowRow = {
  book?: {
    title?: string[] | string;
    isbn?: string[] | string;
  };
  totalQuantity: number;
};

type ApiBorrowSummary =
  | ApiBorrowRow[] // sometimes hook returns array directly
  | { data: ApiBorrowRow[] }; // sometimes wrapped in { data: [] }

const BorrowSummaryPage = () => {
  const { data, error, isLoading } = useGetBorrowSummaryQuery();
    //@ts-expect-error Reason for suppressing error: react-redux not being used currently
  
    const rows: ApiBorrowRow[] = Array.isArray((data as ApiBorrowSummary))
        //@ts-expect-error Reason for suppressing error: react-redux not being used currently
    ? ((data as ApiBorrowRow[]) ?? [])
    : ((data as { data?: ApiBorrowRow[] })?.data ?? []);

  const getFirst = (v?: string[] | string) =>
    Array.isArray(v) ? (v[0] ?? 'N/A') : (v ?? 'N/A');

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><Skeleton className="h-6 w-32" /></TableHead>
                    <TableHead><Skeleton className="h-6 w-32" /></TableHead>
                    <TableHead><Skeleton className="h-6 w-32" /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                      <TableCell><Skeleton className="h-6 w-full" /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Alert variant="destructive">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load borrow summary. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Borrow Summary</CardTitle>
          <CardDescription>Overview of all borrowed books</CardDescription>
        </CardHeader>

        <CardContent>
          {rows.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book Title</TableHead>
                    <TableHead>ISBN</TableHead>
                    <TableHead className="text-right">Total Quantity Borrowed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">
                        {getFirst(row.book?.title)}
                      </TableCell>
                      <TableCell>{getFirst(row.book?.isbn)}</TableCell>
                      <TableCell className="text-right">{row.totalQuantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>No borrow records</AlertTitle>
              <AlertDescription>
                There are no books currently borrowed. Borrow some books to see them listed here.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BorrowSummaryPage;
