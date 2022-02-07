import {BallTriangle} from  'react-loader-spinner';


const Spinner = () => {
  return (
    <BallTriangle
      type="BallTriangle"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={500}
      position='center'
      // className={s.loader}
    />
  );
};


//   color="#00BFFF" height={80} width={80} 

export  {Spinner};