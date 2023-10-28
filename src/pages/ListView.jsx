import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { useState } from "react";

const ListView = ({ openModal }) => {
  const store = useSelector((store) => store);
  const [itemOffset, setItemOffset] = useState(0);
  // sayfa başına eleman sayısı
  const itemsPerPage = 10;
  // gösterilcek sonuncun elemanın sayısı
  const endOffset = itemOffset + itemsPerPage;
  // gösterilcek aralıktaki elemanlar
  const currentItems = store?.flights.slice(itemOffset, endOffset);
  // toplam kaç sayfa olduğunu hesaplama
  const pageCount = Math.ceil(store?.flights.length / itemsPerPage);

  const handlePageClick = (event) => {
    // gösterilcek yeni elemanları hesaplar
    const newOffset = (event.selected * itemsPerPage) % store?.flights.length;

    // state'İ günceller
    setItemOffset(newOffset);
  };
  return (
    <div className="list-page">
      <table className="table table-dark table-striped table-hover">
        <thead>
          <tr>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((flight) => (
            <tr key={flight.id}>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button onClick={() => openModal(flight.id)}>Detay</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        pageCount={pageCount}
        nextLabel="ileri >"
        previousLabel="< geri"
        onPageChange={handlePageClick}
        className="pagination"
        pageRangeDisplayed={2}
        activeClassName="active"
      />
    </div>
  );
};

export default ListView;
