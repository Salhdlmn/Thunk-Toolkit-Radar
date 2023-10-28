import { useEffect, useState } from "react";
import { detailOptions } from "../helpers/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setRoute } from "../redux/slices/flightSlice";

const SideDetail = ({ setShowDetail, detailId }) => {
  const dispatch = useDispatch();

  const [d, setDetail] = useState(null);
  useEffect(() => {
    setDetail(null);
    axios
      .get(
        `https://flight-radar1.p.rapidapi.com/flights/detail?flight=${detailId}`,
        detailOptions
      )
      .then((res) => {
        setDetail(res.data);
        dispatch(setRoute(res.data.trail));
      });
  }, [detailId]);
  return (
    <div className="detail-outer">
      <div className="detail-inner">
        <p className="close">
          <span onClick={() => setShowDetail(false)}>X</span>
        </p>

        {!d ? (
          <p>Yükleniyor....</p>
        ) : (
          <>
            <h2>{d.aircraft.model?.text}</h2>
            <h2>{d.aircraft.model.code}</h2>
            <p>Kuyruk No: {d.aircraft.registration}</p>
            <img src={d.aircraft.images.large[0].src} />
            <p> Şirket: {d.airline.name}</p>
            <p>
              <span>Kalkış:</span>
              <a target="_blank" href={d.airport.origin?.website}>
                {d.airport.origin.name}
              </a>
            </p>
            <p>
              <span>Hedef:</span>
              <a target="_blank" href={d.airport.destination?.website}>
                {d.airport.destination.name}
              </a>
            </p>

            <p>
              <span>Durum</span>
              <span className="status" style={{ background: d.status.icon }}>
                {d.status?.text}
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SideDetail;
