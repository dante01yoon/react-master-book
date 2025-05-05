import PropTypes from 'prop-types';

// 자식 컴포넌트
const GoldenRabbitDetails = ({ name, age, isHidden }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Age: {age}</p>
      <p>Status: {isHidden ? "Hidden" : "Visible"}</p>
    </div>
  );
};

// PropTypes를 사용해 props 타입을 검증하기
GoldenRabbitDetails.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isHidden: PropTypes.bool
};

// props 기본값 설정하기
GoldenRabbitDetails.defaultProps = {
  isHidden: false
};

// 부모 컴포넌트
const GoldenRabbitApp = () => {
  return (
    <div>
      <GoldenRabbitDetails name="Goldie" age={3} />
      <GoldenRabbitDetails name="Silvie" age="four" isHidden={true} />
    </div>
);
};

export default GoldenRabbitApp;