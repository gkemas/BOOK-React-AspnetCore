import React from 'react';
import { CSVLink } from 'react-csv';

const ExportCSV = ({ data }) => {
  const headers = [
    { label: 'Name', key: 'bookName' },
    { label: 'Author', key: 'author' },
    { label: 'Release Date', key: 'releaseDate' },
    { label: 'ISBN', key: 'isbn' },
    { label: 'Language', key: 'language' },
    { label: 'Page', key: 'page' },
    { label: 'Publisher', key: 'publisher' },
    { label: 'Category', key: 'category' },
  ];

  const csvData = data.map((item) => ({
    bookName: item.bookName,
    author: item.author,
    releaseDate: item.releaseDate,
    isbn: item.isbn,
    language: item.language,
    page: item.page,
    publisher: item.publisher,
    category: item.novel
      ? 'Novel'
      : item.poetry
      ? 'Poetry'
      : item.biography
      ? 'Biography'
      : '',
  }));

  return (
    <CSVLink data={csvData} headers={headers} filename={'books.csv'}>
      Export to CSV
    </CSVLink>
  );
};

export default ExportCSV;
