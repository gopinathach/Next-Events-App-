import React from 'react';
import Link from 'next/link'

// import styles from '../styles'


function Cards(props) {
  return (
    <div>
      <div className="card-container">
        <div className="card-calendar">
          <h1>{props.date}</h1>
          <p>{props.monthName}</p>

        </div>
        <div className="cardbutton">
          <Link key={ props.id } href= {`/event/${props.id}`}>
            <button>
              View Details
            </button>
          </Link>

        </div>
      </div>

    </div>
  );
}

export default Cards;