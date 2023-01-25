import React from "react";
import PropTypes from "prop-types";

import "./TableRow.css";
import userleaderBoards from "../../images/userleaderboards.png";
import firstPlace from "../../images/firstPlace.jpg";
;

const TableRow = (props) => {
  const { alltime, img, score, username, rank, unique } = props.rowData;
  return (
    // <tr className={`${props.currentPlayer.unique === unique ? 'bg-black' : 'position'}`}>
    //   <td className={`${props.currentPlayer.unique === unique ? 'text-white ' : 'text-black '}`}>
    //     {rank ?( rank === 1 ? (
    //       <img className="camper-image-first " src={firstPlace} alt="no img" />
    //     ) :  (
    //       rank
    //     ) ) : 
    //     (props.id === 1 ? (
    //       <img className={`camper-image-first `} src={firstPlace} alt="no img" />
    //     ) :  (
    //       props.id
    //     ))}
    //   </td>
    //   <td className={`${window.innerWidth > 450 ? 'pl-32' : 'pl-8'} flex whitespace-nowrap text-ellipsis overflow-hidden ${props.currentPlayer.unique === unique ? 'text-white' : 'text-black'}` } >
  
    //       <img
    //         className={`camper-image inline-block ${props.currentPlayer.unique === unique ? 'invert brightness-0	 	' : ''} `}
    //         src={userleaderBoards}
    //         alt="no img"
    //       ></img>
    //       <span className="fullname">{username}</span>
    //   </td>
    //   <td className={`${props.currentPlayer.unique === unique ? 'text-white ' : 'text-black'}`} align="center">{score}</td>
      
    // </tr>

    <tr className={`row ${props.currentPlayer.unique === unique ? 'current' : ''} `} >
      <td  align="center" className="image">
        {rank ?( rank === 1 ? (
          <img className="camper-image-first " src={firstPlace} alt="no img" />
        ) :  (
          rank
        ) ) : 
        (props.id === 1 ? (
          <img className={`camper-image-first `} src={firstPlace} alt="no img" />
        ) :  (
          props.id
        ))}
      </td>
      <td>
          <img
            className='camper-image inline-block'
            src={userleaderBoards}
            alt="no img"
          ></img>
           <span className="fullname" >{username}</span>
           </td>
           <td className={`points ${props.currentPlayer.unique === unique ? 'white' : ''} `} align="center">{score}</td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.number,
  rowData: PropTypes.object,
};

export default TableRow;
