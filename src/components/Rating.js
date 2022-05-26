import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Rating({ rating, style, changeRating }) {
  return (
    <>
      {[...Array(5)].map((arr, i) => (
        <span key={i} onClick={() => changeRating(i)} style={style}>
          {rating > i ? (
            <AiFillStar fontSize="15px" />
          ) : (
            <AiOutlineStar fontSize="15px" />
          )}
        </span>
      ))}
    </>
  );
}

export default Rating;
