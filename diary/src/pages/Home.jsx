import Button from "../components/Button.jsx";
import Header from "../components/Header.jsx";
import {useState, useContext, useEffect} from "react";
import {DiaryStateContext} from "../App.jsx";
import {getMonthRangeByDate, setPageTitle} from "../util.jsx";
import DiaryList from "../components/DiaryList.jsx";


const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotDate] = useState(new Date());
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setPageTitle("감정 일기장")
    if(data.length >= 1) {
      const {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
      setFilteredData(
        data.filter(
          (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
        )
      );
    } else {
      setFilteredData([]);
    }
  }, [data, pivotDate]);

  const headerTitle = `${pivotDate.getFullYear()}년 ${pivotDate.getMonth() +1}월`;

  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  }

  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  }

  return(
    <div>
      <Header
        title={headerTitle}
        leftChild={<Button text={"<"} onClick={onIncreaseMonth}/> }
        rightChild={<Button text={">"} onClick={onDecreaseMonth}/> } />
      <DiaryList data={filteredData} />
    </div>
  )
};

export default Home;
